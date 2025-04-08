import { Label, Button, TextInput, HelperText } from "flowbite-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotSchema, type Forgot } from "@/api/routes/auth/auth.zod";
import { trpc } from "@/utils/trpc";
import { useMutation } from "@tanstack/react-query";
import { showFlashMessage } from "@/ui/QFlashMessage/QFlashMessage.store";
import { closeDrawer } from "@/ui/QDrawer/QDrawer.store";

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Forgot>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotSchema),
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: async (data: Forgot) => {
      const response = await trpc.auth.forgot.$post({
        json: data,
      });
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        reset();
        showFlashMessage(
          "success",
          "If your email is registered, you will receive a password reset link"
        );
        closeDrawer();
      }
    },
    onError: () => {
      showFlashMessage("fail", "An error occurred. Please try again later.");
    },
  });

  const onSubmit = (data: Forgot) => {
    forgotPasswordMutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full space-y-2"
    >
      <div>
        <Label htmlFor="email">Email</Label>

        <TextInput
          type="email"
          {...register("email")}
          color={errors.email ? "failure" : "gray"}
          icon={() => <span className="text-lg">✉️</span>}
        />
        <HelperText>{errors.email?.message}</HelperText>
      </div>

      <Button
        type="submit"
        color="dark"
        disabled={forgotPasswordMutation.isPending}
      >
        {forgotPasswordMutation.isPending
          ? "Processing..."
          : "Send instructions"}
      </Button>
    </form>
  );
}
