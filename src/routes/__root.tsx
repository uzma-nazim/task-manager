import { store } from '@/components/auth-provider/auth-provider'
import { WithAuth } from '@/components/with-auth'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import AuthProvider from 'react-auth-kit'

function RootComponent() {
  return (
    <>
      <AuthProvider store={store}>
        <WithAuth>
          <Outlet />
        </WithAuth>
        <TanStackRouterDevtools />
      </AuthProvider>
    </>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
})
