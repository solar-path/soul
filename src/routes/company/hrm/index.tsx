import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/company/hrm/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Human Resources Management</div>;
}
