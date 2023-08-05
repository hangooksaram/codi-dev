import styled from "@emotion/styled";
import { FlexBox } from "../../types/ui";

const FlexBox = styled.div(
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

export default FlexBox;
