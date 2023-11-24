import styled from "@emotion/styled";

const Overlay = styled.div(() => ({
  width: "100%",
  height: "100vh",
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 1,
}));

export default Overlay;
