import { QSidebarProps } from "@/ui/QSidebar.ui";
import { QSidebar } from "@/ui/QSidebar.ui";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { authGuard } from "@/utils/auth.guard";
import { QAuthGuard } from "@/ui/QAuthGuard.ui";

import { User } from "@/api/utils/types";

// Define the type for the loader data
interface CompanyLoaderData {
  isAuthenticated: boolean;
  user: User | null;
}

export const Route = createFileRoute("/company/")({
  component: RouteComponent,
  // Use the auth guard for route protection without redirecting
  beforeLoad: async ({ context }): Promise<CompanyLoaderData> => {
    // Use the authGuard utility to check authentication status
    const { isAuthenticated, user } = await authGuard(context.queryClient);
    return { isAuthenticated, user };
  },
});

const moduleList: QSidebarProps = [
  { title: "Risk Management", href: "/company/erm", children: [] },
  {
    title: "Personnel Management",
    href: "/company/hrm",
    children: [
      { title: "Employee", href: "/company/hrm/employee" },
      { title: "Department", href: "/company/hrm/department" },
      { title: "Position", href: "/company/hrm/position" },
    ],
  },
  { title: "Address Book", href: "/company/addressBook", children: [] },
  { title: "Settings", href: "/company/settings", children: [] },
  { title: "User Management", href: "/company/userManagement", children: [] },
];

function RouteComponent() {
  // Authentication is handled by the QAuthGuard component
  const queryClient = useQueryClient();

  // Listen for authentication events
  useEffect(() => {
    // Create a custom event listener for auth changes
    const handleAuthChange = () => {
      // Invalidate the user query to refresh data without page reload
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    };

    // Add event listeners
    window.addEventListener("auth-state-changed", handleAuthChange);

    // Clean up
    return () => {
      window.removeEventListener("auth-state-changed", handleAuthChange);
    };
  }, [queryClient]);

  // Use the QAuthGuard component to protect this route
  return (
    <QAuthGuard>
      <div className="flex flex-row">
        <div className="w-1/5">
          <QSidebar moduleList={moduleList} />
        </div>
        <div className="w-4/5">
          <Outlet />
        </div>
      </div>
    </QAuthGuard>
  );
}
