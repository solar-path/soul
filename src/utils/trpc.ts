import { ApiRoutes } from "@/api/api";
import { hc } from "hono/client";

export const trpc = hc<ApiRoutes>("/", {
  fetch: (input: RequestInfo | URL, init?: RequestInit) =>
    fetch(input, {
      ...init,
      credentials: "include",
    }),
}).api;
