import Button from "@/ui/atoms/Button";
import FlexBox from "@/ui/atoms/FlexBox";
import theme from "@/ui/theme";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

const SideBar = ({ navigators }: { navigators: SideBarNavigators[] }) => {
  const [current, setCurrent] = useState<string>();
  const [nestedParent, setNestedParent] = useState<string>();

  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    navigators.forEach((navigator) => {
      navigator.nested?.forEach((nestedNavigator) => {
        if (nestedNavigator.href === path) {
          setNestedParent(navigator.href);
        }
      });
    });
    setCurrent(path);

    return () => setNestedParent("");
  }, [path]);
  return (
    <Container>
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

const Container = styled.nav`
  width: 244px;
  height: calc(100vh - 59px);
  position: sticky;
  align-self: flex-start;
  left: 0px;
  top: 59px;
  background: ${theme.colors.white};
  box-shadow: 0px 2px 4px 0px rgba(22, 23, 24, 0.08);
`;

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

export default SideBar;
