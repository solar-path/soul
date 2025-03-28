import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import QFooter from "../ui/QFooter.ui";
import QHeader from "../ui/QHeader.ui";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex min-h-screen flex-col justify-between">
        <QHeader />
        <Outlet />
        <TanStackRouterDevtools />
        <QFooter />
      </div>
    </>
  ),
});
