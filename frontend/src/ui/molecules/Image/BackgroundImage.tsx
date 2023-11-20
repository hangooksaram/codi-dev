import { LocalImagePropsType } from "@/types/ui";
import ImageComponent from "@/ui/atoms/ImageComponent";
import styled from "@emotion/styled";
import { ReactNode, CSSProperties } from "react";

export const BackgroundImage = ({
  image,
  style,
  children,
}: {
  image: LocalImagePropsType;
  style: CSSProperties;
  children: ReactNode;
}) => {
  const { width, height } = image;
  console.log(style);
  return (
    <BackgroundImageContainer width={width} height={height} style={style}>
      <ImageComponent {...image}></ImageComponent>
      <Content>{children}</Content>
    </BackgroundImageContainer>
  );
};

const BackgroundImageContainer = styled.div(
  ({ width, height }: { width?: string; height?: string }) => ({
    position: "relative",
    width,
    height,
  })
);

const Content = styled.div(() => ({
  position: "absolute",
}));
