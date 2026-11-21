"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

type Props = { slug: string; name: string; short: string };

function LockIcon() {
  return <svg className="coming-lock-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none">
    <rect x="4" y="10" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="15" r="1" fill="currentColor" />
    <path d="M12 16v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>;
}

export function ComingSoonTool({ slug, name, short }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [lockMessage, setLockMessage] = useState(false);
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  function showLockedMessage() {
    setLockMessage(true);
    window.setTimeout(() => setLockMessage(false), 2000);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    setSending(true);
    setMessage("");
    setSuccess(false);
    try {
      const response = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, toolSlug: slug, website })
      });
      const data = await response.json() as { message?: string };
      if (!response.ok) throw new Error(data.message || "We could not save your request. Please try again later.");
      setSuccess(true);
      setMessage(data.message || `Thanks. We’ll email you when ${name} is ready.`);
      setEmail("");
      setWebsite("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "We could not save your request. Please try again later.");
    } finally {
      setSending(false);
    }
  }

  return <article className="coming-tool-card">
    <button type="button" className="coming-tool-lock" aria-disabled="true" aria-label="Coming soon, locked" onClick={showLockedMessage}>
      <span className="coming-tool-icon"><LockIcon /></span>
      <span className="tag">Coming soon</span>
      <span className="coming-tool-title">{name}</span>
      <span className="coming-tool-description">{short}</span>
      <span className="coming-tool-hint">In development</span>
    </button>
    <p className="coming-lock-feedback" aria-live="polite">{lockMessage ? `${name} is coming soon.` : ""}</p>
    <button className="notify-toggle" type="button" aria-expanded={showForm} onClick={() => { setShowForm((open) => !open); setMessage(""); }}>
      {showForm ? "Close" : "Notify me"}
    </button>
    {showForm && <form className="notify-form" onSubmit={submit}>
      <input type="hidden" name="toolSlug" value={slug} readOnly />
      <label className="notify-email-label">Email address
        <input type="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} required maxLength={254} autoComplete="email" placeholder="you@example.com" />
      </label>
      <label className="notify-honeypot" aria-hidden="true">Leave this field empty
        <input name="website" value={website} onChange={(event) => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" />
      </label>
      <button type="submit" className="notify-submit" disabled={sending}>{sending ? "Saving…" : "Notify me"}</button>
      <p className="notify-privacy">We’ll use your email for this launch update. See our <Link href="/privacy">Privacy Policy</Link>.</p>
      {message && <p className={success ? "notify-message success" : "notify-message error"} role={success ? "status" : "alert"}>{message}</p>}
    </form>}
  </article>;
}
