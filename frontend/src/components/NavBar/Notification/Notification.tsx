import NewNotificationBadge from "@/components/Badge/NewNotificationBadge";
import { useMentoringApplies } from "@/queries/mentoring/mentorMentoringQuery";
import Dropdown from "@/ui/atoms/Dropdown";
import Label from "@/ui/atoms/Label";
import styled from "@emotion/styled";
import Alarm from "@icons/common/alarm.svg";
import { useEffect, useState } from "react";

const Notification = () => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const { data } = useMentoringApplies();

  useEffect(() => {
    if (data)
      setNotifications([
        ...data!.data.map(({ menteeInfo }) => {
          return `${menteeInfo.name}님 이 멘토링을 신청하셨습니다.`;
        })!,
      ]);
  }, [data]);

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
      <Dropdown
        id="notification"
        type="menu"
        categories={notifications}
        selectedCategory={selectedCategory!}
        setSelectedCategory={(notification) => {
          setSelectedCategory(notification);
        }}
      >
        <Alarm id="notification" />
      </Dropdown>
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
