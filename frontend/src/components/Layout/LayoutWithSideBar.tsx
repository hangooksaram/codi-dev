import { device } from "@/ui/theme";
import styled from "@emotion/styled";

const LayoutWithSideBar = styled.main({
  width: "100%",
  maxWidth: "1312px",
  margin: "50px 50px 0px 60px",
  [device("tablet")]: {
    margin: "0 auto",
    width: "90%",
  },
});

export default LayoutWithSideBar;
