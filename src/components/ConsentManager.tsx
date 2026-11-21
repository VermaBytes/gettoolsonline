"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Script from "next/script";

type Consent = "accepted" | "rejected" | null;
type DataLayerEntry = unknown[];

declare global {
  interface Window {
    dataLayer: DataLayerEntry[];
    gtag?: (...args: unknown[]) => void;
    toolixGAInitialized?: boolean;
  }
}

const STORAGE_KEY = "toolix-cookie-consent-v1";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID;

export function ConsentManager() {
  const [consent, setConsent] = useState<Consent>(null);
  const [loaded, setLoaded] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "accepted" || saved === "rejected") setConsent(saved);
    } catch {
      // Keep optional tags disabled if the browser blocks local storage.
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (consent !== "accepted" || !GA_ID) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || ((...args: unknown[]) => { window.dataLayer.push(args); });
    if (!window.toolixGAInitialized) {
      window.gtag("js", new Date());
      window.gtag("config", GA_ID, { send_page_view: false });
      window.toolixGAInitialized = true;
    }
    window.gtag("event", "page_view", { page_path: pathname });
  }, [consent, pathname]);

  function choose(next: Exclude<Consent, null>) {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // The current choice still applies for this page view when storage is unavailable.
    }
    if (consent === "accepted" && next === "rejected") {
      window.location.reload();
      return;
    }
    setConsent(next);
    setSettingsOpen(false);
  }

  return <>
    {consent === "accepted" && GA_ID && <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`} strategy="afterInteractive" />
    </>}
    {consent === "accepted" && ADSENSE_ID && <Script
      id="toolix-adsense"
      async
      crossOrigin="anonymous"
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(ADSENSE_ID)}`}
    />}
    {loaded && consent === null && <section className="cookie-banner" aria-label="Cookie choices">
      <div><strong>Privacy choices</strong><p>Optional analytics and advertising tags load only if you accept. You can change your choice later. Read our <Link href="/privacy">Privacy Policy</Link>.</p></div>
      <div className="cookie-actions"><button type="button" className="cookie-reject" onClick={() => choose("rejected")}>Reject optional</button><button type="button" className="cookie-accept" onClick={() => choose("accepted")}>Accept optional</button></div>
    </section>}
    {loaded && consent !== null && !settingsOpen && <button type="button" className="cookie-settings" onClick={() => setSettingsOpen(true)}>Cookie settings</button>}
    {loaded && settingsOpen && <section className="cookie-banner cookie-settings-panel" aria-label="Cookie settings">
      <div><strong>Cookie choices</strong><p>Optional analytics and advertising are {consent}. You can update your choice. See the <Link href="/privacy">Privacy Policy</Link>.</p></div>
      <div className="cookie-actions"><button type="button" className="cookie-reject" onClick={() => choose("rejected")}>Reject optional</button><button type="button" className="cookie-accept" onClick={() => choose("accepted")}>Accept optional</button><button type="button" className="cookie-reject" onClick={() => setSettingsOpen(false)}>Close</button></div>
    </section>}
  </>;
}
