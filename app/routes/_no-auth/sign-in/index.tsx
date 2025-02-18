import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_no-auth/sign-in/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_noauth/sign-in/"!</div>
}
