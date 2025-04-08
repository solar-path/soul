import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import QFooter from "@/ui/QFooter.ui";
import QHeader from "@/ui/QHeader.ui";
import QDrawer from "@/ui/QDrawer/QDrawer.ui";
import QFlashMessage from "@/ui/QFlashMessage/QFlashMessage.ui";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex flex-col min-h-screen">
        <QHeader />
        <main className="flex-1 overflow-y-auto pb-16">
          <Outlet />
        </main>
        <QDrawer />
        <QFlashMessage />
        <TanStackRouterDevtools />
        <div className="sticky bottom-0 w-full z-10 bg-white shadow-lg">
          <QFooter />
        </div>
      </div>
    </>
  ),
});
