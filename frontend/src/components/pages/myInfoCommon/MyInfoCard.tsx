import Card from "@/ui/atoms/Card";
import { device } from "@/ui/theme";
import styled from "@emotion/styled";

const MyInfoCard = styled(Card)({
  width: "80%",
  padding: "40px",
  border: "none",
  boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.04)",
  [device("tablet")]: {
    padding: "30px !important",
  },
});

export default MyInfoCard;
