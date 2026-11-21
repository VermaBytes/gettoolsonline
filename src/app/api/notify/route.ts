import { NextResponse, type NextRequest } from "next/server";
import { onlineTools } from "@/lib/online-tools";

export const runtime = "nodejs";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const rateLimits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  for (const [storedKey, value] of rateLimits) {
    if (value.resetAt <= now) rateLimits.delete(storedKey);
  }
  const current = rateLimits.get(key);
  if (!current || current.resetAt <= now) {
    rateLimits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (current.count >= MAX_REQUESTS_PER_WINDOW) return true;
  current.count += 1;
  return false;
}

export async function POST(request: NextRequest) {
  let body: { email?: unknown; toolSlug?: unknown; website?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Please submit a valid request." }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ message: "Please submit a valid request." }, { status: 400 });
  }

  // Quietly accept bot submissions without storing them or revealing the honeypot.
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ message: "Thanks. We’ll email you when the tool is ready." });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const toolSlug = typeof body.toolSlug === "string" ? body.toolSlug.trim() : "";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: "Enter a valid email address." }, { status: 400 });
  }
  const tool = onlineTools.find((item) => item.slug === toolSlug && item.status === "coming");
  if (!tool) return NextResponse.json({ message: "This tool is not accepting launch notifications." }, { status: 400 });

  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwardedFor || request.headers.get("x-real-ip") || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ message: "Too many requests. Please try again in about an hour." }, { status: 429 });
  }

  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ message: "Notifications are temporarily unavailable. Please try again later." }, { status: 503 });
  }

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/tool_notifications?on_conflict=email%2Ctool_slug`, {
      method: "POST",
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": "application/json",
        Prefer: "resolution=ignore-duplicates,return=minimal"
      },
      body: JSON.stringify({ email, tool_slug: tool.slug })
    });
    if (!response.ok) {
      return NextResponse.json({ message: "We could not save your request. Please try again later." }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ message: "We could not reach the notification service. Please try again later." }, { status: 502 });
  }

  return NextResponse.json({ message: `Thanks. We’ll email you when ${tool.name} is ready.` });
}
