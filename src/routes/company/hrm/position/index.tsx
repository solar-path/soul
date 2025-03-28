import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/company/hrm/position/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Position page</div>;
}
