import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button, Card, Spinner } from "flowbite-react";
import { HiCheckCircle, HiExclamationCircle } from "react-icons/hi";
import { trpc } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";
import { fillDrawer } from "@/ui/QDrawer/QDrawer.store";
import SignInForm from "@/api/routes/auth/SignIn.form";

export const Route = createFileRoute("/auth/verify/$token")({
  component: VerifyAccount,
});

function VerifyAccount() {
  const { token } = Route.useParams();
  const navigate = useNavigate();

  // Use TanStack Query with trpc to verify the account
  const { isLoading, data, error } = useQuery({
    queryKey: ["verifyAccount", token],
    queryFn: async () => {
      try {
        // Use the correct syntax for Hono client with path parameters
        const response = await trpc.auth.verify[":token"].$get({
          param: { token },
        });
        // Process Hono client responses with .json() method as per project rules
        return await response.json();
      } catch (err) {
        console.error("Verification error:", err);
        throw err;
      }
    },
    retry: 1, // Only retry once if there's an error
  });

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="max-w-md w-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Account Verification</h2>

          {isLoading && (
            <div className="flex flex-col items-center space-y-4">
              <Spinner size="xl" />
              <p>Verifying your account...</p>
            </div>
          )}

          {!isLoading && data?.success && (
            <div className="flex flex-col items-center space-y-4">
              <HiCheckCircle className="h-16 w-16 text-green-500" />
              <p className="text-lg">{data.message}</p>
              <Button
                color="dark"
                onClick={() => fillDrawer(SignInForm, "Sign in")}
              >
                Go to Login
              </Button>
            </div>
          )}

          {!isLoading && (error || !data?.success) && (
            <div className="flex flex-col items-center space-y-4">
              <HiExclamationCircle className="h-16 w-16 text-red-500" />
              <p className="text-lg text-red-600">
                {data?.message ||
                  "Verification failed. Please try again or contact support."}
              </p>
              <Button color="dark" onClick={() => navigate({ to: "/" })}>
                Return to Home
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
