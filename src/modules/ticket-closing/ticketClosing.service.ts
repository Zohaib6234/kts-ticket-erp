

import {
  TicketClosing,
  TicketClosingFormData,
} from "./ticketClosing.types";

export async function getTicketClosings(): Promise<TicketClosing[]> {
  const res = await fetch("/api/ticket-closing", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch ticket closings.");
  }

  return res.json();
}

export async function createTicketClosing(
  data: TicketClosingFormData
) {
  const res = await fetch("/api/ticket-closing", {
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

