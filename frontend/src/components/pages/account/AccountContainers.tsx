import styled from '@emotion/styled';
import { backgroundImage } from '@/ui/atoms/BackgroundImage';
import FlexBox from '@/ui/atoms/FlexBox';
import { device } from '@/ui/theme';

export const SignImageContainer = styled.div(
  ({ backgroundImageSrc }: { backgroundImageSrc?: string }) => ({
    width: '45.5%',
    height: '100%',
    [device('mdWeb')]: {
      width: '35%',
    },
    ...backgroundImage(backgroundImageSrc!),
  }),
);

export const SignInputFormContainer = styled(FlexBox)(({}) => ({
  [device('mdWeb')]: {
    padding: '40px 10% 32px 10%',
  },

  padding: '40px 20% 32px 20%',
}));
