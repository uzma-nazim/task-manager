import { useEffect } from 'react'
import type { ReactNode } from 'react'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import { useNavigate, useRouter } from '@tanstack/react-router'

interface WithAuthProps {
  children: ReactNode
  
}

/**
 * HOC for protecting routes that require authentication
 * If user is not authenticated, redirects to the specified route
 */
export function WithAuth({ children}: WithAuthProps) {
  const isAuthenticated = useIsAuthenticated()
  const navigate = useNavigate()
  const router = useRouter()
  const pathname = router.state.location.pathname
  
const publicRoutes = ['/sign-up', '/']
  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/", replace: true })
    }
    if (isAuthenticated && publicRoutes.includes(pathname)) {
      navigate({ to: "/dashboard", replace: true })
    }
  }, [isAuthenticated,])

  // Don't render children until we confirm authentication
  if (!isAuthenticated) null

  return <>{children}</>
}
