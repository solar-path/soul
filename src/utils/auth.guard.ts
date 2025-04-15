import { QueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "./trpc";

/**
 * Authentication guard utility for TanStack Router
 * Provides consistent route protection across the application
 * Returns authentication status instead of redirecting
 */
export const authGuard = async (queryClient: QueryClient) => {
  try {
    // Ensure we have the latest user data
    const currentUser = await queryClient.ensureQueryData({
      queryKey: ["currentUser"],
      queryFn: getCurrentUser,
    });

    if (!currentUser) {
      // Return authentication status instead of redirecting
      return { 
        isAuthenticated: false,
        user: null 
      };
    }

    return { 
      isAuthenticated: true,
      user: currentUser 
    };
  } catch (error) {
    console.error("Error in auth guard:", error);
    
    // Return authentication status instead of redirecting
    return { 
      isAuthenticated: false,
      user: null 
    };
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
    const { user, isAuthenticated } = await authGuard(queryClient);
    
    if (!isAuthenticated) {
      return { 
        isAuthenticated: false,
        user: null,
        isVerified: false
      };
    }
    
    // Check if user is verified when required
    const isVerified = !requiredVerification || (user && user.isVerified === true);
    
    return { 
      isAuthenticated: true,
      user,
      isVerified
    };
  };
};
