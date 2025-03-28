import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/company/addressBook/addressBook")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Address Book Page</div>;
}
