

import {
  TicketBook,
  ReceiveBookFormData,
} from "./book.types";

export async function getBooks(): Promise<TicketBook[]> {
  const res = await fetch("/api/ticket-books", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load books.");
  }

  return res.json();
}

export async function receiveBooks(
  data: ReceiveBookFormData
) {
  const res = await fetch("/api/ticket-books", {
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

