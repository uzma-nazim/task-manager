import { createFileRoute, Outlet } from '@tanstack/react-router'
import { WithAuth } from '@/components/with-auth'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <WithAuth>
      <Outlet />
    </WithAuth>
  )
}
