import { create } from "zustand";

// Client type for flash message component
export type FlashMessageType = {
  state: boolean;
  type: string;
  message: string;
};

// Define the store state and actions
interface FlashMessageStore {
  state: boolean;
  type: string;
  message: string;
  show: (type: "success" | "fail", message: string) => void;
  hide: () => void;
}

// Create the Zustand store
export const useFlashMessageStore = create<FlashMessageStore>((set) => ({
  state: false,
  type: "",
  message: "",
  show: (type, message) => set({ state: true, type, message }),
  hide: () => set({ state: false }),
}));

// Helper functions for external usage
export const showFlashMessage = (type: "success" | "fail", message: string) => {
  useFlashMessageStore.getState().show(type, message);
};

export const hideFlashMessage = () => {
  useFlashMessageStore.getState().hide();
};
