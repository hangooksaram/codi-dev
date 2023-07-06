import styled from "@emotion/styled";
import { FlexBox } from "../ui";

const FlexBox = ({
  direction,
  justifyContent,
  alignItems,
  rowGap,
  columnGap,
  children,
  wrap,
  ...rest
}: FlexBox) => {
  const StyledFlexBox = styled.div(() => ({
    display: "flex",
    flexDirection: direction ?? "row",
    justifyContent: justifyContent ?? "center",
    alignItems: alignItems ?? "center",
    rowGap: rowGap,
    columnGap: columnGap,
    flexWrap: wrap ? "wrap" : "nowrap",
    ...rest,
  }));
  return <StyledFlexBox>{children}</StyledFlexBox>;
};

export default FlexBox;
