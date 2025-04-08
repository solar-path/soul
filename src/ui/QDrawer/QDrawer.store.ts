import { ComponentType } from "react";
import { Store, useStore } from "@tanstack/react-store";

// Define the store state
interface DrawerState {
  title: string;
  isOpen: boolean;
  Form: ComponentType | null;
}

// Create the TanStack Store
export const drawerStore = new Store<DrawerState>({
  title: "",
  isOpen: false,
  Form: null,
});

// Hook to access the store state
export const useDrawerStore = () => {
  return useStore(drawerStore);
};

// Helper functions for external usage
export const fillDrawer = (Form: ComponentType, title: string) => {
  drawerStore.setState((state) => ({
    ...state,
    Form,
    title,
    isOpen: true,
  }));
};

export const closeDrawer = () => {
  drawerStore.setState((state) => ({
    ...state,
    isOpen: false,
    Form: null,
    title: "",
  }));
};
