'use client'

import Button from '@/ui/atoms/Button'
import Typography from '@/ui/atoms/Typography'
import theme from '@/ui/theme'
import forNotMentor from '../../../public/images/for-not-mentor.png'

import FlexBox from '@/ui/atoms/FlexBox'
import ImageComponent from '@/ui/atoms/ImageComponent'
import { useRouter } from 'next/navigation'

const NonMentorPage = () => {
  const router = useRouter()
  return (
    <FlexBox direction="column" rowGap="20px" {...{ minHeight: '500px' }}>
      <ImageComponent
        src={forNotMentor}
        alt="for-not-mentor"
        width="360px"
        height="101px"
      />

      <Typography
        variant="h1"
        size={theme.fonts.size.xl}
        weight={theme.fonts.weight.black}
        align="center"
      >
        SHARE YOUR EXPERIENCE
      </Typography>
      <Typography variant="div" size={theme.fonts.size.md}>
        멘티를 가장 잘 이해하는 멘토가 되어주세요
      </Typography>
      <Button
        variant="default"
        onClick={() => router.push('/mentorRegisterForm')}
      >
        멘토 신청하기
      </Button>
    </FlexBox>
  )
}

export default NonMentorPage
