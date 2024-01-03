import Label from "@/ui/atoms/Label";
import styled from "@emotion/styled";

const StyledNewNotificationBadge = styled.div(({}: {}) => ({
  position: "absolute",
  top: "8px",
  right: "4px",
  width: "7px",
  zIndex: "1",
  height: "7px",
  backgroundColor: "#E0291D",
  borderRadius: "50%",
}));

const NewNotificationBadge = () => <StyledNewNotificationBadge />;

export default NewNotificationBadge;
