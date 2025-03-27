import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/public/docs/terms/post")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/public/docs/terms/post"!</div>;
}
