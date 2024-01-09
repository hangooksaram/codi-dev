import FlexBox from "@/ui/atoms/FlexBox";
import Link from "next/link";
import Logo from "@icons/logo/logo-primary.svg";
import { TopNavigator } from "@/ui/atoms/Navigator";
import { usePathname } from "next/navigation";

const AppBarTab = () => {
  const path = usePathname();
  return (
    <FlexBox
      justifyContent="space-between"
      {...{ height: "100%", maxWidth: "50%" }}
    >
      <Link href={"/"}>
        <Logo width="108px" height="26px" />
      </Link>

      <TopNavigator current={path.includes("/mentorsMain")} href="/mentorsMain">
        멘토 찾기
      </TopNavigator>
      <TopNavigator current={path.includes("/myCodi")} href="/myCodi">
        멘티 센터
      </TopNavigator>
    </FlexBox>
  );
};

export default AppBarTab;
