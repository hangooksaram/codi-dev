"use client";

import theme from "@/ui/theme";
import Button from "@/ui/atoms/Button";
import PrimaryLogo from "@icons/logo/logo-primary.svg";
import SecondaryLogo from "@icons/logo/logo-secondary.svg";
import Link from "next/link";
import StyledLink from "@/ui/atoms/Link";
import FlexBox from "@/ui/atoms/FlexBox";
import Typography from "@/ui/atoms/Typography";
import Container from "@/ui/atoms/Container";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import StyledImage from "@/ui/atoms/StyledImage";
import styled from "@emotion/styled";
import Image from "next/image";
import Card from "@/ui/atoms/Card";
import Input from "@/ui/atoms/Input";
import { signIn } from "@/api/signApi";
import { localUser, setLocalUser } from "@/utils/tempUser";
import { useDispatch } from "react-redux";
import { setUser } from "@/features/user/userSlice";
import ImageComponent from "@/ui/atoms/ImageComponent";
import signInImage from "@images/signin-image.png";
import usePressEnterKey from "@/hooks/usePressEnterKey";

const SignInPage = () => {
  const router = useRouter();
  const [loginInfo, setLoginInfo] = useState({
    id: "",
    password: "",
  });
  const dispatch = useDispatch();
  const login = async () => {
    const { data, status } = await signIn(loginInfo);
    if (status === 200) {
      setLocalUser(data!);
      dispatch(setUser(localUser()));
      router.push("/");
    } else {
      alert("로그인이 실패했습니다.");
    }
  };

  const signInButtonRef = useRef<HTMLButtonElement>(null);
  usePressEnterKey(signInButtonRef);

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
          <ImageComponent
            alt="sign-in-image"
            width="100%"
            height="600px"
            src={signInImage}
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
              type="password"
              placeholder="비밀번호를 입력해주세요"
            />
            <Button
              ref={signInButtonRef}
              onClick={login}
              width="100%"
              variant="square"
              size="big"
            >
              로그인
            </Button>
          </FlexBox>
          <FlexBox justifyContent="space-between" {...{ marginBottom: "80px" }}>
            <FlexBox width="60%" columnGap="20px" justifyContent="flex-start">
              <StyledLink color={theme.colors.gray.dark} href="/account/findId">
                아이디 찾기
              </StyledLink>
              <div style={{ color: theme.colors.gray.dark }}>|</div>
              <StyledLink color={theme.colors.gray.dark} href="/account/findPw">
                비밀번호 찾기
              </StyledLink>
            </FlexBox>
            {/* <SignInTextButton variant="default">로그인 유지</SignInTextButton> */}
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

const SignInImageCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 0;
  border-bottom-right-radius: 20px;
  position: relative;
  padding: 60px;
`;

const SignInTitle = styled("div")`
  position: absolute;
  top: 40%;
  z-index: 2;
  word-break: break-word;
  max-width: 310px;
`;

const SignInRightArea = styled.div`
  width: 60%;
`;

const SignInInput = styled(Input)`
  height: 70px;
  background-color: ${theme.colors.gray.light};
  font-size: ${theme.fonts.size.md};
`;

const SignInTextButton = styled(Button)`
  height: fit-content;
  color: ${theme.colors.gray.dark};
  background-color: transparent;
`;

const StyledSignInImage = styled(Image)(() => ({
  maxWidth: "90%",
  height: "auto",
  objectFit: "contain",
  position: "absolute",
  right: 0,
  zIndex: 1,
}));

export default SignInPage;
