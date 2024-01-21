import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { selectUser } from '@/features/user/userSlice'
import Button from '@/ui/atoms/Button'
import theme from '@/ui/theme'
import Notification from '../../Notification/Notification'
import AppBarProfile from '@/components/Profile/AppBarProfile'
import FlexBox from '@/ui/atoms/FlexBox'

function UserAppBarMenu() {
  const user = useSelector(selectUser)
  const router = useRouter()

  const goToApplyPage = () => {
    if (!user?.isProfile)
      alert(
        '아직 프로필이 작성되어있지 않습니다. 프로필 작성 페이지로 이동하시겠습니까?',
      )
    router.push('/mentorRegisterForm')
  }

  return (
    <FlexBox justifyContent="flex-end" columnGap="30px">
      {user.isMentor && (
        <Button
          size="small"
          variant="default"
          color={theme.colors.primary.main}
          {...{ height: '39px' }}
          onClick={() => router.push('/mentorCenter')}
        >
          멘토 센터
        </Button>
      )}
      <Notification />
      <AppBarProfile />
      {!user.isMentor && (
        <Button
          size="small"
          variant="default"
          color={theme.colors.primary.main}
          {...{ height: '39px' }}
          onClick={() => goToApplyPage()}
        >
          멘토 신청
        </Button>
      )}
    </FlexBox>
  )
}

export default UserAppBarMenu
