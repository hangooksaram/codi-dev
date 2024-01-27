'use client';

import FlexBox from '@/ui/atoms/FlexBox';
import { css } from '@emotion/css';
import Skeleton from 'react-loading-skeleton';

const MentorCenterLoading = () => {
  return (
    <>
      <Skeleton />
      <FlexBox columnGap="20px" {...{ marginTop: '20px' }}>
        <Skeleton
          containerClassName={css`
            flex: 0.4;
          `}
          className={css`
            height: 70vh;
          `}
        />
        <Skeleton
          containerClassName={css`
            flex: 0.6;
          `}
          className={css`
            height: 70vh;
          `}
        />
      </FlexBox>
    </>
  );
};

export default MentorCenterLoading;
