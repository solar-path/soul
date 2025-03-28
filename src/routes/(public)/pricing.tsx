import { createFileRoute } from "@tanstack/react-router";
import { Card, List, ListItem } from "flowbite-react";

export const Route = createFileRoute("/(public)/pricing")({
  component: Pricing,
});

function Pricing() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <p className="text-5xl font-bold">Pricing</p>

      <p>
        <a href="aneko.io" className="text-red-500">
          Aneko.io
        </a>{" "}
        available for FREE in technical preview.
      </p>

      <div className="flex w-full justify-center space-x-8">
        <Card className="max-w-sm w-80">
          <p className="mb-4 text-center text-4xl font-medium">Standard plan</p>
          <div className="flex items-baseline justify-center text-gray-900">
            <div className="w-full text-center">
              <div className="flex flex-col items-center justify-center">
                <p className="text-5xl font-extrabold tracking-tight line-through">
                  $10
                </p>
                <p className="text-5xl font-extrabold tracking-tight text-primary-700">
                  FREE
                </p>
              </div>
              <div className="flex justify-center">
                <p className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                  per user / per month
                </p>
              </div>
            </div>
          </div>
          <List>
            <ListItem>
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                Unlimited users
              </span>
            </ListItem>
            <ListItem>
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                1GB Cloud storage
              </span>
            </ListItem>
          </List>
          {/* <Button
            color="dark"
            className="w-full"
            onClick={() => fillDrawer(SignUpForm, "Sign Up")}
          >
            Select plan
          </Button> */}
        </Card>
      </div>
    </div>
  );
}
