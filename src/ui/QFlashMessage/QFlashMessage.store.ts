import { Store, useStore } from "@tanstack/react-store";

// Define the store state
interface FlashMessageState {
  state: boolean;
  type: string;
  message: string;
}

// Create the TanStack Store
export const flashMessageStore = new Store<FlashMessageState>({
  state: false,
  type: "",
  message: "",
});

// Hook to access the store state
export const useFlashMessageStore = () => {
  return useStore(flashMessageStore);
};

// Helper functions for external usage
export const showFlashMessage = (type: "success" | "fail", message: string) => {
  flashMessageStore.setState((state) => ({
    ...state,
    state: true,
    type,
    message,
  }));
};

export const hideFlashMessage = () => {
  flashMessageStore.setState((state) => ({
    ...state,
    state: false,
  }));
};
