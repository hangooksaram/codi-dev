import FlexBox from '@/ui/atoms/FlexBox';
import { device } from '@/ui/theme';
import styled from '@emotion/styled';

export const MentoringsScrollContainer = styled.div(() => ({
  maxHeight: '510px',
  overflowY: 'auto',
  padding: '0px',
  [device('tablet')]: {
    overflowY: 'unset',
    overflowX: 'auto',
    maxHeight: '300px',
  },
}));

export const MonthlyMentoringMembersContainer = styled(FlexBox)(() => ({
  [device('tablet')]: {
    width: 'auto',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
}));
