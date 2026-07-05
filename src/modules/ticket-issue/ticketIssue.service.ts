

import {
  TicketIssue,
  TicketIssueFormData,
} from "./ticketIssue.types";

export async function getTicketIssues(): Promise<TicketIssue[]> {
  const res = await fetch("/api/ticket-issue", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch ticket issues.");
  }

  return res.json();
}

export async function createTicketIssue(
  data: TicketIssueFormData
) {
  const res = await fetch("/api/ticket-issue", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message);
  }

  return result;
}

