import { QSidebarProps } from "@/ui/QSidebar.ui";
import { QSidebar } from "@/ui/QSidebar.ui";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { fillDrawer } from "@/ui/QDrawer/QDrawer.store";
import SignInForm from "@/api/routes/auth/SignIn.form";
import { useEffect, useState } from "react";
import { useUser } from "@/utils/client.store";
import { useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();
  
  // Use TanStack Query to fetch and manage user data
  const { data: user, isLoading } = useUser();
  
  // Determine authentication status based on user data or loader data
  const isAuthenticated = user != null || loaderData?.isAuthenticated || false;

  // Track if user just signed out to prevent drawer from opening
  const [justSignedOut, setJustSignedOut] = useState(false);
  
  // Listen for authentication events
  useEffect(() => {
    // Create a custom event listener for auth changes
    const handleAuthChange = () => {
      // Invalidate the user query to refresh data without page reload
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    };
    
    // Create a custom event listener for sign out
    const handleSignOut = () => {
      // Set flag to prevent login drawer from opening immediately after sign-out
      setJustSignedOut(true);
      // Reset the flag after navigation (after 1 second)
      setTimeout(() => setJustSignedOut(false), 1000);
    };

    // Add event listeners
    window.addEventListener('auth-state-changed', handleAuthChange);
    window.addEventListener('user-signed-out', handleSignOut);
    
    // Clean up
    return () => {
      window.removeEventListener('auth-state-changed', handleAuthChange);
      window.removeEventListener('user-signed-out', handleSignOut);
    };
  }, [queryClient]);

  // Show login drawer if not authenticated, not loading, and not just signed out
  useEffect(() => {
    if (!isLoading && !isAuthenticated && !justSignedOut) {
      fillDrawer(SignInForm, "Sign In");
    }
  }, [isAuthenticated, isLoading, justSignedOut]);

  // Show loading or authentication required message
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Loading...</h2>
        </div>
      </div>
    );
  }
  
  // Show authentication required message
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Authentication Required</h2>
          <p>Please sign in to access this area.</p>
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
