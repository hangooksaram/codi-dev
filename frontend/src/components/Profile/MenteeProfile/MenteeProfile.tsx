'use client';

import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import FlexBox from '@/ui/atoms/FlexBox';
import LabelBox from '@/ui/molecules/LabelBox';
import Grid from '@/ui/atoms/Grid';
import Chip from '@/ui/atoms/Chip';
import ProfileLabelText from '../ProfileLabelText';
import MyInfoCommonContainerCard from '../../pages/menteeCenterCommon/MyInfoCommonContainerCard';
import MyInfoCard from '../../pages/menteeCenterCommon/MyInfoCard';
import { MenteeProfile } from '@/types/profile';
import { device } from '@/ui/theme';
import MenteeProfileInformation from './MenteeProfileInformation';

interface MenteeProfilePageParams {
  profile?: MenteeProfile;
  children?: ReactNode;
}

function MenteeProfile({ profile, children }: MenteeProfilePageParams) {
  return (
    <FlexBox
      justifyContent="space-between"
      alignItems="flex-start"
      columnGap="20px"
      rowGap="20px"
      {...{
        [device('tablet')]: {
          flexDirection: 'column',
        },
      }}
    >
      {children}

      <MenteeProfileInformation profile={profile!} />
    </FlexBox>
  );
}

const ReactiveGrid1 = styled(Grid)({
  [device('tablet')]: {
    gridTemplateColumns: '1fr',
  },
});

export default MenteeProfile;
