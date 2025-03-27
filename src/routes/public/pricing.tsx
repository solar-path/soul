import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/public/pricing")({
  component: Pricing,
});

function Pricing() {
  return <div className="p-2">Hello from Pricing!</div>;
}
