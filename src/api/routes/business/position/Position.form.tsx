import { useCallback } from "react";
import { useForm, Resolver } from "react-hook-form";
import {
  Label,
  TextInput,
  Button,
  Spinner,
  Checkbox,
  Textarea,
} from "flowbite-react";
import QInput from "@/ui/QInput/QInput.ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Item } from "@/ui/QInput/QInput.ui";
import {
  clientGetCompanies,
  clientGetPositions,
  clientCreatePosition,
  clientUpdatePosition,
} from "@/utils/trpc";
import { z } from "zod";
import { createPositionSchema, updatePositionSchema } from "./position.zod";

import { showFlashMessage } from "@/ui/QFlashMessage/QFlashMessage.store";
import { closeDrawer } from "@/ui/QDrawer/QDrawer.store";

// Define form schema for the UI
const formSchema = z.object({
  // Fields from the API schema
  id: z.string().optional(),
  title: z.string().min(1, "Position title is required"),
  isVacant: z.boolean().default(true),
  companyID: z.string().uuid({ message: "Please select a valid company" }),
  parentID: z.string().uuid().optional().nullable(),

  // UI-specific fields for the QInput components
  company: z.string().optional(),
  parentPosition: z.string().optional(),

  // Job description fields - flattened for the form
  responsibilities: z.array(z.string()).default([]),
  requirements: z.array(z.string()).default([]),
  qualifications: z.array(z.string()).default([]),
  benefits: z.array(z.string()).default([]),

  // Salary fields - flattened for the form
  salaryMin: z.number().optional().nullable(),
  salaryMax: z.number().optional().nullable(),
  salaryCurrency: z.string().optional().nullable(),
  salaryPeriod: z
    .enum(["hourly", "daily", "weekly", "monthly", "yearly"])
    .optional()
    .nullable(),
});

type PositionFormValues = z.infer<typeof formSchema>;

interface PositionFormProps {
  currentPosition?: Record<string, unknown> | null;
}

