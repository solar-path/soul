import { Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
import { useDrawerStore, closeDrawer } from "@/ui/QDrawer/QDrawer.store";

/**
 * QDrawer component that displays content in a right-side drawer
 * Uses the drawer store to manage state and content
 */
export default function QDrawer() {
  // Use the store with hooks
  const { isOpen, title, Form } = useDrawerStore();

  return (
    <Drawer
      open={isOpen}
      onClose={closeDrawer}
      backdrop={false}
      position="right"
      className="w-1/4"
    >
      <DrawerHeader title={title} />
      <DrawerItems>{Form && <Form />}</DrawerItems>
    </Drawer>
  );
}
