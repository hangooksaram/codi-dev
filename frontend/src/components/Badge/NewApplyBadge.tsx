import styled from "@emotion/styled";

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

export default NewNotificationBadge;
