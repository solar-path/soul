import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/docs/ic")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(public)/docs/ic"!</div>;
}
