import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/docs/erm')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(public)/docs/erm"!</div>
}
