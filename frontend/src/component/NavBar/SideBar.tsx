import Button from "@/ui/atoms/Button";
import FlexBox from "@/ui/atoms/FlexBox";
import theme from "@/ui/theme";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

interface SideBarButton {
  iconComponent?: React.JSX.Element;
  currentIconComponent?: React.JSX.Element;
  name: string;
  href: string;
}

interface SideBarButtons extends SideBarButton {
  nested?: SideBarButton[];
}

const SideBar = ({ buttons }: { buttons: SideBarButtons[] }) => {
  const router = useRouter();
  const path = usePathname();
  return (
    <Container>
      <FlexBox direction="column">
        {buttons.map((button, index) => {
          const current = button.href === path;
          return (
            <>
              <ListItem
                onClick={() => router.push(button.href)}
                current={current}
                key={index}
              >
                <FlexBox justifyContent="flex-start" columnGap="10px">
                  {current ? button.currentIconComponent : button.iconComponent}
                  {button.name}
                </FlexBox>
              </ListItem>
              {button.nested &&
                path.includes("mentorCenter") &&
                button.nested.map((item, index) => {
                  const current = item.href === path;
                  return (
                    <ListItem
                      onClick={() => router.push(item.href)}
                      current={current}
                      nested={2}
                      key={index}
                    >
                      {item.name}
                    </ListItem>
                  );
                })}
            </>
          );
        })}
      </FlexBox>
    </Container>
  );
};

const Container = styled.div`
  width: 244px;
  height: 100%;
  position: sticky;
  left: 0px;
  top: 0px;
  z-index: 2;
  background: ${theme.colors.white};
  box-shadow: 0px 2px 4px 0px rgba(22, 23, 24, 0.08);
`;

const ListItem = styled.div(
  ({ current, nested }: { current: boolean; nested?: number }) => ({
    display: "flex",
    width: "244px",
    height: "64px",
    paddingLeft: nested ? `${40 * nested}px` : "40px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: current ? theme.colors.primary : theme.colors.white,
    color: current ? theme.colors.white : theme.colors.gray.main,
  })
);

export default SideBar;
