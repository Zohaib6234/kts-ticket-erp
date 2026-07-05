import { Route, RouteFormData } from "./route.types";

const API_URL = "/api/routes";

export async function getRoutes(): Promise<Route[]> {
  const res = await fetch(API_URL, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch routes.");
  }

  return res.json();
}

export async function createRoute(data: RouteFormData): Promise<Route> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to create route.");
  }

  return result;
}

export async function updateRoute(
  id: string,
  data: RouteFormData
): Promise<Route> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to update route.");
  }

  return result;
}

export async function deleteRoute(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const result = await res.json();
    throw new Error(result.message || "Failed to delete route.");
  }
}

