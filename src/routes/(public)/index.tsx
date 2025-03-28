import { createFileRoute } from "@tanstack/react-router";
import AIcon from "@/assets/icon.png";
import { Button } from "flowbite-react";
import { fillDrawer } from "@/ui/QDrawer/drawer.store";
import SignUpForm from "@/forms/SignUp.form";
export const Route = createFileRoute("/(public)/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex items-center justify-center">
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto grid max-w-screen-xl px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
          <div className="mr-auto place-self-center lg:col-span-7">
            <div className="flex">
              <img src={AIcon} className="h-14 w-14" alt="icon" />
              <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl">
                chieving Excellence
              </h1>
            </div>
            <p className="mb-6 max-w-2xl font-light md:text-lg lg:mb-8 lg:text-xl">
              Experience a comprehensive solution designed to help businesses
              achieve excellence in various aspects of their operations. It
              offers a wide range of tools and resources that cover everything
              from strategic planning to process improvement, risk management,
              and more. With this solution, businesses might streamline their
              operations, reduce costs, increase efficiency, and ultimately,
              achieve greater success.
            </p>

            <Button
              type="button"
              onClick={() => fillDrawer(SignUpForm, "Sign Up")}
            >
              Sign Up
            </Button>
          </div>
          <div className="hidden lg:col-span-5 lg:mt-0 lg:flex">
            {/* carousel */}
          </div>
        </div>
      </section>
    </div>
  );
}
