# Analytics and advertising setup

Optional Google tags are disabled unless both the visitor accepts optional tags and the corresponding public ID is configured.

- `NEXT_PUBLIC_GA_ID`: GA4 measurement ID, for example `G-XXXXXXXXXX`.
- `NEXT_PUBLIC_ADSENSE_ID`: AdSense publisher client ID, for example `ca-pub-XXXXXXXXXXXXXXXX`.

Set these variables in `.env.local` for development and in the hosting provider's production environment. Rebuild/redeploy after changing them. The consent banner currently appears for all visitors because the app has no trusted region-detection service; this includes EEA/UK visitors and avoids treating browser language as location.

AdSense is not approved or enabled by this placeholder. Once Google provides the publisher ID, replace the example line in `public/ads.txt` with the exact seller record from the AdSense account. Do not publish the placeholder publisher ID.

Before enabling AdSense for EEA, UK or Swiss traffic, configure a Google-certified CMP that integrates with the IAB TCF (or Google Privacy & Messaging). This lightweight site banner gates optional scripts but does not emit TCF consent signals and is not a certified CMP. Google requires a certified CMP for personalized ads in those regions: <https://support.google.com/adsense/answer/13554116>.
