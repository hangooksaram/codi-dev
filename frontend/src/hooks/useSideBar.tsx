import theme from "@/ui/theme";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCheckDeviceWidth } from "@/hooks/useCheckDeviceWidth";
import { SetState } from "@/index";

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

const useSideBar = (
  navigators: SideBarNavigators[],
  setOpen: SetState<boolean>
) => {
  const [current, setCurrent] = useState<string>();
  const [nestedParent, setNestedParent] = useState<string>();
  const path = usePathname();
  const isMobile = useCheckDeviceWidth(theme.breakpoints.smWeb);

  useEffect(() => {
    setOpen(!isMobile);
  }, [!isMobile]);

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

  return {
    current,
    nestedParent,
    setNestedParent,
    setCurrent,
    path,
  };
};

export default useSideBar;
