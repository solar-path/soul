import { useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Label,
  TextInput,
  Button,
  Textarea,
  FileInput,
  Tooltip,
  Spinner,
  HelperText,
} from "flowbite-react";
import QInput from "@/ui/QInput/QInput.ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  clientCreateCompany,
  clientGetCountries,
  clientGetIndustries,
  clientUpdateCompany,
} from "@/utils/trpc";
import {
  createCompanySchema,
  updateCompanySchema,
  companyFormSchema,
  CompanyFormValues,
  transformFormToApiData,
} from "./company.zod";

import { showFlashMessage } from "@/ui/QFlashMessage/QFlashMessage.store";
import { closeDrawer } from "@/ui/QDrawer/QDrawer.store";

// Using the form schema from company.zod.ts

interface CompanyFormProps {
  currentCompany?: Record<string, unknown> | null;
}

export function CompanyForm({ currentCompany = null }: CompanyFormProps) {
  // File upload handler for future implementation
  const handleLogoUpload = useCallback((file: File | null) => {
    // This will be implemented in the future for logo uploads
    console.log("Logo file selected:", file?.name);
  }, []);

  // Fetch countries and industries for dropdown selection
  const { data: countries, isLoading: countriesLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      return (await clientGetCountries()).data;
    },
  });

  const { data: industries, isLoading: industriesLoading } = useQuery({
    queryKey: ["industries"],
    queryFn: async () => {
      return (await clientGetIndustries()).data;
    },
  });

  // Create mutation for adding a new company
  const createMutation = useMutation({
    mutationFn: async (data: CompanyFormValues) => {
      // Transform form data to API format
      const apiData = transformFormToApiData(data);

      // Use the client function from trpc.ts
      const response = await clientCreateCompany(
        createCompanySchema.parse(apiData)
      );
      return response.data;
    },
    onSuccess: (data) => {
      showFlashMessage("success", `${data?.title} has been created`);
      window.dispatchEvent(new CustomEvent("companyCreated", { detail: data }));
      closeDrawer();
    },
    onError: (error: Error) => {
      showFlashMessage("fail", error.message);
    },
  });

  // Update mutation for editing an existing company
  const updateMutation = useMutation({
    mutationFn: async (data: CompanyFormValues) => {
      // Transform form data to API format
      const apiData = transformFormToApiData(data);

      // Use the client function from trpc.ts
      const response = await clientUpdateCompany(data.id as string)(
        updateCompanySchema.parse(apiData)
      );
      return response.data;
    },
    onSuccess: (data) => {
      showFlashMessage("success", `${data?.title} has been updated`);
      window.dispatchEvent(new CustomEvent("companyUpdated", { detail: data }));
      closeDrawer();
    },
    onError: (error: Error) => {
      showFlashMessage("fail", error.message);
    },
  });

  // Extract values from currentCompany with proper type handling
  const getCompanyValue = <T,>(path: string, defaultValue: T): T => {
    const parts = path.split(".");
    let value: Record<string, unknown> | null = currentCompany as Record<
      string,
      unknown
    > | null;

    for (const part of parts) {
      if (!value || typeof value !== "object") return defaultValue;
      value = value[part] as Record<string, unknown> | null;
    }

    return (value as unknown as T) ?? defaultValue;
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      id: getCompanyValue<string>("id", ""),
      title: getCompanyValue<string>("title", ""),
      description: getCompanyValue<string>("description", ""),
      bin: getCompanyValue<string>("bin", ""),
      logo: null,
      residence: getCompanyValue<string>("expand.residence.title", ""),
      industry: getCompanyValue<string>("expand.industry.title", ""),
      residenceId:
        typeof getCompanyValue<unknown>("residence", "") === "object"
          ? getCompanyValue<{ id: string }>("residence", { id: "" }).id
          : getCompanyValue<string>("residence", ""),
      industryId:
        typeof getCompanyValue<unknown>("industry", "") === "object"
          ? getCompanyValue<{ id: string }>("industry", { id: "" }).id
          : getCompanyValue<string>("industry", ""),
      phone: getCompanyValue<string>("phone", ""),
      website: getCompanyValue<string>("website", ""),
      addressLine: getCompanyValue<string>("address.street", ""),
      city: getCompanyValue<string>("address.city", ""),
      country: getCompanyValue<string>("address.country", ""),
      postcode: getCompanyValue<string>("address.postalCode", ""),
      state: getCompanyValue<string>("address.state", ""),
    },
  });

  // Type-safe form submission handler
  const onSubmit: SubmitHandler<CompanyFormValues> = (data) => {
    try {
      if (currentCompany) {
        // Update existing company
        updateMutation.mutate(data);
      } else {
        // Create new company
        createMutation.mutate(data);
      }
    } catch (error) {
      showFlashMessage(
        "fail",
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };

  // Determine if any loading state is active
  const isLoading =
    countriesLoading ||
    industriesLoading ||
    createMutation.isPending ||
    updateMutation.isPending;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
      data-testid="company-form"
    >
      {/* Company Name */}
      <div>
        <Label htmlFor="title">Company Name</Label>
        <TextInput
          id="title"
          type="text"
          {...register("title")}
          color={errors.title ? "failure" : "gray"}
        />
        {errors.title && (
          <HelperText color="failure">{errors.title.message}</HelperText>
        )}
      </div>

      {/* BIN */}
      <div>
        <Label htmlFor="bin">Business Identification Number</Label>
        <TextInput
          id="bin"
          {...register("bin")}
          color={errors.bin ? "failure" : "gray"}
        />
        <HelperText>{errors.bin?.message}</HelperText>
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          rows={2}
          {...register("description")}
          color={errors.description ? "failure" : "gray"}
        />
        <HelperText>{errors.description?.message}</HelperText>
      </div>

      {/* Logo Upload - modified to match avatar pattern */}
      <div className="relative group">
        <Tooltip
          content={
            <ul className="list-disc pl-4">
              <li>Max file size: 5MB</li>
              <li>Allowed file types: png, jpeg</li>
            </ul>
          }
        >
          <Label htmlFor="logo">Company Logo</Label>
        </Tooltip>

        <div className="flex flex-col gap-2">
          <FileInput
            className="w-full"
            id="logo"
            accept="image/png, image/jpeg"
            onChange={(e) => handleLogoUpload(e.target.files?.[0] || null)}
          />
        </div>
      </div>

      {/* Country */}
      <div>
        <QInput
          label="Country"
          id="residence"
          name="residence"
          value={watch("residence")}
          items={countries || []}
          searchField="title"
          displayAsHelper="code"
          error={errors.residenceId?.message}
          onChange={(e) => {
            setValue("residence", e.target.value);
            setValue("residenceId", e.target.dataset.id || "");
          }}
        />
      </div>

      {/* Industry */}
      <div>
        <QInput
          label="Industry"
          id="industry"
          name="industry"
          value={watch("industry")}
          items={industries || []}
          searchField="title"
          error={errors.industryId?.message}
          onChange={(e) => {
            setValue("industry", e.target.value);
            setValue("industryId", e.target.dataset.id || "");
          }}
        />
      </div>

      {/* Phone */}
      <div>
        <Label htmlFor="phone">Phone</Label>
        <TextInput
          id="phone"
          {...register("phone")}
          color={errors.phone ? "failure" : "gray"}
        />
        <HelperText>{errors.phone?.message}</HelperText>
      </div>

      {/* Website */}
      <div>
        <Label htmlFor="website">Website</Label>
        <TextInput
          id="website"
          {...register("website")}
          color={errors.website ? "failure" : "gray"}
        />
        <HelperText>{errors.website?.message}</HelperText>
      </div>

      {/* Address Section */}
      <div className="flex flex-col space-y-2">
        <div>
          <Label htmlFor="addressLine">Address line</Label>
          <TextInput
            id="addressLine"
            {...register("addressLine")}
            color={errors.addressLine ? "failure" : "gray"}
          />
          <HelperText>{errors.addressLine?.message}</HelperText>
        </div>

        <div className="flex flex-row space-x-2">
          <div className="w-1/2">
            <Label htmlFor="state">State</Label>
            <TextInput
              id="state"
              {...register("state")}
              color={errors.state ? "failure" : "gray"}
            />
            <HelperText>{errors.state?.message}</HelperText>
          </div>
          <div className="w-1/2">
            <Label htmlFor="city">City</Label>
            <TextInput
              id="city"
              {...register("city")}
              color={errors.city ? "failure" : "gray"}
            />
            <HelperText>{errors.city?.message}</HelperText>
          </div>
        </div>

        <div className="flex flex-row space-x-2">
          <div className="w-1/2">
            <Label htmlFor="postcode">Postcode</Label>
            <TextInput
              id="postcode"
              {...register("postcode")}
              color={errors.postcode ? "failure" : "gray"}
            />
            <HelperText>{errors.postcode?.message}</HelperText>
          </div>
          <div className="w-1/2">
            <Label htmlFor="country">Country</Label>
            <TextInput
              id="country"
              {...register("country")}
              color={errors.country ? "failure" : "gray"}
            />
            <HelperText>{errors.country?.message}</HelperText>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button type="submit" color="dark" disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner size="sm" className="mr-2" />
              {currentCompany ? "Updating" : "Creating"}...
            </>
          ) : (
            <>{currentCompany ? "Update" : "Create"} Company</>
          )}
        </Button>
      </div>
    </form>
  );
}
