import { z } from "zod";

// API Response
export type ApiResponse<T = null> = {
  success: boolean;
  message: string;
  data: T | null;
};

export type User = {
  email: string;
  id: string;
  fullname: string | null;
  avatar: string | null;
};

// Common timestamp fields for all database entities
export const timestampFields = {
  createdAt: z.string().nullable().optional(),
  updatedAt: z.string().nullable().optional(),
} as const;