export function PositionForm({ currentPosition = null }: PositionFormProps) {
  // Fetch companies for dropdown selection
  const { data: companies } = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      return await clientGetCompanies();
    },
  });

  // Fetch positions for parent position dropdown
  const { data: positions } = useQuery({
    queryKey: ["positions"],
    queryFn: async () => {
      return await clientGetPositions();
    },
  });

  // Extract values from currentPosition with proper type handling
  const getPositionValue = useCallback(
    <T,>(path: string, defaultValue: T): T => {
      if (!currentPosition) return defaultValue;

      const parts = path.split(".");
      let value: Record<string, unknown> | null = currentPosition as Record<
        string,
        unknown
      > | null;

      for (const part of parts) {
        if (!value || typeof value !== "object") return defaultValue;
        value = value[part] as Record<string, unknown> | null;
      }

      return (value as unknown as T) ?? defaultValue;
    },
    [currentPosition]
  );

  // Set default form values based on current position
  const defaultValues = useCallback(() => {
    const defaults: Partial<PositionFormValues> = {
      isVacant: true,
    };

    if (currentPosition) {
      // Extract job description fields
      const jobDescription = getPositionValue<Record<string, unknown>>(
        "jobDescription",
        {}
      );
      const responsibilities =
        (jobDescription?.responsibilities as string[]) || [];
      const requirements = (jobDescription?.requirements as string[]) || [];
      const qualifications = (jobDescription?.qualifications as string[]) || [];
      const benefits = (jobDescription?.benefits as string[]) || [];

      // Extract salary fields
      const salary = getPositionValue<Record<string, unknown>>("salary", {});
      const salaryMin = (salary?.min as number | null) || null;
      const salaryMax = (salary?.max as number | null) || null;
      const salaryCurrency = (salary?.currency as string | null) || null;
      const salaryPeriod = (salary?.period as string | null) || null;

      // Populate form values
      Object.assign(defaults, {
        id: getPositionValue<string>("id", ""),
        title: getPositionValue<string>("title", ""),
        isVacant: getPositionValue<boolean>("isVacant", true),
        company: getPositionValue<string>("expand.company.title", ""),
        parentPosition: getPositionValue<string>("expand.parent.title", ""),
        companyID:
          typeof getPositionValue<unknown>("company", "") === "object"
            ? getPositionValue<{ id: string }>("company", { id: "" }).id
            : getPositionValue<string>("companyID", ""),
        parentID:
          typeof getPositionValue<unknown>("parent", "") === "object"
            ? getPositionValue<{ id: string }>("parent", { id: "" }).id
            : getPositionValue<string | null>("parentID", null),
        responsibilities,
        requirements,
        qualifications,
        benefits,
        salaryMin,
        salaryMax,
        salaryCurrency,
        salaryPeriod,
      });
    }

    return defaults;
  }, [currentPosition, getPositionValue]);

  // Create mutation for adding a new position
  const createMutation = useMutation({
    mutationFn: async (data: PositionFormValues) => {
      // Prepare the data for submission according to the API schema
      const apiData = {
        title: data.title,
        isVacant: data.isVacant,
        companyID: data.companyID,
        parentID: data.parentID || null,
        // Create job description object according to the jobDescriptionSchema
        jobDescription: {
          responsibilities: data.responsibilities,
          requirements: data.requirements,
          qualifications: data.qualifications,
          benefits: data.benefits,
        },
        // Create salary object according to the salarySchema
        salary: {
          min: data.salaryMin,
          max: data.salaryMax,
          currency: data.salaryCurrency,
          period: data.salaryPeriod,
        },
      };

      // Use the client function from trpc.ts
      const response = await clientCreatePosition(
        createPositionSchema.parse(apiData)
      );
      return response.data;
    },
    onSuccess: () => {
      showFlashMessage("success", "Position created successfully");
      closeDrawer();
      // Invalidate positions query to refresh the list
      // queryClient.invalidateQueries({ queryKey: ["positions"] });
    },
    onError: (error: Error) => {
      showFlashMessage("fail", error.message);
    },
  });

  // Update mutation for editing an existing position
  const updateMutation = useMutation({
    mutationFn: async (data: PositionFormValues) => {
      // Prepare the data for submission according to the API schema
      const apiData: Record<string, unknown> = {
        title: data.title,
        isVacant: data.isVacant,
        companyID: data.companyID,
        parentID: data.parentID || null,
        // Create job description object according to the jobDescriptionSchema
        jobDescription: {
          responsibilities: data.responsibilities,
          requirements: data.requirements,
          qualifications: data.qualifications,
          benefits: data.benefits,
        },
        // Create salary object according to the salarySchema
        salary: {
          min: data.salaryMin,
          max: data.salaryMax,
          currency: data.salaryCurrency,
          period: data.salaryPeriod,
        },
      };

      // Add ID for updating
      if (data.id) {
        apiData.id = data.id;
      }

      // Use the client function from trpc.ts
      const response = await clientUpdatePosition(data.id as string)(
        updatePositionSchema.parse(apiData)
      );
      return response.data;
    },
    onSuccess: () => {
      showFlashMessage("success", "Position updated successfully");
      closeDrawer();
      // Invalidate positions query to refresh the list
      // queryClient.invalidateQueries({ queryKey: ["positions"] });
    },
    onError: (error: Error) => {
      showFlashMessage("fail", error.message);
    },
  });

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PositionFormValues>({
    resolver: zodResolver(
      formSchema
    ) as unknown as Resolver<PositionFormValues>,
    defaultValues: defaultValues(),
  });

  // Form submission handler
  const onSubmit = useCallback(
    (data: Record<string, unknown>) => {
      const typedData = data as unknown as PositionFormValues;
      if (currentPosition) {
        // Update existing position
        updateMutation.mutate(typedData);
      } else {
        // Create new position
        createMutation.mutate(typedData);
      }
    },
    [currentPosition, createMutation, updateMutation]
  );

  // Determine if form is in loading state
  const formIsLoading = createMutation.isPending || updateMutation.isPending;

  // Filter out current position from parent position dropdown to prevent circular references
  const filteredPositions =
    positions?.data?.filter(
      (position: { id: string }) => position.id !== getPositionValue("id", "")
    ) || [];

  // Helper function to handle array field changes
  const handleArrayFieldChange = (fieldName: string, value: string) => {
    const newValues = value.split("\n").filter((item) => item.trim() !== "");
    setValue(fieldName as keyof PositionFormValues, newValues as string[]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Position Title */}
      <div>
        <Label htmlFor="title">Position Title</Label>
        <TextInput
          id="title"
          {...register("title")}
          color={errors.title ? "failure" : "gray"}
        />
        {errors.title && (
          <div className="text-red-500 text-sm mt-1">
            {errors.title.message}
          </div>
        )}
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
          error={errors.companyID?.message}
          onChange={(e) => {
            setValue("company", e.target.value);
            setValue("companyID", e.target.dataset.id || "");
          }}
        />
      </div>

      {/* Parent Position */}
      <div>
        <QInput
          label="Parent Position (Optional)"
          id="parentPosition"
          name="parentPosition"
          value={watch("parentPosition")}
          items={filteredPositions as unknown as Item[]}
          searchField="title"
          error={errors.parentID?.message}
          onChange={(e) => {
            setValue("parentPosition", e.target.value);
            setValue("parentID", e.target.dataset.id || null);
          }}
        />
      </div>

      {/* Is Vacant */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="isVacant"
          {...register("isVacant")}
          checked={watch("isVacant")}
          onChange={(e) => setValue("isVacant", e.target.checked)}
        />
        <Label htmlFor="isVacant">This position is vacant</Label>
      </div>

      <div className="border-t pt-4 mt-4">
        <h3 className="text-lg font-medium mb-4">Job Description</h3>

        {/* Responsibilities */}
        <div className="mb-4">
          <Label htmlFor="responsibilities">
            Responsibilities (one per line)
          </Label>
          <Textarea
            id="responsibilities"
            rows={4}
            value={watch("responsibilities")?.join("\n") || ""}
            onChange={(e) =>
              handleArrayFieldChange("responsibilities", e.target.value)
            }
            color={errors.responsibilities ? "failure" : "gray"}
          />
        </div>

        {/* Requirements */}
        <div className="mb-4">
          <Label htmlFor="requirements">Requirements (one per line)</Label>
          <Textarea
            id="requirements"
            rows={4}
            value={watch("requirements")?.join("\n") || ""}
            onChange={(e) =>
              handleArrayFieldChange("requirements", e.target.value)
            }
            color={errors.requirements ? "failure" : "gray"}
          />
        </div>

        {/* Qualifications */}
        <div className="mb-4">
          <Label htmlFor="qualifications">Qualifications (one per line)</Label>
          <Textarea
            id="qualifications"
            rows={4}
            value={watch("qualifications")?.join("\n") || ""}
            onChange={(e) =>
              handleArrayFieldChange("qualifications", e.target.value)
            }
            color={errors.qualifications ? "failure" : "gray"}
          />
        </div>

        {/* Benefits */}
        <div className="mb-4">
          <Label htmlFor="benefits">Benefits (one per line)</Label>
          <Textarea
            id="benefits"
            rows={4}
            value={watch("benefits")?.join("\n") || ""}
            onChange={(e) => handleArrayFieldChange("benefits", e.target.value)}
            color={errors.benefits ? "failure" : "gray"}
          />
        </div>
      </div>

      <div className="border-t pt-4 mt-4">
        <h3 className="text-lg font-medium mb-4">Salary Information</h3>

        <div className="grid grid-cols-2 gap-4">
          {/* Salary Min */}
          <div>
            <Label htmlFor="salaryMin">Minimum Salary</Label>
            <TextInput
              id="salaryMin"
              type="number"
              {...register("salaryMin", { valueAsNumber: true })}
              color={errors.salaryMin ? "failure" : "gray"}
            />
          </div>

          {/* Salary Max */}
          <div>
            <Label htmlFor="salaryMax">Maximum Salary</Label>
            <TextInput
              id="salaryMax"
              type="number"
              {...register("salaryMax", { valueAsNumber: true })}
              color={errors.salaryMax ? "failure" : "gray"}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {/* Salary Currency */}
          <div>
            <Label htmlFor="salaryCurrency">Currency</Label>
            <TextInput
              id="salaryCurrency"
              {...register("salaryCurrency")}
              color={errors.salaryCurrency ? "failure" : "gray"}
              placeholder="USD, EUR, etc."
            />
          </div>

          {/* Salary Period */}
          <div>
            <Label htmlFor="salaryPeriod">Payment Period</Label>
            <select
              id="salaryPeriod"
              {...register("salaryPeriod")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="">Select period</option>
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-6">
        <Button type="submit" color="dark" disabled={formIsLoading}>
          {formIsLoading ? (
            <>
              <Spinner size="sm" className="mr-2" />
              {currentPosition ? "Updating" : "Creating"}...
            </>
          ) : (
            <>{currentPosition ? "Update" : "Create"} Position</>
          )}
        </Button>
      </div>
    </form>
  );
}
