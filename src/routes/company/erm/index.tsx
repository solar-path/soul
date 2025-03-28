import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/company/erm/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Enterprise Risk Management</div>;
}
