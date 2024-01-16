import { device } from "@/ui/theme";
import styled from "@emotion/styled";

const LayoutWithSideBar = styled.main(() => ({
  width: "100%",
  maxWidth: "1312px",
  margin: "24px 24px 24px 24px",
  backgroundColor: "#ECF1F6",
  [device("smWeb")]: {
    margin: "0 auto",
    marginTop: "20px",
    paddingBottom: "200px",
    width: "90%",
  },
}));

export default LayoutWithSideBar;
