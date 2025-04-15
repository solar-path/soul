import { redirect } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "./trpc";

/**
 * Authentication guard utility for TanStack Router
 * Provides consistent route protection across the application
 */
export const authGuard = async (queryClient: QueryClient) => {
  try {
    // Ensure we have the latest user data
    const currentUser = await queryClient.ensureQueryData({
      queryKey: ["currentUser"],
      queryFn: getCurrentUser,
    });

    if (!currentUser) {
      // Redirect to public home page if not authenticated
      throw redirect({
        to: "/",
      });
    }

    return {
      isAuthenticated: true,
      user: currentUser,
    };
  } catch (error) {
    // If the error is already a redirect, just throw it
    if (error instanceof Error && "redirect" in error) {
      throw error;
    }

    // Otherwise, redirect to home with auth required flag
    throw redirect({
      to: "/",
    });
  }
};

/**
 * Permission-based authorization guard
 * Extends the auth guard to also check for specific permissions
 *
 * This can be extended later to check actual permissions from your backend
 * Currently it just checks if the user is verified
 */
export const permissionGuard = (requiredVerification: boolean = true) => {
  return async (queryClient: QueryClient) => {
    // First check if user is authenticated
    const { user } = await authGuard(queryClient);

    // Check if user is verified when required
    if (requiredVerification && !user.isVerified) {
      throw redirect({
        to: "/",
      });
    }

    return {
      isAuthenticated: true,
      user,
      isVerified: user.isVerified,
    };
  };
};
