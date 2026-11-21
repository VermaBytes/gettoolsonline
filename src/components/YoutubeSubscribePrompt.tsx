"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";

const STORAGE_KEY = "toolix-youtube-prompt-until-v1";
const REMIND_AFTER_MS = 10_000;
const REMIND_LATER_MS = 14 * 24 * 60 * 60 * 1000;

export function YoutubeSubscribePrompt() {
  const [open, setOpen] = useState(false);
  const channelUrl = siteConfig.youtubeChannelUrl;

  useEffect(() => {
    if (!channelUrl) return;

    let timeout: ReturnType<typeof setTimeout> | undefined;
    try {
      const showAfter = Number(window.localStorage.getItem(STORAGE_KEY) || 0);
      if (showAfter > Date.now()) return;
      timeout = setTimeout(() => setOpen(true), REMIND_AFTER_MS);
    } catch {
      timeout = setTimeout(() => setOpen(true), REMIND_AFTER_MS);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [channelUrl]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function dismissForTwoWeeks() {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(Date.now() + REMIND_LATER_MS));
    } catch {
      // Dismiss for the current visit if browser storage is unavailable.
    }
    setOpen(false);
  }

  if (!open || !channelUrl) return null;

  return (
    <div className="youtube-prompt-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) dismissForTwoWeeks(); }}>
      <section className="youtube-prompt" role="dialog" aria-modal="true" aria-labelledby="youtube-prompt-title" aria-describedby="youtube-prompt-copy">
        <button className="youtube-prompt-close" type="button" aria-label="Close subscribe popup" onClick={dismissForTwoWeeks}>×</button>
        <div className="youtube-prompt-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" /></svg></div>
        <div className="youtube-prompt-content">
          <h2 id="youtube-prompt-title">Enjoying Toolix?</h2>
          <p id="youtube-prompt-copy">Subscribe to our YouTube channel for new tools, quick demos, and updates.</p>
          <div className="youtube-prompt-actions">
            <button type="button" className="youtube-prompt-later" onClick={dismissForTwoWeeks}>Later</button>
            <a className="youtube-prompt-subscribe" href={channelUrl} target="_blank" rel="noopener noreferrer" onClick={dismissForTwoWeeks}>Subscribe on YouTube</a>
          </div>
        </div>
      </section>
    </div>
  );
}
