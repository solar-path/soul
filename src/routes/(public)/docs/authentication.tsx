import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/docs/authentication")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(public)/docs/authentication"!</div>;
}
