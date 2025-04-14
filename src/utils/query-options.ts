/**
 * Centralized query options for React Query
 * This file contains query options that can be reused across the application
 */

/**
 * Query options for the current user
 * Used to check authentication status
 */
export const userQueryOptions = () => ({
  queryKey: ["currentUser"],
});
