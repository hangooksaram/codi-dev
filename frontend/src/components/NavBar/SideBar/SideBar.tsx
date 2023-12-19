import Overlay from "@/ui/atoms/BackgroundOverlay";
import Button from "@/ui/atoms/Button";
import FlexBox from "@/ui/atoms/FlexBox";
import theme, { device } from "@/ui/theme";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { SetState } from "@/index";
import useSideBar from "@/hooks/useSideBar";

interface SideBarNavigator {
  iconComponent?: React.JSX.Element;
  currentIconComponent?: React.JSX.Element;
  nestedParentIconComponent?: React.JSX.Element;
  name: string;
  href: string;
}

interface SideBarNavigators extends SideBarNavigator {
  nested?: SideBarNavigator[];
}

const SideBar = ({
  navigators,
  open,
  setOpen,
}: {
  navigators: SideBarNavigators[];
  open: boolean;
  setOpen: SetState<boolean>;
}) => {
  const router = useRouter();
  const { setNestedParent, setCurrent, current, nestedParent, path } =
    useSideBar(navigators, setOpen);
  return (
    <Container open={open}>
      <FlexBox direction="column">
        {navigators.map(
          (
            {
              name,
              href,
              iconComponent,
              currentIconComponent,
              nestedParentIconComponent,
              nested,
            },
            index
          ) => {
            return (
              <>
                <ListItem
                  onClick={() => {
                    setNestedParent(nested ? href : "");
                    setCurrent(href);
                    router.push(href);
                  }}
                  current={current === href && nestedParent !== href}
                  nestedParent={nestedParent === href}
                  key={index}
                >
                  <FlexBox justifyContent="flex-start" columnGap="10px">
                    {nestedParent === href && nestedParentIconComponent}
                    {nestedParent !== href &&
                      (current === href ? currentIconComponent : iconComponent)}

                    {name}
                  </FlexBox>
                </ListItem>
                {nested?.map(
                  ({ name: nestedName, href: nestedHref }, index) => {
                    return (
                      <ListItem
                        onClick={() => {
                          if (!nestedParent) {
                            setNestedParent(href);
                          }
                          setCurrent(nestedHref);
                          router.push(nestedHref);
                        }}
                        current={path === nestedHref}
                        nested={2}
                        key={index}
                      >
                        {nestedName}
                      </ListItem>
                    );
                  }
                )}
              </>
            );
          }
        )}
      </FlexBox>
    </Container>
  );
};

const Container = styled.nav(({ open }: { open: boolean }) => ({
  display: open ? "block" : "none",
  width: "244px",
  height: "100vh",
  position: "sticky",
  alignSelf: "flex-start",
  left: "0px",
  top: "59px",

  background: theme.colors.white,
  boxShadow: "0px 2px 4px 0px rgba(22, 23, 24, 0.08)",
  [device("smWeb")]: {
    position: "fixed",
    zIndex: "3",
    top: "0px",
  },
}));

const ListItem = styled.div(
  ({
    current,
    nested,
    nestedParent,
  }: {
    current: boolean;
    nested?: number;
    nestedParent?: boolean;
  }) => ({
    display: "flex",
    width: "244px",
    height: "64px",
    cursor: "pointer",
    paddingLeft: nested ? `${40 * nested}px` : "40px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: current ? theme.colors.primary : theme.colors.white,
    color: nestedParent
      ? theme.colors.primary
      : current
      ? theme.colors.white
      : theme.colors.gray.main,
  })
);

export const SideBarOverlay = styled(Overlay)(
  ({ open }: { open: boolean }) => ({
    backgroundColor: "rgba(0, 0, 0, 0.20)",
    display: "none",
    [device("smWeb")]: {
      display: open ? "block" : "none",
    },
  })
);

export const MobileMenuButton = styled(Button)({
  position: "fixed",
  top: "20px",
  left: "20px",
  width: "40px",
  height: "40px",
  color: theme.colors.white,
  padding: "0px",
});

export default SideBar;
