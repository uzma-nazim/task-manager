import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { post } from '@/utils/api'
import API_ENDPOINTS from '@/utils/api-endpoints'
import { useNavigate } from '@tanstack/react-router'
import { ChevronDown } from 'lucide-react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import useSignOut from 'react-auth-kit/hooks/useSignOut'
type AuthUser = {
  username: string
  refreshToken: string
}

export function HeaderDropdown() {
  const auth = useAuthUser<AuthUser>()
  const signOut = useSignOut()
  const navigate = useNavigate()
  const handleSignOut = async () => {
    try {
       await post(API_ENDPOINTS.AUTH.LOGOUT, {
        refreshToken: auth?.refreshToken,
      })
      signOut()
      navigate({ to: '/' })
    } catch (error) {
      signOut()
      navigate({ to: '/' })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {auth?.username}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem onClick={handleSignOut}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
