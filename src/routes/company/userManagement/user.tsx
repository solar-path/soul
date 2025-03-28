import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/company/userManagement/user")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>User Management Page</div>;
}
