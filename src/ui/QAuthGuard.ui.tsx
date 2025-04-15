import { ReactNode, useEffect } from "react";
import { useUser } from "@/utils/client.store";
import { fillDrawer } from "@/ui/QDrawer/QDrawer.store";
import SignInForm from "@/api/routes/auth/SignIn.form";
import { Spinner } from "flowbite-react";

interface QAuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  requireVerified?: boolean;
}

/**
 * Component that guards routes requiring authentication
 * Shows login drawer if user is not authenticated
 */
export function QAuthGuard({
  children,
  fallback,
  requireVerified = false,
}: QAuthGuardProps) {
  const { data: user, isLoading } = useUser();
  const isAuthenticated = user != null;

  // Show login drawer if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      fillDrawer(SignInForm, "Sign In");
    }
  }, [isAuthenticated, isLoading]);

  // Check verification status if required
  const hasRequiredVerification = !requireVerified || user?.isVerified === true;

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  // Show authentication required message or fallback
  if (!isAuthenticated) {
    return fallback ? (
      <>{fallback}</>
    ) : (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">
            Authentication Required
          </h2>
          <p>Please sign in to access this area.</p>
        </div>
      </div>
    );
  }

  // Check verification status
  if (!hasRequiredVerification) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">
            Email Verification Required
          </h2>
          <p>Please verify your email address to access this area.</p>
        </div>
      </div>
    );
  }

  // User is authenticated with proper verification status, render children
  return <>{children}</>;
}
