import NewNotificationBadge from "@/components/Badge/NewNotificationBadge";
import Label from "@/ui/atoms/Label";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import NotificationDropdown, {
  Divider,
  NotificationDropdownItem,
} from "./NotificationDropdown";
import Typography from "@/ui/atoms/Typography";
import theme from "@/ui/theme";

interface Notification {
  userName: string;
  content: string;
  date: string;
}

const Notification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  // const { mentoringQuery, applyNotifications } = useApplyNotifications();
  const mock = [
    { userName: "오현재", content: " 께서 어쩌구 했습니다.", date: "오늘" },
    { userName: "오현재2", content: " 께서 어쩌구 했습니다.", date: "어제" },
    { userName: "오현재3", content: " 께서 어쩌구 했습니다.", date: "어제" },
  ];

  useEffect(() => {
    setNotifications(mock);
  }, []);

  return (
    <StyledNotificationIcon id="notification-icon" tabIndex={1}>
      {notifications.length > 0 ? (
        <>
          <Label
            htmlFor="notification-icon"
            text="읽지 않은 새로운 알림이 있습니다. 알림 확인하기"
          />
          <NewNotificationBadge />
        </>
      ) : (
        <Label htmlFor="notification-icon" text="알림 확인하기" />
      )}

      <NotificationDropdown notifications={mock}>
        {notifications.map(({ userName, content, date }, index) => (
          <div key={`${index}-${userName}`}>
            <NotificationDropdownItem>
              <Typography variant="span" weight={theme.fonts.weight.bold}>
                {`${userName} 님`}
              </Typography>
              <Typography variant="span">{content}</Typography>

              <Typography
                variant="div"
                color={theme.colors.gray.main}
                {...{ marginTop: "8px" }}
              >
                {date}
              </Typography>
            </NotificationDropdownItem>
            {index < notifications.length - 1 && <Divider />}
          </div>
        ))}
      </NotificationDropdown>
    </StyledNotificationIcon>
  );
};

export default Notification;

const StyledNotificationIcon = styled.div(({}: {}) => ({
  position: "relative",
  cursor: "pointer",
  height: "42px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
