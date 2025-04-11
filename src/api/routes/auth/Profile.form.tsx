import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label, TextInput, Button, Select, Spinner } from "flowbite-react";
import { closeDrawer } from "@/ui/QDrawer/QDrawer.store";
import { useUser, useSetUser } from "@/utils/client.store";
import { useMutation } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import { showFlashMessage } from "@/ui/QFlashMessage/QFlashMessage.store";

// Define the form schema
const accountSchema = z.object({
  fullname: z.string().min(1, "Name is required"),
  gender: z.string().optional(),
  dob: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Invalid email address").optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  avatar: z.string().optional(),
});

type AccountFormValues = z.infer<typeof accountSchema>;

/**
 * Profile form component for editing user profile
 * Uses React Hook Form for form management and validation
 */
export default function ProfileForm() {
  const { data: currentUser, isLoading } = useUser();
  const { invalidateUser } = useSetUser();
  // No need for upload state as it's handled elsewhere

  // Parse contact and address if they exist
  const contact = currentUser?.contact
    ? typeof currentUser.contact === "string"
      ? JSON.parse(currentUser.contact)
      : currentUser.contact
    : {};

  const address = currentUser?.address
    ? typeof currentUser.address === "string"
      ? JSON.parse(currentUser.address)
      : currentUser.address
    : {};

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      fullname: currentUser?.fullname || "",
      gender: currentUser?.gender || "",
      dob: currentUser?.dob || "",
      phone: contact?.phone || "",
      email: currentUser?.email || "",
      street: address?.street || "",
      city: address?.city || "",
      state: address?.state || "",
      postalCode: address?.postalCode || "",
      country: address?.country || "",
      avatar: currentUser?.avatar || "",
    },
  });

  // Reset form when user data changes
  useEffect(() => {
    if (currentUser) {
      reset({
        fullname: currentUser.fullname || "",
        gender: currentUser.gender || "",
        dob: currentUser.dob || "",
        phone: contact?.phone || "",
        email: currentUser.email || "",
        street: address?.street || "",
        city: address?.city || "",
        state: address?.state || "",
        postalCode: address?.postalCode || "",
        country: address?.country || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [
    currentUser,
    reset,
    contact?.phone,
    address?.street,
    address?.city,
    address?.state,
    address?.postalCode,
    address?.country,
  ]);

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data: AccountFormValues) => {
      // Prepare the data for the API
      const payload = {
        fullname: data.fullname,
        gender: data.gender,
        dob: data.dob,
        avatar: data.avatar,
        contact: JSON.stringify({
          phone: data.phone,
        }),
        address: JSON.stringify({
          street: data.street,
          city: data.city,
          state: data.state,
          postalCode: data.postalCode,
          country: data.country,
        }),
      };

      const response = await trpc.auth.updateProfile.$post({
        json: payload,
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        showFlashMessage("success", "Profile updated successfully");
        invalidateUser(); // Refresh user data
        closeDrawer();
      } else {
        showFlashMessage("fail", data.message || "Failed to update profile");
      }
    },
    onError: (error) => {
      showFlashMessage(
        "fail",
        error instanceof Error ? error.message : "An error occurred"
      );
    },
  });

  // Handle form submission
  const onSubmit = (data: AccountFormValues) => {
    updateProfileMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="fullname">Full Name</Label>
        <TextInput
          id="fullname"
          {...register("fullname")}
          color={errors.fullname ? "failure" : "gray"}
          helper-text={errors.fullname?.message}
        />
      </div>

      <div className="flex flex-row space-x-2">
        <div className="w-1/2">
          <Label htmlFor="gender">Gender</Label>
          <Select id="gender" {...register("gender")}>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Select>
        </div>
        <div className="w-1/2">
          <Label htmlFor="dob">Date of Birth</Label>
          <TextInput
            id="dob"
            type="date"
            {...register("dob")}
            color={errors.dob ? "failure" : "gray"}
            helper-text={errors.dob?.message}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <TextInput
          id="phone"
          {...register("phone")}
          color={errors.phone ? "failure" : "gray"}
          helper-text={errors.phone?.message}
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <TextInput
          id="email"
          type="email"
          {...register("email")}
          disabled // Email cannot be changed
          color={errors.email ? "failure" : "gray"}
          helper-text={errors.email?.message}
        />
      </div>

      <div className="border-t pt-4 mt-4">
        <h3 className="font-semibold mb-2">Address Information</h3>
        <div>
          <Label htmlFor="street">Street</Label>
          <TextInput
            id="street"
            {...register("street")}
            color={errors.street ? "failure" : "gray"}
            helper-text={errors.street?.message}
          />
        </div>

        <div className="flex flex-row space-x-2">
          <div className="w-1/2">
            <Label htmlFor="state">State</Label>
            <TextInput
              id="state"
              {...register("state")}
              color={errors.state ? "failure" : "gray"}
              helper-text={errors.state?.message}
            />
          </div>
          <div className="w-1/2">
            <Label htmlFor="city">City</Label>
            <TextInput
              id="city"
              {...register("city")}
              color={errors.city ? "failure" : "gray"}
              helper-text={errors.city?.message}
            />
          </div>
        </div>

        <div className="flex flex-row space-x-2">
          <div className="w-1/2">
            <Label htmlFor="postalCode">Postal Code</Label>
            <TextInput
              id="postalCode"
              {...register("postalCode")}
              color={errors.postalCode ? "failure" : "gray"}
              helper-text={errors.postalCode?.message}
            />
          </div>
          <div className="w-1/2">
            <Label htmlFor="country">Country</Label>
            <TextInput
              id="country"
              {...register("country")}
              color={errors.country ? "failure" : "gray"}
              helper-text={errors.country?.message}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button
          color="light"
          onClick={() => closeDrawer()}
          disabled={isSubmitting || updateProfileMutation.isPending}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          color="dark"
          disabled={isSubmitting || updateProfileMutation.isPending}
        >
          {isSubmitting || updateProfileMutation.isPending
            ? "Updating..."
            : "Update Profile"}
        </Button>
      </div>
    </form>
  );
}
