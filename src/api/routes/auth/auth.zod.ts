import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^a-zA-Z0-9]/,
    "Password must contain at least one special character"
  );

export const signInSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
});

export type SignIn = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: passwordSchema,
    confirmPassword: passwordSchema,
    termsAcceptance: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUp = z.infer<typeof signUpSchema>;

export const activateSchema = z.object({
  token: z.string(),
});

export type Activate = z.infer<typeof activateSchema>;

export const forgotSchema = z.object({
  email: z.string().email(),
});

export type Forgot = z.infer<typeof forgotSchema>;

export const resetPasswordSchema = z.object({
  token: z.string(),
  password: passwordSchema,
});

export type ResetPassword = z.infer<typeof resetPasswordSchema>;
