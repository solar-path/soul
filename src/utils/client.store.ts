import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "@/utils/trpc";
import { User } from "@/api/utils/types";

/**
 * Custom hook for fetching and managing the current user
 * Uses TanStack Query for caching and automatic refetching
 */
export function useUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
  });
}

/**
 * Helper function to set the current user in the query cache
 */
export function useSetUser() {
  const queryClient = useQueryClient();

  return {
    setUser: (user: User | null) => {
      queryClient.setQueryData(["currentUser"], user);
    },
    invalidateUser: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  };
}
