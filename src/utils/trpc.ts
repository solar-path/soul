import { ApiRoutes } from "@/api/api";
import {
  Forgot,
  ResetPassword,
  SignIn,
  SignUp,
  UpdateProfile,
} from "@/api/routes/auth/auth.zod";
import { Country } from "@/api/routes/business/country/country.zod";
import { Industry } from "@/api/routes/business/industry/industry.zod";
import type {
  Company,
  createCompanySchema,
  updateCompanySchema,
} from "@/api/routes/business/company/company.zod";
import type {
  Position,
  createPositionSchema,
  updatePositionSchema,
} from "@/api/routes/business/position/position.zod";
import type {
  Department,
  createDepartmentSchema,
  updateDepartmentSchema,
} from "@/api/routes/business/department/department.zod";
import type { z } from "zod";
import { hc } from "hono/client";
import { ApiResponse, User } from "@/api/utils/types";

// Create Hono client with credentials included
export const trpc = hc<ApiRoutes>("/", {
  fetch: (input: RequestInfo | URL, init?: RequestInit) =>
    fetch(input, {
      ...init,
      credentials: "include",
    }),
}).api;

export const getCurrentUser = async () => {
  try {
    const response = await trpc.auth.user.$get();
    if (!response.ok) return null;

    const result = await response.json();
    if (!result.success) return null;

    return result.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

/**
 * Create a client function for API endpoints
 * @param endpoint Function to call the API endpoint
 * @returns A function that takes data and returns a typed response
 */
const clientPostFunction = <TData, TResponse>(
  endpoint: (data: { json: TData }) => Promise<Response>
) => {
  return async (data: TData): Promise<ApiResponse<TResponse>> => {
    const response = await endpoint({ json: data });
    const result = (await response.json()) as ApiResponse<TResponse>;

    if (!result.success) {
      throw new Error(result.message);
    }

    return result;
  };
};

// For GET requests that don't need a payload, we can use a simple wrapper
const clientGetFunction = <TResponse>(endpoint: () => Promise<Response>) => {
  return async (): Promise<ApiResponse<TResponse>> => {
    const response = await endpoint();
    const result = (await response.json()) as ApiResponse<TResponse>;

    if (!result.success) {
      throw new Error(result.message);
    }

    return result;
  };
};

// Client functions for auth endpoints
export const clientSignIn = clientPostFunction<SignIn, User>(
  trpc["auth"].signin.$post
);

export const clientSignUp = clientPostFunction<
  SignUp,
  { verificationSent: boolean }
>(trpc["auth"].signup.$post);

export const clientResetPassword = clientPostFunction<
  ResetPassword,
  { reset: boolean }
>(trpc.auth["reset-password"].$post);

export const clientForgotPassword = clientPostFunction<
  Forgot,
  { sent: boolean }
>(trpc.auth.forgot.$post);

export const clientUpdateProfile = clientPostFunction<UpdateProfile, User>(
  trpc.auth.updateProfile.$post
);

// Client functions for business endpoints
export const clientGetCountries = clientGetFunction<Country[]>(
  trpc.business.country.$get
);

export const clientGetIndustries = clientGetFunction<Industry[]>(
  trpc.business.industry.$get
);

// Client functions for company endpoints
export const clientGetCompanies = clientGetFunction<Company[]>(
  trpc.business.company.companyList.$get
);

export const clientCreateCompany = clientPostFunction<
  z.infer<typeof createCompanySchema>,
  Company
>(trpc.business.company.newCompany.$post);

// Client function for updating a company
export const clientUpdateCompany = (id: string) => {
  return async (
    data: z.infer<typeof updateCompanySchema>
  ): Promise<ApiResponse<Company>> => {
    // Using the Hono client with the correct endpoint structure
    // The endpoint is defined as "/updateCompany/:id" in company.routes.ts
    const client = trpc.business.company.updateCompany[":id"];
    const response = await client.$patch({
      param: { id },
      json: data,
    });

    const result = (await response.json()) as ApiResponse<Company>;

    if (!result.success) {
      throw new Error(result.message);
    }

    return result;
  };
};

// Client functions for position endpoints
export const clientGetPositions = clientGetFunction<Position[]>(
  trpc.business.position.$get
);

export const clientCreatePosition = clientPostFunction<
  z.infer<typeof createPositionSchema>,
  Position
>(trpc.business.position.$post);

export const clientUpdatePosition = (id: string) => {
  return async (
    data: z.infer<typeof updatePositionSchema>
  ): Promise<ApiResponse<Position>> => {
    const response = await trpc.business.position[":id"].$patch({
      param: { id },
      json: data,
    });

    const result = (await response.json()) as ApiResponse<Position>;

    if (!result.success) {
      throw new Error(result.message);
    }

    return result;
  };
};

// Client functions for department endpoints
export const clientGetDepartments = clientGetFunction<Department[]>(
  trpc.business.department.$get
);

export const clientCreateDepartment = clientPostFunction<
  z.infer<typeof createDepartmentSchema>,
  Department
>(trpc.business.department.$post);

export const clientUpdateDepartment = (id: string) => {
  return async (
    data: z.infer<typeof updateDepartmentSchema>
  ): Promise<ApiResponse<Department>> => {
    const response = await trpc.business.department[":id"].$put({
      param: { id },
      json: data,
    });

    const result = (await response.json()) as ApiResponse<Department>;

    if (!result.success) {
      throw new Error(result.message);
    }

    return result;
  };
};
