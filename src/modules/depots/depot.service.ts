
import { Depot, DepotFormData } from "./depot.types";

export async function getDepots(): Promise<Depot[]> {
  const res = await fetch("/api/depots", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch depots");
  }

  return res.json();
}

export async function createDepot(data: DepotFormData) {
  const res = await fetch("/api/depots", {
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
