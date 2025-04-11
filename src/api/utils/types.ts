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
  gender: string | null;
  dob: string | null;
  contact: string | Record<string, string | number | boolean> | null;
  address: string | Record<string, string | number | boolean> | null;
  createdAt: string | null;
  updatedAt: string | null;
  isVerified: boolean;
};

// Common timestamp fields for all database entities
export const timestampFields = {
  createdAt: z.string().nullable().optional(),
  updatedAt: z.string().nullable().optional(),
} as const;

// Helper function to create API responses
export const createApiResponse = <T = null>(
  success: boolean,
  message: string,
  data: T = null as T
): ApiResponse<T> => {
  return { success, message, data };
};
