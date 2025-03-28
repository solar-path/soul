import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/company/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Company Dashboard</div>;
}
