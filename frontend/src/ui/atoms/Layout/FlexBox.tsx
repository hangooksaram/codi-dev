import styled from "@emotion/styled";
import { FlexBox } from "../../ui";

const StyledFlexBox = styled.div(
  ({
    direction,
    justifyContent,
    alignItems,
    rowGap,
    columnGap,
    children,
    wrap,
    ...rest
  }: FlexBox) => ({
    display: "flex",
    width: "100%",
    flexDirection: direction ?? "row",
    justifyContent: justifyContent ?? "center",
    alignItems: alignItems ?? "center",
    rowGap: rowGap,
    columnGap: columnGap,
    flexWrap: wrap ? "wrap" : "nowrap",
    ...rest,
  })
);

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
  return (
    <StyledFlexBox
      direction={direction}
      justifyContent={justifyContent}
      alignItems={alignItems}
      rowGap={rowGap}
      columnGap={columnGap}
      {...rest}
    >
      {children}
    </StyledFlexBox>
  );
};

export default FlexBox;
