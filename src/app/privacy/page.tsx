import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
export const metadata: Metadata = { title: "Privacy Policy", description: "Learn how Toolix handles browser-based tool inputs, cookies, analytics, advertising and notify-me email requests.", alternates: { canonical: "/privacy" } };

export default function Privacy() {
  return (
    <main className="page"><div className="container narrow">
      <h1 className="page-title">Privacy Policy</h1>
      <article className="content-block">
        <p><strong>Last updated: 21 November 2026</strong></p>
        <p>This policy explains how Toolix handles information when you visit the site. For privacy questions, contact us at <strong>{siteConfig.email}</strong>.</p>

        <h2>Tool inputs</h2>
        <p>Text, values and files entered into browser-based tools are processed on your device by the tool interface; they are not submitted to Toolix through those interfaces. Do not enter sensitive personal information. Your browser and hosting provider may separately process technical request data needed to deliver and secure the website.</p>

        <h2>Cookies and similar technologies</h2>
        <p>Toolix does not currently run Google Analytics or Google AdSense. The site and its hosting platform may use strictly necessary storage or similar technologies to deliver, protect and remember basic site functions. Your browser settings let you view, block or delete cookies, though blocking necessary technologies can affect how websites work.</p>

        <h2>Google AdSense, DoubleClick and advertising choices</h2>
        <p>If Google AdSense or other advertising is enabled on Toolix, Google and its partners may use cookies or similar identifiers to serve, measure and limit ads. Depending on your Google settings and applicable consent choices, these may include advertising cookies such as DoubleClick’s IDE cookie. Google explains its <a href="https://policies.google.com/technologies/cookies?hl=en" target="_blank" rel="noreferrer">use of cookies for advertising</a>. You can manage or turn off personalized ads in <a href="https://adssettings.google.com/" target="_blank" rel="noreferrer">Google Ads Settings</a>. Turning off personalization does not necessarily remove all ads. Toolix advertising is not currently enabled.</p>

        <h2>Analytics</h2>
        <p>Google Analytics is not currently enabled. If analytics is added, it may process usage and device information to help us understand site performance and improve the tools. We will update this policy and apply the consent controls required for the relevant visitors before enabling analytics.</p>

        <h2>Notify-me email requests</h2>
        <p>When the notify-me form is available, submitting it provides your email address and the tool you selected. We use these details only to manage your request and notify you about that tool. Requests are kept until the tool launches or you ask us to remove them, whichever comes first. The site does not currently enforce automatic expiry: the operator must remove requests from the active list within 30 days after launch or a deletion request. Operational backups may take longer to expire. You can withdraw your request or ask for deletion using the contact details above. The form requires the notification database to be configured; if it is unavailable, the form reports that the request could not be saved.</p>

        <h2>Your choices and rights</h2>
        <p>You can manage cookies in your browser and personalized advertising in Google Ads Settings. Depending on where you live, privacy laws may give you rights to request access to, correction of or deletion of personal information, or to object to or restrict certain processing. Contact us to make a request; we may need to verify your identity and will respond as required by applicable law.</p>

        <h2>Changes to this policy</h2>
        <p>We will update this page if our tools or data practices change. The date at the top shows when this policy was last reviewed.</p>
        <p><Link href="/contact">Contact Toolix</Link></p>
      </article>
    </div></main>
  );
}
