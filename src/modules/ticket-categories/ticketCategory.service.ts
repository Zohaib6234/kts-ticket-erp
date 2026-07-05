

import {
  TicketCategory,
  TicketCategoryFormData,
} from "./ticketCategory.types";

const API = "/api/ticket-categories";

export async function getTicketCategories(): Promise<TicketCategory[]> {
  const res = await fetch(API, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch ticket categories.");
  }

  return res.json();
}

export async function createTicketCategory(
  data: TicketCategoryFormData
) {
  const res = await fetch(API, {
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

