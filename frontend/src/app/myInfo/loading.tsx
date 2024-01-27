'use client';

import FlexBox from '@/ui/atoms/FlexBox';
import { device } from '@/ui/theme';
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import Skeleton from 'react-loading-skeleton';

const MyInfoLoading = () => (
  <Wrapper columnGap="20px">
    <Skeleton
      containerClassName={css`
        flex: 0.4;
      `}
      className={css`
        height: 477px;
      `}
    />
    <Skeleton
      containerClassName={css`
        flex: 0.6;
      `}
      className={css`
        height: 477px;
      `}
    />
  </Wrapper>
);

const Wrapper = styled(FlexBox)(({}) => ({
  [device('mobile')]: {
    flexDirection: 'column',
  },
}));

export default MyInfoLoading;
