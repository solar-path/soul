import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import QFooter from "@/ui/QFooter.ui";
import QHeader from "@/ui/QHeader.ui";
import QDrawer from "@/ui/QDrawer/QDrawer.ui";
import QFlashMessage from "@/ui/QFlashMessage/QFlashMessage.ui";
// import { User } from "@/api/utils/types";
import { useUser } from "@/utils/client.store";
import { Spinner } from "flowbite-react";

import { QueryClient } from "@tanstack/react-query";

type RouterContext = {
  // currentUser: User | null;
  queryClient: QueryClient;
};
export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

// Separate component to use React hooks properly
function RootComponent() {
  // Use the TanStack Query hook to fetch the current user
  const { isLoading } = useUser();

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {isLoading && (
          <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
            <Spinner size="xl" />
          </div>
        )}
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
  );
}
