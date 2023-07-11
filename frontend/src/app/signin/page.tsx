"use client";

import SignInImage from "../../../public/images/signin-image.png";
import theme from "@/ui/theme";
import Button from "@/ui/atoms/Button/Button";
import PrimaryLogo from "../../../public/images/logo-primary.svg";
import SecondaryLogo from "../../../public/images/logo-secondary.svg";
import Link from "next/link";
import StyledLink from "@/ui/atoms/Button/Link";
import FlexBox from "@/ui/atoms/Layout/FlexBox";
import Typography from "@/ui/atoms/Typography/Typography";
import Container from "@/ui/atoms/Layout/Container";
import {
  SignInImageCard,
  SignInInput,
  SignInRightArea,
  SignInTextButton,
  StyledSignInImage,
  SignInTitle,
} from "@/ui/pages/SignIn/signIn";

const SignInPage = () => {
  return (
    <FlexBox {...{ height: "100%" }}>
      <SignInImageCard width="40%" color={theme.colors.primary}>
        <SecondaryLogo />
        <SignInTitle>
          <Typography
            variant="h1"
            size={theme.fonts.size.xl}
            color={theme.colors.white}
          >
            TOGETHER, NEVER DIFFERENT
          </Typography>
        </SignInTitle>
        <StyledSignInImage alt="sign-in-image" src={SignInImage} />
      </SignInImageCard>
      <SignInRightArea>
        <Container width="70%">
          <FlexBox justifyContent="center">
            <PrimaryLogo />
          </FlexBox>
          <FlexBox
            direction="column"
            rowGap="20px"
            {...{ margin: "40px 0px 32px 0px" }}
          >
            <SignInInput placeholder="아이디를 입력해주세요" />
            <SignInInput placeholder="비밀번호를 입력해주세요" />
            <Button width="100%" variant="square" size="big">
              로그인
            </Button>
          </FlexBox>
          <FlexBox justifyContent="space-between" {...{ marginBottom: "80px" }}>
            <FlexBox
              {...{ width: "60%" }}
              columnGap="20px"
              justifyContent="flex-start"
            >
              <StyledLink color={theme.colors.gray.dark} href="find">
                아이디 찾기
              </StyledLink>
              <div style={{ color: theme.colors.gray.dark }}>|</div>

              <StyledLink color={theme.colors.gray.dark} href="find">
                비밀번호 찾기
              </StyledLink>
            </FlexBox>
            <SignInTextButton variant="default">로그인 유지</SignInTextButton>
          </FlexBox>
          <FlexBox justifyContent="center">
            <Typography
              variant="span"
              color={theme.colors.gray.dark}
              {...{ marginRight: "10px" }}
            >
              아직 아이디가 없으신가요?
            </Typography>
            <Link href="signup">회원가입</Link>
          </FlexBox>
        </Container>
      </SignInRightArea>
    </FlexBox>
  );
};

export default SignInPage;
