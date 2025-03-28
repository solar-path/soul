import { Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
import { useDrawerStore } from "@/ui/QDrawer/drawer.store";

/**
 * QDrawer component that displays content in a right-side drawer
 * Uses the drawer store to manage state and content
 */
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
