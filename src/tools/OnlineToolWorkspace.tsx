"use client";
import { useMemo, useState } from "react";
import type { OnlineTool } from "@/lib/online-tools";

type Props = { tool: OnlineTool };

export function OnlineToolWorkspace({ tool }: Props) {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("upper");
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(78);
  const [width, setWidth] = useState("1200");
  const [height, setHeight] = useState("800");
  const [keepRatio, setKeepRatio] = useState(true);
  const [output, setOutput] = useState("");
  const [outputName, setOutputName] = useState("gettools-output");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [numberA, setNumberA] = useState("");
  const [numberB, setNumberB] = useState("");
  const [dob, setDob] = useState("");
  const [asOf, setAsOf] = useState(new Date().toISOString().slice(0, 10));
  const [pageTitle, setPageTitle] = useState("");
  const [pageDescription, setPageDescription] = useState("");
  const [pageUrl, setPageUrl] = useState("");
  const [sitemap, setSitemap] = useState("");
  const [allowAll, setAllowAll] = useState(true);

  const words = useMemo(() => text.trim() ? text.trim().split(/\s+/).length : 0, [text]);
  const sentences = useMemo(() => text.trim() ? text.split(/[.!?]+/).filter((v) => v.trim()).length : 0, [text]);
  const paragraphs = useMemo(() => text.trim() ? text.split(/\n\s*\n/).filter((v) => v.trim()).length : 0, [text]);
  const converted = useMemo(() => {
    if (tool.slug === "case-converter") {
      if (mode === "upper") return text.toUpperCase();
      if (mode === "lower") return text.toLowerCase();
      if (mode === "title") return text.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
      return text.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase());
    }
    if (tool.slug === "remove-duplicate-lines") return [...new Set(text.split(/\r?\n/))].join("\n");
    return text;
  }, [text, mode, tool.slug]);

  const copy = async (value: string) => {
    try { await navigator.clipboard.writeText(value); setError(""); }
    catch { setError("Copy is unavailable in this browser context. Select the result and copy it manually."); }
  };

  async function processImage() {
    setError(""); setOutput("");
    if (!file) { setError("Please choose an image first."); return; }
    if (!file.type.startsWith("image/")) { setError("Please choose a valid image file."); return; }
    setBusy(true);
    const source = URL.createObjectURL(file);
    try {
      const img = new window.Image(); img.src = source;
      await new Promise<void>((resolve, reject) => { img.onload = () => resolve(); img.onerror = () => reject(new Error("This image could not be opened.")); });
      const canvas = document.createElement("canvas");
      let w = img.naturalWidth; let h = img.naturalHeight;
      if (tool.slug === "image-resizer") {
        const targetW = Math.max(1, Math.min(12000, Number(width) || 1));
        const targetH = Math.max(1, Math.min(12000, Number(height) || 1));
        if (keepRatio) { const ratio = Math.min(targetW / w, targetH / h); w = Math.round(w * ratio); h = Math.round(h * ratio); }
        else { w = targetW; h = targetH; }
      }
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext("2d"); if (!ctx) throw new Error("Your browser could not process this image.");
      ctx.drawImage(img, 0, 0, w, h);
      const mime = tool.slug === "jpg-to-png" ? "image/png" : tool.slug === "webp-converter" ? "image/webp" : "image/jpeg";
      const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob((b) => b ? resolve(b) : reject(new Error("Image conversion failed.")), mime, quality / 100));
      const resultUrl = URL.createObjectURL(blob); setOutput(resultUrl);
      const ext = mime === "image/png" ? "png" : mime === "image/webp" ? "webp" : "jpg";
      setOutputName(`${file.name.replace(/\.[^.]+$/, "")}-${tool.slug}.${ext}`);
    } catch (e) { setError(e instanceof Error ? e.message : "Something went wrong."); }
    finally { URL.revokeObjectURL(source); setBusy(false); }
  }

  const downloadText = (value: string, filename: string, type = "text/plain") => {
    const blob = new Blob([value], { type }); const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url);
  };

  const metaOutput = `<!-- Primary Meta Tags -->\n<title>${pageTitle}</title>\n<meta name="description" content="${pageDescription}" />\n<link rel="canonical" href="${pageUrl}" />\n\n<!-- Open Graph -->\n<meta property="og:type" content="website" />\n<meta property="og:title" content="${pageTitle}" />\n<meta property="og:description" content="${pageDescription}" />\n<meta property="og:url" content="${pageUrl}" />\n\n<!-- Twitter -->\n<meta name="twitter:card" content="summary_large_image" />\n<meta name="twitter:title" content="${pageTitle}" />\n<meta name="twitter:description" content="${pageDescription}" />`;
  const robotsOutput = `${allowAll ? "User-agent: *\nAllow: /" : "User-agent: *\nDisallow: /"}${sitemap.trim() ? `\n\nSitemap: ${sitemap.trim()}` : ""}\n`;

  if (tool.status === "coming") return <div className="tool-workspace"><div className="coming-panel"><span className="coming-icon">✦</span><h2>This tool is coming soon</h2><p>We’re preparing this utility. You can explore the other available tools in the meantime.</p><span className="status-pill">In development</span></div></div>;

  return <div className="tool-workspace">
    <div className="workspace-head"><div><span className="workspace-kicker">FREE ONLINE TOOL</span><h2>{tool.name}</h2><p>Simple, fast and private. Your inputs are processed in your browser.</p></div><span className="status-pill ready">Free to use</span></div>

    {(["image-compressor", "image-resizer", "jpg-to-png", "webp-converter"].includes(tool.slug)) && <>
      <label className="upload-zone"><span className="upload-symbol">＋</span><b>{file ? file.name : "Choose an image"}</b><span>JPG, PNG or WebP · Processed locally in your browser</span><input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => { setFile(e.target.files?.[0] || null); setOutput(""); setError(""); }} /></label>
      {tool.slug === "image-resizer" && <div className="tool-fields two"><label>Width (px)<input type="number" min="1" max="12000" value={width} onChange={(e) => setWidth(e.target.value)} /></label><label>Height (px)<input type="number" min="1" max="12000" value={height} onChange={(e) => setHeight(e.target.value)} /></label><label className="inline-check"><input type="checkbox" checked={keepRatio} onChange={(e) => setKeepRatio(e.target.checked)} /> Keep aspect ratio</label></div>}
      {tool.slug === "image-compressor" && <label className="range-field">Image quality <b>{quality}%</b><input type="range" min="20" max="95" value={quality} onChange={(e) => setQuality(Number(e.target.value))} /></label>}
      {tool.slug === "webp-converter" && <p className="workspace-hint">Output format: WebP</p>}
      {tool.slug === "jpg-to-png" && <p className="workspace-hint">Output format: PNG</p>}
      <button className="primary-action" disabled={busy || !file} onClick={processImage}>{busy ? "Processing…" : tool.slug === "image-compressor" ? "Compress image" : tool.slug === "image-resizer" ? "Resize image" : "Convert image"}</button>
      {output && <div className="result-panel"><div><b>Your image is ready</b><span>Download the processed file below.</span></div><a className="download-action" href={output} download={outputName}>Download image ↓</a></div>}
    </>}

    {tool.slug === "word-counter" && <><textarea className="tool-textarea" rows={9} value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste or type your text here…"/><div className="metric-grid">{[["Words", words],["Characters", text.length],["Characters (no spaces)", text.replace(/\s/g, "").length],["Sentences", sentences],["Paragraphs", paragraphs],["Reading time", `${Math.max(1, Math.ceil(words / 200))} min`]].map(([label, value]) => <div className="metric-card" key={String(label)}><span>{label}</span><b>{value}</b></div>)}</div></>}

    {tool.slug === "case-converter" && <><textarea className="tool-textarea" rows={8} value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter your text here…"/><div className="choice-row">{[["upper","UPPERCASE"],["lower","lowercase"],["title","Title Case"],["sentence","Sentence case"]].map(([v, label]) => <button key={v} className={mode === v ? "choice active" : "choice"} onClick={() => setMode(v)}>{label}</button>)}</div><div className="output-box"><div className="output-head"><b>Converted text</b><button onClick={() => copy(converted)}>Copy</button></div><pre>{converted || "Your converted text will appear here."}</pre></div></>}

    {tool.slug === "remove-duplicate-lines" && <><textarea className="tool-textarea" rows={8} value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste a list with one item per line…"/><div className="output-box"><div className="output-head"><b>Cleaned list</b><button onClick={() => copy(converted)}>Copy</button></div><pre>{converted || "Your cleaned list will appear here."}</pre><span className="workspace-hint">{text ? `${text.split(/\r?\n/).length - converted.split(/\r?\n/).length} duplicate line(s) removed.` : "Duplicate lines are removed while preserving the original order."}</span></div></>}

    {tool.slug === "percentage-calculator" && <><div className="tool-fields two"><label>Percentage (%)<input type="number" value={numberA} onChange={(e) => setNumberA(e.target.value)} placeholder="e.g. 15" /></label><label>Number<input type="number" value={numberB} onChange={(e) => setNumberB(e.target.value)} placeholder="e.g. 250" /></label></div><div className="big-result"><span>Result</span><b>{numberA !== "" && numberB !== "" && Number.isFinite(Number(numberA) * Number(numberB)) ? (Number(numberA) * Number(numberB) / 100).toLocaleString(undefined, { maximumFractionDigits: 6 }) : "—"}</b><small>{numberA || "0"}% of {numberB || "0"}</small></div></>}

    {tool.slug === "age-calculator" && <><div className="tool-fields two"><label>Date of birth<input type="date" value={dob} max={asOf} onChange={(e) => setDob(e.target.value)} /></label><label>Age on date<input type="date" value={asOf} min={dob || undefined} onChange={(e) => setAsOf(e.target.value)} /></label></div><div className="big-result"><span>Your age</span><b>{dob && asOf && new Date(dob) <= new Date(asOf) ? (() => { const birth = new Date(`${dob}T00:00:00`); const end = new Date(`${asOf}T00:00:00`); let years = end.getFullYear()-birth.getFullYear(); let months=end.getMonth()-birth.getMonth(); let days=end.getDate()-birth.getDate(); if(days<0){months--;days+=new Date(end.getFullYear(),end.getMonth(),0).getDate()} if(months<0){years--;months+=12} return `${years} years, ${months} months, ${days} days`; })() : "—"}</b><small>Enter a valid date of birth to calculate your age.</small></div></>}

    {tool.slug === "discount-calculator" && <><div className="tool-fields two"><label>Original price<input type="number" min="0" value={numberA} onChange={(e) => setNumberA(e.target.value)} placeholder="e.g. 1999" /></label><label>Discount (%)<input type="number" min="0" max="100" value={numberB} onChange={(e) => setNumberB(e.target.value)} placeholder="e.g. 20" /></label></div><div className="metric-grid">{[["You save", numberA !== "" && numberB !== "" && Number(numberA)>=0 && Number(numberB)>=0 && Number(numberB)<=100 ? (Number(numberA)*Number(numberB)/100).toLocaleString(undefined,{maximumFractionDigits:2}) : "—"],["Final price", numberA !== "" && numberB !== "" && Number(numberA)>=0 && Number(numberB)>=0 && Number(numberB)<=100 ? (Number(numberA)*(1-Number(numberB)/100)).toLocaleString(undefined,{maximumFractionDigits:2}) : "—"]].map(([label,value])=><div className="metric-card" key={label}><span>{label}</span><b>{value}</b></div>)}</div></>}

    {tool.slug === "meta-tag-generator" && <><div className="tool-fields"><label>Page title<input value={pageTitle} maxLength={70} onChange={(e) => setPageTitle(e.target.value)} placeholder="Your page title" /></label><label>Meta description<textarea value={pageDescription} maxLength={160} rows={3} onChange={(e) => setPageDescription(e.target.value)} placeholder="A concise description of your page" /></label><label>Canonical URL<input type="url" value={pageUrl} onChange={(e) => setPageUrl(e.target.value)} placeholder="https://example.com/page" /></label></div><div className="output-box"><div className="output-head"><b>HTML meta tags</b><div><button onClick={() => copy(metaOutput)}>Copy</button><button onClick={() => downloadText(metaOutput,"meta-tags.html","text/html")}>Download</button></div></div><pre>{metaOutput}</pre></div><p className="workspace-hint">Use a unique, descriptive title and an accurate summary. Search engines may choose different snippets.</p></>}

    {tool.slug === "robots-txt-generator" && <><div className="tool-fields"><label>Crawl access<select value={allowAll ? "allow" : "block"} onChange={(e) => setAllowAll(e.target.value === "allow")}><option value="allow">Allow all crawlers</option><option value="block">Block all crawlers</option></select></label><label>Sitemap URL (optional)<input type="url" value={sitemap} onChange={(e) => setSitemap(e.target.value)} placeholder="https://example.com/sitemap.xml" /></label></div><div className="output-box"><div className="output-head"><b>robots.txt</b><div><button onClick={() => copy(robotsOutput)}>Copy</button><button onClick={() => downloadText(robotsOutput,"robots.txt")}>Download</button></div></div><pre>{robotsOutput}</pre></div><p className="workspace-hint">Check your crawl rules carefully before publishing. Blocking crawlers can prevent pages from appearing in search.</p></>}

    {error && <p className="tool-error" role="alert">{error}</p>}
    <p className="privacy-note">Your inputs and files are processed locally in your browser for these tools. Do not rely on generated estimates as professional advice.</p>
  </div>;
}
