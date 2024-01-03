import { useMentoringApplies } from "@/queries/mentoring/mentorMentoringQuery";
import Dropdown from "@/ui/atoms/Dropdown";
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
    <StyledNotificationIcon>
      {notifications.length > 0 && <NewNotificationBadge />}
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

const NewNotificationBadge = styled.div(({}: {}) => ({
  position: "absolute",
  top: "8px",
  right: "5px",
  width: "7px",
  zIndex: "1",
  height: "7px",
  backgroundColor: "#E0291D",
  borderRadius: "50%",
}));
