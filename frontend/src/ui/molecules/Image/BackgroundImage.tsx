import styled from '@emotion/styled';
import { ReactNode, CSSProperties } from 'react';
import { LocalImagePropsType } from '@/types/ui';
import ImageComponent from '@/ui/atoms/ImageComponent';

export function BackgroundImage({
  image,
  children,
  ...rest
}: {
  image: LocalImagePropsType;
  children: ReactNode;
}) {
  const { width, height } = image;

  return (
    <BackgroundImageContainer width={width} height={height} {...rest}>
      <ImageComponent {...image} />
      <Content>{children}</Content>
    </BackgroundImageContainer>
  );
}

const BackgroundImageContainer = styled.div(
  ({
    width,
    height,
    children,
    ...rest
  }: {
    width?: string;
    height?: string;
    children: ReactNode;
  }) => ({
    position: 'relative',
    width,
    height,
    ...rest,
  }),
);

const Content = styled.div(() => ({
  position: 'absolute',
}));
