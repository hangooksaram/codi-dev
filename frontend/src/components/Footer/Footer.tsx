import Container from '@/ui/atoms/Container';
import FlexBox from '@/ui/atoms/FlexBox';
import Typography from '@/ui/atoms/Typography';
import theme from '@/ui/theme';
import styled from '@emotion/styled';
import Logo from '@icons/logo/logo-footer.svg';

const Footer = () => {
  return (
    <StyledFooter>
      <FlexBox
        alignItems="center"
        justifyContent="space-between"
        {...{ height: '100%' }}
      >
        <FlexBox justifyContent="flex-start" columnGap="7.5px">
          <Logo />
          <div>
            <Typography
              variant="span"
              color={theme.colors.gray.dark}
              weight={theme.fonts.weight.bold}
            >
              {`서비스명: `}
            </Typography>
            <Typography variant="span" color={theme.colors.gray.dark}>
              코디
            </Typography>
          </div>

          <div>|</div>
          <div>
            <Typography
              variant="span"
              color={theme.colors.gray.dark}
              weight={theme.fonts.weight.bold}
            >
              {`관리자명: `}
            </Typography>
            <Typography variant="span" color={theme.colors.gray.dark}>
              팀 코디네이터
            </Typography>
          </div>

          <div>|</div>

          <Typography variant="span" color={theme.colors.gray.dark}>
            www.codisabled.com
          </Typography>
          <div>|</div>
          <div>
            <Typography
              variant="span"
              color={theme.colors.gray.dark}
              weight={theme.fonts.weight.bold}
            >
              {`이메일: `}
            </Typography>
            <Typography variant="span" color={theme.colors.gray.dark}>
              codinator.info@gmail.com
            </Typography>
          </div>
        </FlexBox>
      </FlexBox>
    </StyledFooter>
  );
};

const StyledFooter = styled(Container)({
  width: '100%',
  padding: '0px 15.8%',
  height: '59px',
  backgroundColor: theme.colors.gray.light,
  color: theme.colors.gray.main,
});

export default Footer;
