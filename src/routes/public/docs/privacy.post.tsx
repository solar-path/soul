import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/public/docs/privacy/post")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/public/docs/privacy/post"!</div>;
}
