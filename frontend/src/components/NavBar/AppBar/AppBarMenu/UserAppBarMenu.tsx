import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/user/userSlice';
import Button from '@/ui/atoms/Button';
import theme, { device } from '@/ui/theme';
import Notification from '../../Notification/Notification';
import AppBarProfile from '@/components/Profile/AppBarProfile';
import FlexBox from '@/ui/atoms/FlexBox';

function UserAppBarMenu() {
  const user = useSelector(selectUser);
  const router = useRouter();
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
      <FlexBox width="fit-content" columnGap="16px">
        <Notification />
        <AppBarProfile />
      </FlexBox>
      {!user.isMentor && (
        <Button
          size="small"
          variant="default"
          color={theme.colors.primary.main}
          {...{ height: '39px' }}
          onClick={() => router.push('/mentorRegisterForm')}
        >
          멘토 신청
        </Button>
      )}
    </FlexBox>
  );
}

export default UserAppBarMenu;
