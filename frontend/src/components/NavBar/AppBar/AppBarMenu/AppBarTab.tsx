import Link from 'next/link';
import Logo from '@icons/logo/logo-primary.svg';
import { usePathname } from 'next/navigation';
import { TopNavigator } from '@/ui/atoms/Navigator';
import FlexBox from '@/ui/atoms/FlexBox';

function AppBarTab() {
  const path = usePathname();
  return (
    <FlexBox
      justifyContent="space-between"
      {...{ height: '100%', maxWidth: '50%' }}
    >
      <Link href="/">
        <Logo width="108px" height="26px" />
      </Link>

      <TopNavigator current={path.includes('/mentorsMain')} href="/mentorsMain">
        멘토 찾기
      </TopNavigator>
      <TopNavigator
        current={path.includes('/menteeCenter')}
        href="/menteeCenter"
      >
        멘티 센터
      </TopNavigator>
    </FlexBox>
  );
}

export default AppBarTab;
