import styled from '@emotion/styled';
import FlexBox from '@/ui/atoms/FlexBox';
import { device } from '@/ui/theme';
import ImageComponent from '@/ui/atoms/ImageComponent';

export const AccountFormContainer = styled(FlexBox)(({}) => ({
  [device('mdWeb')]: {
    padding: '40px 10% 32px 10%',
  },
  [device('tablet')]: {
    padding: '30px 0px',
  },

  padding: '40px 20% 32px 20%',
}));

export const AccountImageComponent = styled(ImageComponent)(() => ({
  [device('tablet')]: { display: 'none' },
}));
