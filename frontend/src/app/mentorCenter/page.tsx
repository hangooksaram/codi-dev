'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '@/features/user/userSlice'

function MentorCenterPage() {
  const router = useRouter()
  const user = useSelector(selectUser)

  useEffect(() => {
    if (user.isMentor) {
      router.replace('/mentorCenter/schedule/')
      return
    }

    router.push('/noneMentor')
  }, [])
}

export default MentorCenterPage
