import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import NewNotificationBadge from '@/components/Badge/NewNotificationBadge';
import Label from '@/ui/atoms/Label';
import NotificationDropdown, {
  Divider,
  NotificationDropdownItem,
} from './NotificationDropdown';
import Typography from '@/ui/atoms/Typography';
import theme from '@/ui/theme';
import { useGetMentoringAppliesQuery } from '@/queries/mentoring/mentorMentoringQuery';
import { useRouter } from 'next/navigation';
import useMentoringApplies from '@/hooks/mentorings/useMentoringApplies';

interface Notification {
  userName: string;
  content: string;
  date: string;
  profileId: number;
  mentoringId: number;
  datePassed: boolean;
  mentoringStatus: string;
}

function Notification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { applies } = useMentoringApplies();
  const router = useRouter();

  useEffect(() => {
    if (applies)
      setNotifications([
        ...applies.map(
          ({
            menteeInfo,
            applicationDate,
            mentoringId,
            mentoringStatus,
            datePassed,
          }) => {
            return {
              profileId: menteeInfo.profileId,
              userName: menteeInfo.name,
              content: `께서 멘토링을 신청했습니다.`,
              date: applicationDate,
              mentoringId,
              mentoringStatus: mentoringStatus!,
              datePassed: datePassed!,
            };
          },
        ),
      ]);
  }, [applies]);

  return (
    <StyledNotificationIcon id="notification-icon" tabIndex={1}>
      {notifications.length > 0 ? (
        <>
          <Label
            htmlFor="mentoring-notification"
            text="읽지 않은 새로운 알림이 있습니다. 알림 확인하기"
          />
          <NewNotificationBadge />
        </>
      ) : (
        <Label
          htmlFor="mentoring-notification"
          text="새로운 알림이 없습니다. 알림 확인하기 "
        />
      )}

      <NotificationDropdown>
        {notifications.length > 0 ? (
          notifications.map(
            ({ userName, content, date, profileId, mentoringId }, index) => (
              <div key={`${index}-${userName}`}>
                <NotificationDropdownItem
                  onClick={() => {
                    router.push(
                      `/mentoringAppliedMenteeProfile?profileId=${profileId}&mentoringApply=true&mentoringId=${mentoringId}`,
                    );
                  }}
                >
                  <Typography variant="span" weight={theme.fonts.weight.bold}>
                    {`${userName} 님`}
                  </Typography>
                  <Typography variant="span">{content}</Typography>

                  <Typography
                    variant="div"
                    color={theme.colors.gray.main}
                    {...{ marginTop: '8px' }}
                  >
                    {date}
                  </Typography>
                </NotificationDropdownItem>
                {index < notifications.length - 1 && <Divider />}
              </div>
            ),
          )
        ) : (
          <NotificationDropdownItem>
            새로운 알림이 없습니다.
          </NotificationDropdownItem>
        )}
      </NotificationDropdown>
    </StyledNotificationIcon>
  );
}

export default Notification;

const StyledNotificationIcon = styled.div(({}: {}) => ({
  position: 'relative',
  cursor: 'pointer',
  height: '42px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));
