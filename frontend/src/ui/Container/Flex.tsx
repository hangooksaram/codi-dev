import styled from "@emotion/styled";
import { Flex } from "../ui";

const Flex = styled.div(
  ({ direction, justifyContent, alignItems, rowGap, columnGap }: Flex) => ({
    display: "flex",
    flexDirection: direction ?? "row",
    justifyContent: justifyContent ?? "center",
    alignItems: alignItems ?? "center",
    rowGap: rowGap,
    columnGap: columnGap,
  })
);

export default Flex;
