import styled from '@emotion/styled'
import Link from '@icons/common/link.svg'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Card from '@/ui/atoms/Card'
import theme from '@/ui/theme'
import Button from '@/ui/atoms/Button'
import FlexBox from '@/ui/atoms/FlexBox'
import Typography from '@/ui/atoms/Typography'
import { backgroundImage } from '@/ui/atoms/BackgroundImage'
import StyledImage from '@/ui/atoms/StyledImage'
import Modal from '@/ui/molecules/Modal'
import MentoringPlatformModal, {
  MENTORING_PLATFORMS,
} from './MentoringPlatformModal'
import { MentoringPlatform, MentoringStatus } from '@/types/mentoring'
import { formattedDate } from '@/utils/dateFormat'

const mocks = []

function MentoringCard({
  profileId,
  mentorId,
  mentoringId,
  date,
  time,
  name,
  mentoringJob,
  platform,
  imgUrl,
}: {
  profileId?: number
  mentorId?: number
  mentoringId: number
  date: string | undefined
  time: string
  name: string
  mentoringJob: string
  platform: MentoringPlatform | string
  imgUrl?: string
}) {
  const [openModal, setOpenModal] = useState(false)
  const platformInfo = MENTORING_PLATFORMS.find(({ text }) => text === platform)
  const router = useRouter()
  const mentorProfileUrl = `/mentorProfile?mentorId=${mentorId}&mentoringId=${mentoringId}`
  const menteeProfileUrl = `/mentoringMenteeProfile?profileId=${profileId}&mentoringId=${mentoringId}&platform=${platform}`

  return (
    <StyledCard>
      <Header today={date === formattedDate(new Date())}>{time}</Header>
      <FlexBox justifyContent="space-between">
        <ProfileImage
          imgUrl={imgUrl}
          onClick={() => {
            router.push(mentorId ? mentorProfileUrl : menteeProfileUrl)
          }}
        >
          {platform === 'No Selection.' ? null : (
            <StyledImage
              width="40px"
              height="40px"
              src={platformInfo?.iconSrc!}
              alt={platformInfo?.text!}
              {...{
                position: 'absolute',
                bottom: '-10px',
                right: '-10px',
              }}
            />
          )}
        </ProfileImage>
        <div
          onClick={() => {
            router.push(mentorId ? mentorProfileUrl : menteeProfileUrl)
          }}
        >
          <Typography
            variant="div"
            weight={theme.fonts.weight.bold}
            {...{ marginBottom: '5px' }}
          >
            {name}
          </Typography>
          <Typography
            variant="div"
            size={theme.fonts.size.sm}
            color={theme.colors.gray.dark}
          >
            {mentoringJob}
          </Typography>
        </div>
        <LinkButton
          onClick={() => {
            if (profileId) {
              setOpenModal(true)
            }
          }}
          width="42px"
          variant="round"
          hoverDisabled
          color={
            platform === 'No Selection.'
              ? theme.colors.gray.main
              : theme.colors.primary.main
          }
        >
          <Link fill={theme.colors.white} />
        </LinkButton>
        <MentoringPlatformModal
          mentoringId={mentoringId}
          open={openModal}
          setOpen={setOpenModal}
        />
      </FlexBox>
    </StyledCard>
  )
}

const StyledCard = styled(Card)({
  cursor: 'pointer',
  maxWidth: '237px',
  maxHeight: '130px',
  padding: '10px',
  border: `1px solid ${theme.colors.primary.main}`,
})

const Header = styled.div(({ today = false }: { today: boolean }) => ({
  padding: '0px 10px',
  height: '33px',
  display: 'flex',
  justifyㅊontent: 'space-between',
  alignItems: 'center',
  borderRadius: '20px',
  backgroundColor: today ? theme.colors.primary.main : theme.colors.gray.main,
  color: theme.colors.white,
  marginBottom: '13px',
}))

const ProfileImage = styled.div(({ imgUrl }: { imgUrl?: string }) => ({
  width: '54px',
  height: '54px',
  borderRadius: '100%',
  position: 'relative',
  ...backgroundImage(imgUrl!),
}))

const LinkButton = styled(Button)(() => ({
  minWidth: '42px',
}))

const ScheduleContainer = styled(Card)(({}) => ({
  maxWidth: '831px',
  overflowY: 'auto',
  minHeight: '477px',
  boxShadow: `0px 2px 6px 0px rgba(0, 0, 0, 0.04)`,
}))

export default MentoringCard
