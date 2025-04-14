import { ApiRoutes } from "@/api/api";
import {
  Forgot,
  ResetPassword,
  SignIn,
  SignUp,
  UpdateProfile,
} from "@/api/routes/auth/auth.zod";
import { hc } from "hono/client";
import { ApiResponse, User } from "@/api/utils/types";

// Create Hono client with credentials included
export const trpc = hc<ApiRoutes>("/", {
  fetch: (input: RequestInfo | URL, init?: RequestInit) =>
    fetch(input, {
      ...init,
      credentials: "include",
    }),
}).api;

/**
 * Create a client function for API endpoints
 * @param endpoint Function to call the API endpoint
 * @returns A function that takes data and returns a typed response
 */
function createClientFunction<TData, TResponse>(
  endpoint: (data: { json: TData }) => Promise<Response>
) {
  return async (data: TData): Promise<ApiResponse<TResponse>> => {
    const response = await endpoint({ json: data });
    const result = (await response.json()) as ApiResponse<TResponse>;

    if (!result.success) {
      throw new Error(result.message);
    }

    return result;
  };
}

// Client functions for auth endpoints
export const clientSignIn = createClientFunction<SignIn, User>(
  trpc["auth"].signin.$post
);

export const clientSignUp = createClientFunction<
  SignUp,
  { verificationSent: boolean }
>(trpc["auth"].signup.$post);

export const clientResetPassword = createClientFunction<
  ResetPassword,
  { reset: boolean }
>(trpc.auth["reset-password"].$post);

export const clientForgotPassword = createClientFunction<
  Forgot,
  { sent: boolean }
>(trpc.auth.forgot.$post);

export const clientUpdateProfile = createClientFunction<UpdateProfile, User>(
  trpc.auth.updateProfile.$post
);
