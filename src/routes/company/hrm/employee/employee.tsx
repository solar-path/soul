import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/company/hrm/employee/employee")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>employee Page</div>;
}
