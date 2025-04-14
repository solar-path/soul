import { QSidebarProps } from "@/ui/QSidebar.ui";
import { QSidebar } from "@/ui/QSidebar.ui";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { fillDrawer } from "@/ui/QDrawer/QDrawer.store";
import SignInForm from "@/api/routes/auth/SignIn.form";
import { useState, useEffect } from "react";
import { getCurrentUser } from "@/utils/trpc";

// No need for external query options, we define them inline

// Define the type for the loader data
interface CompanyLoaderData {
  isAuthenticated: boolean;
}

export const Route = createFileRoute("/company/")({
  component: RouteComponent,
  beforeLoad: async ({ context }): Promise<CompanyLoaderData> => {
    try {
      // Use the queryKey directly from the userQueryOptions
      const currentUser = await context.queryClient.ensureQueryData({
        queryKey: ["currentUser"],
        queryFn: async () => {
          // This will be replaced by the actual queryFn from useUser
          return null;
        },
      });

      if (!currentUser) {
        // Instead of throwing an error, we'll let the component handle the authentication
        // This allows us to show the login drawer instead of redirecting
        return { isAuthenticated: false };
      }
      return { isAuthenticated: true };
    } catch (error) {
      console.error("Error checking authentication:", error);
      return { isAuthenticated: false };
    }
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
  // Get authentication status from the loader data
  const loaderData = Route.useLoaderData() as CompanyLoaderData;

  // Simple state to track authentication and loading
  const [isAuthenticated, setIsAuthenticated] = useState(
    loaderData?.isAuthenticated || false
  );
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication on component mount
  useEffect(() => {
    let isMounted = true;

    // Function to check if user is authenticated
    async function checkAuth() {
      try {
        // If already authenticated from loader data
        if (isAuthenticated) {
          if (isMounted) setIsLoading(false);
          return;
        }

        // Otherwise try to fetch current user
        const user = await getCurrentUser();

        if (user && isMounted) {
          setIsAuthenticated(true);
        } else if (isMounted) {
          // Show login drawer if not authenticated
          fillDrawer(SignInForm, "Sign In");
        }
      } catch (error) {
        console.error("Authentication error:", error);
        // Show login drawer on error
        if (isMounted) fillDrawer(SignInForm, "Sign In");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    checkAuth();
    return () => {
      isMounted = false;
    };
  }, [isAuthenticated]);

  // Show loading or authentication required message
  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">
            {isLoading ? "Loading..." : "Authentication Required"}
          </h2>
          {!isLoading && <p>Please sign in to access this area.</p>}
        </div>
      </div>
    );
  }

  // User is authenticated, render the full company layout
  return (
    <div className="flex flex-row">
      <div className="w-1/5">
        <QSidebar moduleList={moduleList} />
      </div>
      <div className="w-4/5">
        <Outlet />
      </div>
    </div>
  );
}
