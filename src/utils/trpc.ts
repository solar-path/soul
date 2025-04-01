import { ApiRoutes } from "@/api/api";
import { QueryClient } from "@tanstack/react-query";
import { hc } from "hono/client";

export const trpc = hc<ApiRoutes>("/", {
  fetch: (input: RequestInfo | URL, init?: RequestInit) =>
    fetch(input, {
      ...init,
      credentials: "include",
    }),
}).api;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
    },
  },
});
