import { Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
import { ComponentType } from "react";
import { create } from "zustand";

// Client type for drawer component
export type DrawerType = {
  title: string;
  isOpen: boolean;
  Form: ComponentType | null;
};

// Define the store state and actions
interface DrawerState extends DrawerType {
  open: (Form: ComponentType, title: string) => void;
  close: () => void;
}

// Create the Zustand store
export const useDrawerStore = create<DrawerState>((set) => ({
  title: "",
  isOpen: false,
  Form: null,
  open: (Form, title) => set({ Form, title, isOpen: true }),
  close: () => set({ isOpen: false, Form: null, title: "" }),
}));

// Helper functions for external usage
export const fillDrawer = (Form: ComponentType, title: string) => {
  useDrawerStore.getState().open(Form, title);
};

export const closeDrawer = () => {
  useDrawerStore.getState().close();
};

export default function QDrawer() {
  // Use the store with hooks
  const { isOpen, title, Form, close } = useDrawerStore();

  return (
    <Drawer
      open={isOpen}
      onClose={close}
      backdrop={false}
      position="right"
      className="w-1/4"
    >
      <DrawerHeader title={title} />
      <DrawerItems>{Form && <Form />}</DrawerItems>
    </Drawer>
  );
}
