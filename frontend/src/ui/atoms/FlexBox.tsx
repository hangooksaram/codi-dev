import styled from "@emotion/styled";
import { FlexBox } from "../ui";

const StyledFlexBox = styled.div(
  ({
    width,
    direction,
    justifyContent,
    alignItems,
    rowGap,
    columnGap,
    children,
    isWrap,
    ...rest
  }: FlexBox) => ({
    display: "flex",
    width: width ?? "100%",
    flexDirection: direction ?? "row",
    justifyContent: justifyContent ?? "center",
    alignItems: alignItems ?? "center",
    flexWrap: isWrap ? "wrap" : "nowrap",
    rowGap: rowGap,
    columnGap: columnGap,
    ...rest,
  })
);

const FlexBox = ({
  width,
  direction,
  justifyContent,
  alignItems,
  rowGap,
  columnGap,
  children,
  isWrap,
  ...rest
}: FlexBox) => {
  return (
    <StyledFlexBox
      width={width}
      direction={direction}
      justifyContent={justifyContent}
      alignItems={alignItems}
      rowGap={rowGap}
      columnGap={columnGap}
      isWrap={isWrap}
      {...rest}
    >
      {children}
    </StyledFlexBox>
  );
};

export default FlexBox;
