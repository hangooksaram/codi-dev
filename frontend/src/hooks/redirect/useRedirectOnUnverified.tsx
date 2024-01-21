import { usePathname, useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { selectUser } from '@/features/user/userSlice'

type RedirectCondition = 'user' | 'profile'

interface RedirectRoutes {
  allowed: RedirectCondition
  currentRoute: string
  redirectRoute: string
  message: string
}

const redirectRoutes: RedirectRoutes[] = [
  {
    currentRoute: '/mentorRegisterForm/',
    redirectRoute: '/signin',
    allowed: 'user',
    message: '로그인이 필요해요. 로그인 페이지로 이동합니다.',
  },
  {
    currentRoute: '/profileForm/',
    redirectRoute: '/signin',
    allowed: 'user',
    message: '로그인이 필요해요. 로그인 페이지로 이동합니다.',
  },
  {
    currentRoute: '/mentoringApplyForm/',
    redirectRoute: '/signin',
    allowed: 'user',
    message: '로그인이 필요해요. 로그인 작성 페이지로 이동합니다.',
  },
  {
    currentRoute: '/mentorRegisterForm/',
    redirectRoute: '/profileForm',
    allowed: 'profile',
    message: '프로필 작성이 필요해요. 프로필 작성 페이지로 이동합니다.',
  },
  {
    currentRoute: '/mentoringApplyForm/',
    redirectRoute: '/profileForm',
    allowed: 'profile',
    message: '프로필 작성이 필요해요. 프로필 작성 페이지로 이동합니다.',
  },
]

const useRedirectOnUnverified = () => {
  const router = useRouter()
  const pathname = usePathname()
  const user = useSelector(selectUser)
  const checkRedirectRoutes = (id?: string, isProfile?: boolean) => {
    const userId = id ?? user.id
    const isUserProfile = isProfile ?? user.isProfile

    if (!isRedirectPage(pathname)) {
      return
    }

    for (const route of redirectRoutes) {
      if (pathname.includes(route.currentRoute)) {
        if (!userId && route.allowed === 'user') {
          router.replace(route.redirectRoute)
          alert(route.message)
          return
        }
        if (!isUserProfile && route.allowed === 'profile') {
          router.replace(route.redirectRoute)
          alert(route.message)
          return
        }
      }
    }
  }

  return checkRedirectRoutes
}

const isRedirectPage = (currentUrl: string) => {
  return redirectRoutes.some(({ currentRoute }) =>
    currentRoute.includes(currentUrl),
  )
}

export default useRedirectOnUnverified
