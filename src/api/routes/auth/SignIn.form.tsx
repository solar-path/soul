import { zodResolver } from "@hookform/resolvers/zod";
import { Label, TextInput, Button, HelperText } from "flowbite-react";
import { useForm } from "react-hook-form";
import { closeDrawer, fillDrawer } from "@/ui/QDrawer/QDrawer.store";
import { SignIn, signInSchema } from "./auth.zod";
import SignUpForm from "./SignUp.form";
import ForgotPasswordForm from "./Forgot.form";
import { trpc } from "@/utils/trpc";
import { showFlashMessage } from "@/ui/QFlashMessage/QFlashMessage.store";
import { useMutation } from "@tanstack/react-query";
import { setCurrentUser } from "@/utils/client.store";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignIn>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });

  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle password visibility
  };

  const navigate = useNavigate();

  const signInMutation = useMutation({
    mutationFn: async (data: SignIn) => {
      const response = await trpc["auth"].signin.$post({
        json: data,
      });
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message);
      }
      return result;
    },
    onSuccess: (result) => {
      // Clear form and close drawer
      setCurrentUser(result.data);
      reset();
      closeDrawer();

      // Show success message
      showFlashMessage(
        "success",
        `${result.data?.email} successfully signed in`
      );

      // Navigate to company page
      navigate({ to: "/company" });
    },
    onError: (error) => {
      showFlashMessage(
        "fail",
        error instanceof Error ? error.message : "Failed to sign in"
      );
    },
  });

  const handleSignIn = (data: SignIn) => {
    signInMutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSignIn)}
      className="flex flex-col w-full space-y-2"
    >
      <p className="text-sm text-gray-600">
        Please enter your credentials to log in to your account.
      </p>
      <div>
        <Label htmlFor="email">Email</Label>
        <TextInput
          type="email"
          icon={() => <span className="text-lg">✉️</span>}
          {...register("email")}
          color={errors.email ? "failure" : "gray"}
        />
        <HelperText>{errors.email?.message}</HelperText>
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <TextInput
            type={showPassword ? "text" : "password"}
            icon={() => <span className="text-lg">🔑</span>}
            color={errors.password ? "failure" : "gray"}
            {...register("password")}
          />
          <HelperText>{errors.password?.message}</HelperText>
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "🔓" : "🔒"}
          </button>
        </div>
      </div>

      <Button type="submit" color="dark">
        Login
      </Button>

      <ul>
        <li>
          <p className="text-sm">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-red-500"
              onClick={() => fillDrawer(SignUpForm, "Sign up")}
            >
              Sign up
            </button>
          </p>
        </li>
        <li>
          <p className="text-sm">
            Forgot password?{" "}
            <button
              type="button"
              className="text-red-500"
              onClick={() => fillDrawer(ForgotPasswordForm, "Forgot password")}
            >
              Remind
            </button>
          </p>
        </li>
      </ul>
    </form>
  );
}
