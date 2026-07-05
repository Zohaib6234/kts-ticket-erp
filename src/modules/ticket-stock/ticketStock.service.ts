import {
  TicketStock,
  TicketStockFormData,
} from "./ticketStock.types";

export async function getTicketStocks(): Promise<TicketStock[]> {
  const res = await fetch("/api/ticket-stock", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch ticket stock.");
  }

  return res.json();
}

export async function getTicketStockById(
  id: string
): Promise<TicketStock> {
  const res = await fetch(`/api/ticket-stock/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch ticket stock.");
  }

  return res.json();
}

export async function createTicketStock(
  data: TicketStockFormData
) {
  const res = await fetch("/api/ticket-stock", {
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

export async function updateTicketStock(
  id: string,
  data: TicketStockFormData
) {
  const res = await fetch(`/api/ticket-stock/${id}`, {
    method: "PUT",
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

export async function deleteTicketStock(id: string) {
  const res = await fetch(`/api/ticket-stock/${id}`, {
    method: "DELETE",
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message);
  }

  return result;
}

