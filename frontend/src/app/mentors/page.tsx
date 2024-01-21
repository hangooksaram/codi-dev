'use client'

import { css } from '@emotion/css'
import Logo from '@icons/logo/recommend-icon.svg'
import Mentors from '@/components/Mentor/Mentors'
import TitleSection from '@/components/pages/mentorsMain/TitleSection'
import ContainerWithBackground from '@/ui/molecules/Container/ContainerWithBackground'

function MentorsPage() {
  return (
    <ContainerWithBackground>
      <TitleSection title="멘토리스트" logo={<Logo />} />
      <Mentors />
    </ContainerWithBackground>
  )
}

export default MentorsPage
