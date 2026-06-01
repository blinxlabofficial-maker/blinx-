/**
 * Centralized API configuration for the Blinx Lab frontend.
 * Uses NEXT_PUBLIC_API_URL environment variable, with localhost fallback for dev.
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/**
 * Typed fetch wrapper with error handling.
 * Automatically prepends the API base URL.
 */
export async function apiFetch<T = any>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || `API error: ${response.status}`);
  }

  return response.json();
}
