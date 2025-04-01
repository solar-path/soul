import { Label, TextInput, Button, HelperText } from "flowbite-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  trackContactUsSchema,
  TrackContactUs,
  RespondToContactUs,
} from "./contactUs.zod";
import { fillDrawer } from "@/ui/QDrawer/QDrawer.store";
import ContactUsForm from "./ContactUs.form";
import { showFlashMessage } from "@/ui/QFlashMessage/QFlashMessage.store";
import { trpc } from "@/utils/trpc";
import { useState } from "react";

export default function FindContactUsResponse() {
  const [record, setRecord] = useState<RespondToContactUs | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
    },
    resolver: zodResolver(trackContactUsSchema),
  });

  const handletrackContactUs = async (data: TrackContactUs) => {
    try {
      const response = await trpc["contact-us"].find[":id"].$get({
        param: {
          id: data.id,
        },
      });
      const result = await response.json();
      if (result.success && result.data) {
        setRecord(result.data);
      } else {
        showFlashMessage(
          "fail",
          result.message || "Failed to find contact message"
        );
      }
    } catch (error) {
      showFlashMessage(
        "fail",
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handletrackContactUs)}
        className="flex flex-col w-full space-y-2"
      >
        <div>
          <Label htmlFor="id">ID</Label>
          <TextInput
            type="text"
            {...register("id")}
            color={errors.id ? "failure" : "gray"}
          />
          <HelperText>{errors.id?.message}</HelperText>
        </div>

        <Button type="submit" color="dark">
          Find
        </Button>

        <p>
          <button
            type="button"
            className="text-red-500 text-sm"
            onClick={() => fillDrawer(ContactUsForm, "Contact Us")}
          >
            Submit another inquiry?
          </button>
        </p>
      </form>

      {record && (
        <div className="mt-4 space-y-2 p-4 bg-gray-50 rounded-lg">
          <p>
            <span className="font-semibold">ID:</span> {record.id}
          </p>
          <p>
            <span className="font-semibold">Contact ID:</span>{" "}
            {record.contactUsID}
          </p>
          <p>
            <span className="font-semibold">Message:</span> {record.message}
          </p>
          <p>
            <span className="font-semibold">Author:</span> {record.author}
          </p>
          <p>
            <span className="font-semibold">Created:</span>{" "}
            {record.createdAt
              ? new Date(record.createdAt).toLocaleString()
              : "N/A"}
          </p>
          <p>
            <span className="font-semibold">Updated:</span>{" "}
            {record.updatedAt
              ? new Date(record.updatedAt).toLocaleString()
              : "N/A"}
          </p>
        </div>
      )}
    </>
  );
}
