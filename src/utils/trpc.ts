import { ApiRoutes } from "@/api/api";
import { SignIn } from "@/api/routes/auth/auth.zod";
import { hc } from "hono/client";

export const trpc = hc<ApiRoutes>("/", {
  fetch: (input: RequestInfo | URL, init?: RequestInit) =>
    fetch(input, {
      ...init,
      credentials: "include",
    }),
}).api;

export const clientSignIn = async (data: SignIn) => {
  const response = await trpc["auth"].signin.$post({
    json: data,
  });
  const result = await response.json();
  if (!result.success) {
    throw new Error(result.message);
  }
  return result;
};
