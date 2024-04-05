import { SetState } from '@/index';
import FlexBox from '@/ui/atoms/FlexBox';
import Typography from '@/ui/atoms/Typography';
import theme, { device } from '@/ui/theme';
import Close from '@icons/common/close.svg';

function Header({ setOpen }: { setOpen: SetState<boolean> }) {
  return (
    <FlexBox justifyContent="space-between">
      <FlexBox
        columnGap="10px"
        justifyContent="flex-start"
        {...{
          [device('tablet')]: {
            display: 'none',
          },
        }}
      >
        <Typography variant="h1" size={theme.fonts.size.md}>
          직무 선택
        </Typography>
        <Typography variant="div" color={theme.colors.gray.main}>
          해당하는 직무 카테고리를 선택해주세요.
        </Typography>
      </FlexBox>
      <Close onClick={() => setOpen(false)} />
    </FlexBox>
  );
}

export default Header;
