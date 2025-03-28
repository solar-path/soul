import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>User Profile page</div>;
}
