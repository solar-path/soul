import { Label, TextInput, Button, Checkbox, HelperText } from "flowbite-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { closeDrawer, fillDrawer } from "@/ui/QDrawer/QDrawer.store";
import SignInForm from "./SignIn.form";
import { SignUp, signUpSchema } from "./auth.zod";
import { useMutation } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import { showFlashMessage } from "@/ui/QFlashMessage/QFlashMessage.store";
import { useState } from "react";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUp>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      termsAcceptance: false,
    },
    resolver: zodResolver(signUpSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const signUpMutation = useMutation({
    mutationFn: async (data: SignUp) => {
      const response = await trpc["auth"].signup.$post({
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
      reset();
      closeDrawer();

      // Show success message
      showFlashMessage("success", result.message);
    },
    onError: (error) => {
      showFlashMessage(
        "fail",
        error instanceof Error ? error.message : "Failed to sign up"
      );
    },
  });

  const handleSignUp = (data: SignUp) => {
    signUpMutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSignUp)}
      className="flex flex-col w-full space-y-2"
    >
      <p className="text-sm">
        Please fill in the details below to create your account. Ensure your
        password meets the required criteria.
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
            autoComplete="off"
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

      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <TextInput
            autoComplete="off"
            type={showConfirmPassword ? "text" : "password"}
            icon={() => <span className="text-lg">🔑</span>}
            color={errors.confirmPassword ? "failure" : "gray"}
            {...register("confirmPassword")}
          />
          <HelperText>{errors.confirmPassword?.message}</HelperText>
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={toggleConfirmPasswordVisibility}
          >
            {showConfirmPassword ? "🔓" : "🔒"}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Checkbox id="terms" {...register("termsAcceptance")} />
          <Label htmlFor="terms">
            I agree to the&nbsp;
            <a className="text-red-500" href="/docs/terms">
              Terms of Use
            </a>
            &nbsp;and&nbsp;
            <a className="text-red-500" href="/docs/privacy">
              Privacy Policy
            </a>
          </Label>
        </div>
        {errors.termsAcceptance && (
          <p className="text-sm text-red-500">
            {errors.termsAcceptance.message}
          </p>
        )}
      </div>

      <Button type="submit" color="dark">
        Register
      </Button>
      <ul>
        <li>
          {" "}
          <p className="text-sm">
            Have an account?{" "}
            <button
              type="button"
              className="text-red-500"
              onClick={() => fillDrawer(SignInForm, "Sign in")}
            >
              Sign in
            </button>
          </p>
        </li>
      </ul>
    </form>
  );
}
