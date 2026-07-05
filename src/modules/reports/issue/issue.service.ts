

import { IssueReport } from "./issue.types";

export async function getIssueReport(): Promise<IssueReport[]> {
  const res = await fetch("/api/reports/issue", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load issue report.");
  }

  return res.json();
}
