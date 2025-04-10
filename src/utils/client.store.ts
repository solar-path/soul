import { useQuery, useQueryClient } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import { User } from "@/api/utils/types";

/**
 * Custom hook for fetching and managing the current user
 * Uses TanStack Query for caching and automatic refetching
 */
export function useUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async (): Promise<User | null> => {
      try {
        const response = await trpc.auth.user.$get();
        if (!response.ok) return null;

        const result = await response.json();
        if (!result.success) return null;

        return result.data;
      } catch (error) {
        console.error("Error fetching user:", error);
        return null;
      }
    },
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
