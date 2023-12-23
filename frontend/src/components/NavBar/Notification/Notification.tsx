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

  useEffect(() => {}, [selectedCategory]);

  return (
    <StyledNotificationIcon>
      <Dropdown
        id="notification"
        type="menu"
        categories={notifications}
        selectedCategory={selectedCategory!}
        setSelectedCategory={(notification) => {
          setSelectedCategory(notification);
        }}
      >
        <Alarm
          id="notification"
          style={{ position: "absolute", right: "0px", top: "10px" }}
        />
      </Dropdown>
    </StyledNotificationIcon>
  );
};

export default Notification;

const StyledNotificationIcon = styled.div(({}: {}) => ({
  cursor: "pointer",
  position: "relative",
  width: "300px",
  height: "42px",
}));
