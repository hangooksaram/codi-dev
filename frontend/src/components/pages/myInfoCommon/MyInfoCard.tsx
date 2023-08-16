import Card from "@/ui/atoms/Card";
import { device } from "@/ui/theme";
import styled from "@emotion/styled";

const MyInfoCard = styled(Card)({
  padding: "45px 0px 0px 45px",
  [device("tablet")]: {
    padding: "30px !important",
  },
});

export default MyInfoCard;
