import { zodResolver } from "@hookform/resolvers/zod";
import { Label, TextInput, Button, HelperText } from "flowbite-react";
import { useForm } from "react-hook-form";
import { resetPasswordSchema, type ResetPassword } from "./auth.zod";
import { clientResetPassword } from "@/utils/trpc";
import { showFlashMessage } from "@/ui/QFlashMessage/QFlashMessage.store";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { fillDrawer } from "@/ui/QDrawer/QDrawer.store";
import SignInForm from "@/routes/auth/_SignIn.form";
import { useUser, useSetUser } from "@/utils/client.store";
import { useNavigate } from "@tanstack/react-router";

interface ResetPasswordFormProps {
  token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ResetPassword>({
    defaultValues: {
      token,
      password: "",
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const { data: currentUser } = useUser();
  const { setUser } = useSetUser();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Effect to handle countdown and sign out
  useEffect(() => {
    if (countdown === null) return;

    if (countdown <= 0) {
      // Sign out the user
      setUser(null);
      navigate({ to: "/" });
      fillDrawer(SignInForm, "Sign in");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, navigate, setUser]);

  const resetPasswordMutation = useMutation({
    mutationFn: async (data: ResetPassword) => {
      // Add artificial delay to prevent double submissions even with fast network
      await new Promise((resolve) => setTimeout(resolve, 300));
      return clientResetPassword(data);
    },
    onSuccess: () => {
      // Clear form
      reset();

      if (currentUser) {
        // If user is authenticated, start countdown for sign out
        setCountdown(3);
        showFlashMessage(
          "success",
          "Password reset successfully. You will be signed out in 3 seconds."
        );
      } else {
        // If not authenticated, just show success message
        showFlashMessage("success", "Password reset successfully");
        // Show sign in form in drawer
        fillDrawer(SignInForm, "Sign in");
      }
    },
    onError: (error) => {
      showFlashMessage(
        "fail",
        error instanceof Error ? error.message : "Failed to reset password"
      );
    },
  });

  const handleResetPassword = (data: ResetPassword) => {
    resetPasswordMutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleResetPassword)}
      className="flex flex-col w-full space-y-4"
    >
      <p className="text-sm text-gray-600">
        Please enter your new password below.
      </p>

      <div>
        <Label htmlFor="password">New Password</Label>
        <div className="relative">
          <TextInput
            type={showPassword ? "text" : "password"}
            icon={() => <span className="text-lg">🔑</span>}
            color={errors.password ? "failure" : "gray"}
            {...register("password")}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "🔓" : "🔒"}
          </button>
        </div>
        <HelperText>{errors.password?.message}</HelperText>
      </div>

      <Button
        type="submit"
        color="dark"
        disabled={isSubmitting || resetPasswordMutation.isPending}
      >
        {isSubmitting || resetPasswordMutation.isPending
          ? "Processing..."
          : "Reset Password"}
      </Button>
    </form>
  );
}
