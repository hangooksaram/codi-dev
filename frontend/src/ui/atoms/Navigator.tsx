import styled from "@emotion/styled";
import theme from "../theme";
import Link from "next/link";

const Navigator = styled(Link)(({ current }: { current?: boolean }) => ({
  display: "flex",
  cursor: "pointer",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  backgroundColor: current ? theme.colors.primary : theme.colors.white,

  ":hover": !current
    ? {
        backgroundColor: theme.colors.background,
        color: theme.colors.primary,
      }
    : {},
}));

export const TopNavigator = styled(Navigator)(({ current }) => ({
  height: "100%",
  width: "159px",
  alignItems: "center",

  color: current ? theme.colors.white : theme.colors.black,
}));

export const SideNavigator = styled(Navigator)(
  ({
    current,
    nested,
    nestedParent,
  }: {
    current?: boolean;
    nested?: number;
    nestedParent?: boolean;
  }) => ({
    width: "244px",
    height: "64px",
    paddingLeft: nested ? `${40 * nested}px` : "40px",
    color: nestedParent
      ? theme.colors.primary
      : current
      ? theme.colors.white
      : theme.colors.gray.main,
  })
);

export default Navigator;
