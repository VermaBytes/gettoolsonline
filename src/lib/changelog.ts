import entries from "../../content/changelog.json";

export type ChangelogEntry = { date: string; tool: string; changes: string };

export function getChangelog(): ChangelogEntry[] {
  return [...entries].sort((a, b) => b.date.localeCompare(a.date));
}
