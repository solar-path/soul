import { Label, TextInput, Textarea, Button, HelperText } from "flowbite-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactUsSchema,
  ContactUs,
} from "@/api/routes/contactUs/contactUs.zod";
import { closeDrawer, fillDrawer } from "@/ui/QDrawer/QDrawer.store";
import { trpc } from "@/utils/trpc";
import { showFlashMessage } from "@/ui/QFlashMessage/QFlashMessage.store";
import FindContactUsResponse from "@/api/routes/contactUs/findContactUsResponse.form";
import { useState } from "react";

export default function ContactUsForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      message: "",
    },
    resolver: zodResolver(contactUsSchema),
  });

  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const handleInquiry = async (data: ContactUs) => {
    try {
      setIsSubmittingForm(true);
      // Add artificial delay to prevent double submissions even with fast network
      await new Promise((resolve) => setTimeout(resolve, 300));
      
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
    } finally {
      setIsSubmittingForm(false);
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
          <div className="relative">
            <div className="absolute left-3 top-3 text-lg z-10">💬</div>
            <Textarea
              id="message"
              rows={4}
              className="pl-10"
              {...register("message")}
              color={errors.message ? "failure" : "gray"}
            />
          </div>
          <HelperText>{errors.message?.message}</HelperText>
        </div>
        <Button 
          type="submit" 
          color="dark"
          disabled={isSubmitting || isSubmittingForm}
        >
          {isSubmitting || isSubmittingForm ? "Submitting..." : "Submit"}
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
