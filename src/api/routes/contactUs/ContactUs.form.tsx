import { Label, TextInput, Textarea, Button, HelperText } from "flowbite-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactUsSchema, ContactUs } from "./contactUs.zod";
import { closeDrawer, fillDrawer } from "@/ui/QDrawer/QDrawer.store";
import { trpc } from "@/lib/trpc";
import { showFlashMessage } from "@/ui/QFlashMessage/QFlashMessage.store";
import FindContactUsResponse from "./findContactUsResponse.form";

export default function ContactUsForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      message: "",
    },
    resolver: zodResolver(contactUsSchema),
  });

  const handleInquiry = async (data: ContactUs) => {
    const response = await trpc["contact-us"].new.$post({
      json: data,
    });
    const result = await response.json();

    if (result.success) {
      closeDrawer();
      reset();
      showFlashMessage("success", result.message);
    } else {
      showFlashMessage("fail", result.message);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(handleInquiry)}
        className="flex flex-col w-full space-y-2"
      >
        <div>
          <Label htmlFor="email">Email</Label>
          <TextInput
            type="email"
            icon={() => <span className="text-lg">✉️</span>}
            {...register("email")}
            color={errors.email ? "failure" : "gray"}
          />
          <HelperText>{errors.email?.message}</HelperText>
        </div>
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            rows={4}
            {...register("message")}
            color={errors.message ? "failure" : "gray"}
          />
          <HelperText>{errors.message?.message}</HelperText>
        </div>
        <Button type="submit" color="dark">
          Submit
        </Button>

        <p className="text-sm">
          Have already submitted inquiry?{" "}
          <button
            type="button"
            className="text-red-500"
            onClick={() => fillDrawer(FindContactUsResponse, "Track inquiry")}
          >
            Check response
          </button>
        </p>
      </form>
    </>
  );
}
