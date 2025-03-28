import { z } from "zod";

export const contactUsSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .min(1, { message: "Required field" }),
  message: z.string().min(1, { message: "Required field" }),
});

export type ContactUs = z.infer<typeof contactUsSchema>;

export type ContactUsResponse = {
  id: string;
  email: string;
  message: string;
  createdAt: string | null;
  updatedAt: string | null;
  response: string | null;
};

export const trackContactUsSchema = z.object({
  id: z.string().min(1, { message: "Required field" }),
});

export type TrackContactUs = z.infer<typeof trackContactUsSchema>;

export const respondToContactUsSchema = z.object({
  id: z.string().min(1, { message: "Required field" }),
  contactUsID: z.string().min(1, { message: "Required field" }),
  message: z.string().min(1, { message: "Required field" }),
  author: z.string().min(1, { message: "Required field" }),
  createdAt: z.string().nullable(),
  updatedAt: z.string().nullable(),
});

export type RespondToContactUs = z.infer<typeof respondToContactUsSchema>;
