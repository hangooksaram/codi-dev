import { backgroundImage } from "@/ui/atoms/BackgroundImage";
import FlexBox from "@/ui/atoms/FlexBox";
import { device } from "@/ui/theme";
import styled from "@emotion/styled";

export const SignImageContainer = styled.div(
  ({ backgroundImageSrc }: { backgroundImageSrc?: string }) => ({
    width: "45.5%",
    height: "100%",
    [device("mdWeb")]: {
      width: "35%",
    },
    ...backgroundImage(backgroundImageSrc!),
  })
);

export const SignInputFormContainer = styled(FlexBox)(({}) => ({
  [device("mdWeb")]: {
    padding: "40px 100px 32px 100px",
  },

  padding: "40px 265px 32px 265px",
}));
