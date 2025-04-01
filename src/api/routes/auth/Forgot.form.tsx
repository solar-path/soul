import { Label, Button, TextInput, HelperText } from "flowbite-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotSchema } from "@/api/routes/auth/auth.zod";

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotSchema),
  });

  return (
    <form
      onSubmit={handleSubmit((data) => console.log(data))}
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
      <Button type="submit" color="dark">
        Send instructions
      </Button>
    </form>
  );
}
