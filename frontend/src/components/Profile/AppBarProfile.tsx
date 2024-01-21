'use client'

import Profile from '@icons/common/profile.svg'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import styled from '@emotion/styled'
import { PROFILE_MENU } from '@/constants'
import FlexBox from '@/ui/atoms/FlexBox'

import { selectUser } from '@/features/user/userSlice'
import theme from '@/ui/theme'
import Dropdown from '@/ui/atoms/Dropdown'
import Button from '@/ui/atoms/Button'
import { backgroundImage } from '@/ui/atoms/BackgroundImage'
import { signOut } from '@/api/signApi'

function AppBarProfile() {
  const [selected, setSelected] = useState()
  const user = useSelector(selectUser)
  const router = useRouter()

  useEffect(() => {
    if (selected) {
      if (selected === '로그아웃') {
        signOut()
        setTimeout(() => {
          window.location.reload()
        }, 400)
      } else {
        router.push(
          PROFILE_MENU(user.isProfile!).find((menu) => menu.name === selected)!
            .href!,
        )
      }
    }
    return () => setSelected(undefined)
  }, [selected])

  return (
    <Dropdown
      id="profile-menu"
      type="menu"
      categories={PROFILE_MENU(user.isProfile !== false).map(
        ({ name }) => name,
      )}
      selectedCategory={selected!}
      setSelectedCategory={setSelected}
      left
    >
      {user.profileImageUrl ? (
        <StyledAppBarProfile id="profile-menu" src={user.profileImageUrl!} />
      ) : (
        <StyledAppBarProfile>
          <Profile id="profile-menu" fill={theme.colors.white} />
        </StyledAppBarProfile>
      )}
    </Dropdown>
  )
}

const StyledAppBarProfile = styled.div(({ src }: { src?: string }) => ({
  ...backgroundImage(src!),
  width: '42px',
  height: '42px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: `${theme.colors.gray.light}`,
  borderRadius: '100%',
  cursor: 'pointer',
  ':hover': {
    outline: `4px solid #F7C863`,
  },
}))

export default AppBarProfile
