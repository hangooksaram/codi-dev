"use client";

import SignInImage from "@icons/signin-image.png";
import theme from "@/ui/theme";
import Button from "@/ui/atoms/Button/Button";
import PrimaryLogo from "@icons/logo/logo-primary.svg";
import SecondaryLogo from "@icons/logo/logo-secondary.svg";
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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { checkUser, isUser, setLocal } from "@/utils/tempUser";
import { StyledImage } from "@/ui/atoms/Image/StyledImage";

const SignInPage = () => {
  const router = useRouter();
  const [loginInfo, setLoginInfo] = useState({
    id: "",
    password: "",
  });
  const login = () => {
    if (!checkUser(loginInfo)) {
      alert("가입된 회원이 없습니다. 회원가입을 먼저 해주세요");
      return;
    }
    router.replace("/");
  };
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
            SHARE THE SAME EXPERIENCE
          </Typography>
        </SignInTitle>

        <div
          style={{ width: "100%", position: "absolute", top: 120, right: 0 }}
        >
          <StyledImage
            alt="sign-in-image"
            width="100%"
            height="600px"
            src="/images/signin-image.png"
          />
        </div>
      </SignInImageCard>
      <SignInRightArea>
        <Container width="70%">
          <FlexBox justifyContent="center">
            <PrimaryLogo width="200px" height="50px" />
          </FlexBox>
          <FlexBox
            direction="column"
            rowGap="20px"
            {...{ margin: "40px 0px 32px 0px" }}
          >
            <SignInInput
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, id: e.target.value })
              }
              placeholder="아이디를 입력해주세요"
            />
            <SignInInput
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, password: e.target.value })
              }
              placeholder="비밀번호를 입력해주세요"
            />
            <Button onClick={login} width="100%" variant="square" size="big">
              로그인
            </Button>
          </FlexBox>
          <FlexBox justifyContent="space-between" {...{ marginBottom: "80px" }}>
            <FlexBox width="60%" columnGap="20px" justifyContent="flex-start">
              <StyledLink color={theme.colors.gray.dark} href="">
                아이디 찾기
              </StyledLink>
              <div style={{ color: theme.colors.gray.dark }}>|</div>

              <StyledLink color={theme.colors.gray.dark} href="">
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
            <Link href="/signup">회원가입</Link>
          </FlexBox>
        </Container>
      </SignInRightArea>
    </FlexBox>
  );
};

export default SignInPage;
