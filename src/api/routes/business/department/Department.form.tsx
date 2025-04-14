import { useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Label, TextInput, Button, Spinner, HelperText } from "flowbite-react";
import QInput, { type Item } from "@/ui/QInput/QInput.ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  clientGetCompanies,
  clientGetDepartments,
  clientCreateDepartment,
  clientUpdateDepartment,
} from "@/utils/trpc";
import { z } from "zod";
import {
  createDepartmentSchema,
  updateDepartmentSchema,
} from "./department.zod";

import { showFlashMessage } from "@/ui/QFlashMessage/QFlashMessage.store";
import { closeDrawer } from "@/ui/QDrawer/QDrawer.store";

// Define form schema based on Zod validation schemas
const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Department name is required"),
  headcount: z.number().int().positive().optional().nullable(),
  // Fields for the QInput components
  company: z.string().optional(),
  parentDepartment: z.string().optional(),
  // IDs that will be mapped to companyID and parentID
  companyId: z.string().uuid({ message: "Please select a valid company" }),
  parentId: z.string().uuid().optional().nullable(),
});

type DepartmentFormValues = z.infer<typeof formSchema>;

interface DepartmentFormProps {
  currentDepartment?: Record<string, unknown> | null;
}

export function DepartmentForm({
  currentDepartment = null,
}: DepartmentFormProps) {
  // Fetch companies for dropdown selection
  const { data: companies } = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      return await clientGetCompanies();
    },
  });

  // Fetch departments for parent department dropdown
  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      return await clientGetDepartments();
    },
  });

  // Extract values from currentDepartment with proper type handling
  const getDepartmentValue = useCallback(
    <T,>(path: string, defaultValue: T): T => {
      const parts = path.split(".");
      let value: Record<string, unknown> | null = currentDepartment as Record<
        string,
        unknown
      > | null;

      for (const part of parts) {
        if (!value || typeof value !== "object") return defaultValue;
        value = value[part] as Record<string, unknown> | null;
      }

      return (value as unknown as T) ?? defaultValue;
    },
    [currentDepartment]
  );

  // Create mutation for adding a new department
  const createMutation = useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      // Use the client function from trpc.ts
      const response = await clientCreateDepartment(
        createDepartmentSchema.parse(data)
      );
      return response;
    },
    onSuccess: (data) => {
      showFlashMessage(
        "success",
        `${data?.data?.title || "Department"} has been created`
      );
      window.dispatchEvent(
        new CustomEvent("departmentCreated", { detail: data?.data })
      );
      closeDrawer();
    },
    onError: (error: Error) => {
      showFlashMessage("fail", error.message);
    },
  });

  // Update mutation for editing an existing department
  const updateMutation = useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      // Use the client function from trpc.ts
      const response = await clientUpdateDepartment(data.id as string)(
        updateDepartmentSchema.parse(data)
      );
      return response;
    },
    onSuccess: (data) => {
      showFlashMessage(
        "success",
        `${data?.data?.title || "Department"} has been updated`
      );
      window.dispatchEvent(
        new CustomEvent("departmentUpdated", { detail: data?.data })
      );
      closeDrawer();
    },
    onError: (error: Error) => {
      showFlashMessage("fail", error.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<DepartmentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: getDepartmentValue<string>("id", ""),
      title: getDepartmentValue<string>("title", ""),
      headcount: getDepartmentValue<number | null>("headcount", null),
      company: getDepartmentValue<string>("expand.company.title", ""),
      parentDepartment: getDepartmentValue<string>("expand.parent.title", ""),
      companyId:
        typeof getDepartmentValue<unknown>("company", "") === "object"
          ? getDepartmentValue<{ id: string }>("company", { id: "" }).id
          : getDepartmentValue<string>("companyID", ""),
      parentId:
        typeof getDepartmentValue<unknown>("parent", "") === "object"
          ? getDepartmentValue<{ id: string }>("parent", { id: "" }).id
          : getDepartmentValue<string | null>("parentID", null),
    },
  });

  // Type-safe form submission handler
  const onSubmit: SubmitHandler<DepartmentFormValues> = useCallback(
    (data) => {
      // Prepare the data for API submission
      const submissionData = {
        title: data.title,
        headcount: data.headcount,
        companyID: data.companyId,
        parentID: data.parentId,
      };

      if (currentDepartment) {
        // Update existing department
        updateMutation.mutate({
          id: getDepartmentValue<string>("id", ""),
          ...submissionData,
        });
      } else {
        // Create new department
        createMutation.mutate(submissionData);
      }
    },
    [currentDepartment, createMutation, updateMutation, getDepartmentValue]
  );

  const formIsLoading = createMutation.isPending || updateMutation.isPending;

  // Filter out the current department from parent department options to prevent circular references
  const filteredDepartments =
    departments?.data?.filter(
      (dept: Record<string, unknown>) =>
        dept.id !== getDepartmentValue<string>("id", "")
    ) || [];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Department Name */}
      <div>
        <Label htmlFor="title">Department Name</Label>
        <TextInput
          id="title"
          {...register("title")}
          color={errors.title ? "failure" : "gray"}
        />
        <HelperText color={errors.title ? "failure" : "gray"}>
          {errors.title?.message}
        </HelperText>
      </div>

      {/* Company */}
      <div>
        <QInput
          label="Company"
          id="company"
          name="company"
          value={watch("company")}
          items={(companies?.data || []) as unknown as Item[]}
          searchField="title"
          error={errors.companyId?.message}
          onChange={(e) => {
            setValue("company", e.target.value);
            setValue("companyId", e.target.dataset.id || "");
          }}
        />
      </div>

      {/* Parent Department */}
      <div>
        <QInput
          label="Parent Department (Optional)"
          id="parentDepartment"
          name="parentDepartment"
          value={watch("parentDepartment")}
          items={filteredDepartments as unknown as Item[]}
          searchField="title"
          error={errors.parentId?.message}
          onChange={(e) => {
            setValue("parentDepartment", e.target.value);
            setValue("parentId", e.target.dataset.id || null);
          }}
        />
      </div>

      {/* Headcount */}
      <div>
        <Label htmlFor="headcount">Headcount</Label>
        <TextInput
          id="headcount"
          type="number"
          {...register("headcount", { valueAsNumber: true })}
          color={errors.headcount ? "failure" : "gray"}
        />
        <HelperText color={errors.headcount ? "failure" : "gray"}>
          {errors.headcount?.message}
        </HelperText>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button type="submit" color="dark" disabled={formIsLoading}>
          {formIsLoading ? (
            <>
              <Spinner size="sm" className="mr-2" />
              {currentDepartment ? "Updating" : "Creating"}...
            </>
          ) : (
            <>{currentDepartment ? "Update" : "Create"} Department</>
          )}
        </Button>
      </div>
    </form>
  );
}
