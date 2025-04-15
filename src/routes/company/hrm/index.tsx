import { createFileRoute } from "@tanstack/react-router";
import { QAuthGuard } from "@/ui/QAuthGuard.ui";
import { authGuard } from "@/utils/auth.guard";
import { User } from "@/api/utils/types";

// Define the type for the loader data
interface HrmLoaderData {
  isAuthenticated: boolean;
  user: User | null;
}

export const Route = createFileRoute("/company/hrm/")({
  component: RouteComponent,
  // Use the auth guard for route protection
  beforeLoad: async ({ context }): Promise<HrmLoaderData> => {
    try {
      // Use the authGuard utility to protect this route
      // This will redirect to the login page if not authenticated
      const { isAuthenticated, user } = await authGuard(context.queryClient);
      return { isAuthenticated, user };
    } catch (error) {
      // The authGuard will redirect if not authenticated
      // This code will only run if there's a different error
      console.error("Error in HRM route protection:", error);
      throw error;
    }
  },
});

function RouteComponent() {
  // Wrap the component with QAuthGuard to protect it
  // You can also require email verification if needed
  return (
    <QAuthGuard requireVerified={true}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Human Resources Management</h1>
        <p>
          This is a protected route that requires authentication and email
          verification.
        </p>
      </div>
    </QAuthGuard>
  );
}
