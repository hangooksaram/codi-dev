"use client";

import { PageComponentLayout } from "@/ui/atoms/Layout/PageComonentLayout";
import Container from "@/ui/atoms/Layout/Container";
import Typography from "@/ui/atoms/Typography/Typography";
import Button from "@/ui/atoms/Button/Button";
import StyledLink from "@/ui/atoms/Button/Link";
import theme from "@/ui/theme";
import FlexBox from "@/ui/atoms/Layout/FlexBox";
import { useRouter } from "next/navigation";
import { StyledImage } from "@/ui/atoms/Image/StyledImage";

const CompletePage = () => {
  const router = useRouter();
  return (
    <Container>
      <FlexBox direction="column" alignItems="center" rowGap="20px">
        <div style={{ width: "70%" }}>
          <StyledImage
            width="100%"
            height="520px"
            src={"/images/sign-up-complete.png"}
            alt="complete-image"
          />
        </div>

        <Typography variant="div">
          딱 맞는 멘토 매칭을 위해서 조금만 더 알려주세요!
        </Typography>
        <Button
          onClick={() => {
            router.push("/profileForm");
          }}
          variant="default"
          color={theme.colors.primary}
        >
          프로필 작성하기
        </Button>
        <StyledLink href="/">나중에 할게요</StyledLink>
      </FlexBox>
    </Container>
  );
};

export default CompletePage;
