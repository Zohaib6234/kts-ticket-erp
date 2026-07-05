

import { StockBook } from "./stock.types";

export async function getStockReport(): Promise<StockBook[]> {
  const res = await fetch("/api/reports/stock", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load stock report.");
  }

  return res.json();
}
