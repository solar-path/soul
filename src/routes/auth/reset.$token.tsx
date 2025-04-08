import { createFileRoute } from "@tanstack/react-router";
import { Card } from "flowbite-react";
import ResetPasswordForm from "@/api/routes/auth/ResetPassword.form";
import { useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/reset/$token")({
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const { token } = useParams({ from: "/auth/reset/$token" });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-4">
        <Card className="w-full">
          <h2 className="text-2xl font-bold text-center mb-6">
            Reset Your Password
          </h2>
          <ResetPasswordForm token={token} />
        </Card>
      </div>
    </div>
  );
}
