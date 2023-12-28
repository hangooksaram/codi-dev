import Overlay from "@/ui/atoms/BackgroundOverlay";
import Button from "@/ui/atoms/Button";
import FlexBox from "@/ui/atoms/FlexBox";
import theme, { device } from "@/ui/theme";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { SetState } from "@/index";
import useSideBar from "@/hooks/useSideBar";
import { SideNavigator } from "@/ui/atoms/Navigator";

interface SideBarSideNavigator {
  iconComponent?: React.JSX.Element;
  currentIconComponent?: React.JSX.Element;
  nestedParentIconComponent?: React.JSX.Element;
  name: string;
  href: string;
}

interface SideBarSideNavigators extends SideBarSideNavigator {
  nested?: SideBarSideNavigator[];
}

const SideBar = ({
  navigators,
  open,
  setOpen,
}: {
  navigators: SideBarSideNavigators[];
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
                <SideNavigator
                  onClick={() => {
                    setNestedParent(nested ? href : "");
                    setCurrent(href);
                  }}
                  current={current === href && nestedParent !== href}
                  nestedParent={nestedParent === href}
                  href={href!}
                  key={index}
                >
                  <FlexBox justifyContent="flex-start" columnGap="10px">
                    {nestedParent === href && nestedParentIconComponent}
                    {nestedParent !== href &&
                      (current === href ? currentIconComponent : iconComponent)}

                    {name}
                  </FlexBox>
                </SideNavigator>
                {nested?.map(
                  ({ name: nestedName, href: nestedHref }, index) => {
                    return (
                      <SideNavigator
                        onClick={() => {
                          if (!nestedParent) {
                            setNestedParent(href);
                          }
                          setCurrent(nestedHref!);
                        }}
                        current={path === nestedHref}
                        nested={2}
                        key={index}
                        href={nestedHref!}
                      >
                        {nestedName}
                      </SideNavigator>
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
