import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/docs/ai")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(public)/docs/ai"!</div>;
}
