import type { CountryCode } from "@/lib/countries";

export type FlagCode = CountryCode | "global";

const names: Record<FlagCode, string> = {
  in: "India", us: "United States", uk: "United Kingdom", ca: "Canada", au: "Australia",
  sg: "Singapore", ae: "United Arab Emirates", ie: "Ireland", global: "Worldwide"
};

function Art({ code }: { code: FlagCode }) {
  switch (code) {
    case "in": return (<>
      <rect width="24" height="8" y="0" fill="#FF9933" /><rect width="24" height="8" y="8" fill="#fff" /><rect width="24" height="8" y="16" fill="#138808" />
      <circle cx="12" cy="12" r="2.4" fill="none" stroke="#000080" strokeWidth=".8" /><circle cx="12" cy="12" r=".5" fill="#000080" /></>);
    case "us": return (<>
      <rect width="24" height="24" fill="#fff" />
      {[0, 1, 2, 3].map((i) => <rect key={i} y={i * 6.9} width="24" height="3.45" fill="#B22234" />)}
      <rect width="11" height="13.8" fill="#3C3B6E" />
      {[2.5, 5.5, 8.5].flatMap((x) => [3, 6.5, 10].map((y) => <circle key={x + "-" + y} cx={x} cy={y} r=".7" fill="#fff" />))}</>);
    case "uk": return (<>
      <rect width="24" height="24" fill="#012169" />
      <path d="M0 0L24 24M24 0L0 24" stroke="#fff" strokeWidth="4.5" /><path d="M0 0L24 24M24 0L0 24" stroke="#C8102E" strokeWidth="1.6" />
      <path d="M12 0V24M0 12H24" stroke="#fff" strokeWidth="7" /><path d="M12 0V24M0 12H24" stroke="#C8102E" strokeWidth="4" /></>);
    case "ca": return (<>
      <rect width="24" height="24" fill="#fff" /><rect width="6" height="24" fill="#D52B1E" /><rect x="18" width="6" height="24" fill="#D52B1E" />
      <path d="M12 5l1.3 2.6 2-.7-.6 3.3 2.3-1.6.4 1.6-2.4 2.4.2.9-3.2-.4V19h-1.2v-3.9l-3.2.4.2-.9-2.4-2.4.4-1.6 2.3 1.6-.6-3.3 2 .7z" fill="#D52B1E" /></>);
    case "au": return (<>
      <rect width="24" height="24" fill="#012169" />
      <path d="M0 0L12 12M12 0L0 12" stroke="#fff" strokeWidth="2" /><path d="M6 0V12M0 6H12" stroke="#fff" strokeWidth="3.4" /><path d="M6 0V12M0 6H12" stroke="#C8102E" strokeWidth="1.8" />
      {[[6, 18], [16, 8], [20, 14], [16, 20], [12.5, 14]].map(([x, y]) => <circle key={x + "-" + y} cx={x} cy={y} r="1.1" fill="#fff" />)}</>);
    case "sg": return (<>
      <rect width="24" height="12" fill="#EF3340" /><rect y="12" width="24" height="12" fill="#fff" />
      <circle cx="8" cy="6" r="3.4" fill="#fff" /><circle cx="9.5" cy="6" r="3" fill="#EF3340" />
      {[[13, 3.6], [15.6, 5.6], [14.6, 8.6], [11.4, 8.6], [10.4, 5.4]].map(([x, y]) => <circle key={x + "-" + y} cx={x} cy={y} r=".6" fill="#fff" />)}</>);
    case "ae": return (<>
      <rect width="24" height="8" fill="#00732F" /><rect y="8" width="24" height="8" fill="#fff" /><rect y="16" width="24" height="8" fill="#000" /><rect width="7" height="24" fill="#FF0000" /></>);
    case "ie": return (<>
      <rect width="8" height="24" fill="#169B62" /><rect x="8" width="8" height="24" fill="#fff" /><rect x="16" width="8" height="24" fill="#FF883E" /></>);
    default: return (<>
      <rect width="24" height="24" fill="#2f5bea" />
      <g fill="none" stroke="#fff" strokeWidth="1"><circle cx="12" cy="12" r="8" /><ellipse cx="12" cy="12" rx="3.4" ry="8" /><path d="M4 12H20M5.5 7.5H18.5M5.5 16.5H18.5" /></g></>);
  }
}

/** Round flag badge. Pure SVG, so it renders on every OS (emoji flags do not render on Windows). */
export function Flag({ code, size = 34, className = "" }: { code: FlagCode; size?: number; className?: string }) {
  const id = `fc-${code}`;
  return (
    <span className={`flag ${className}`} style={{ width: size, height: size }} role="img" aria-label={`${names[code]} flag`} title={names[code]}>
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
        <defs><clipPath id={id}><circle cx="12" cy="12" r="12" /></clipPath></defs>
        <g clipPath={`url(#${id})`}><Art code={code} /></g>
      </svg>
    </span>
  );
}
