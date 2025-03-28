import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/company/hrm/department/department")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Department page</div>;
}
