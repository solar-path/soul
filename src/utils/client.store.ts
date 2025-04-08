import { User } from "@/api/utils/types";
import { Store, useStore } from "@tanstack/react-store";
// import { Company, Country, Industry, User } from "@/lib/types";

// Define the store state
interface ClientState {
  currentUser: User | null;
  justSignedOut: boolean;
}

// Create the TanStack Store
export const clientStore = new Store<ClientState>({
  currentUser: null,
  justSignedOut: false,
});

// Hook to access the store state
export const useClientStore = () => {
  return useStore(clientStore);
};

// Helper functions for external usage
export const setCurrentUser = (user: User | null) => {
  clientStore.setState((state) => ({ ...state, currentUser: user }));
};

export const clearCurrentUser = () => {
  clientStore.setState((state) => ({ ...state, currentUser: null }));
};

export const setJustSignedOut = (value: boolean) => {
  clientStore.setState((state) => ({ ...state, justSignedOut: value }));
};
