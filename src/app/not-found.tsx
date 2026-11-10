import Link from "next/link";
export default function NotFound() {
  return (
    <main className="page"><div className="container narrow">
      <h1 className="page-title">Page not found</h1>
      <p className="page-lede">The calculator you are looking for may have moved.</p>
      <p><Link className="btn" href="/">Browse all calculators →</Link></p>
    </div></main>
  );
}
