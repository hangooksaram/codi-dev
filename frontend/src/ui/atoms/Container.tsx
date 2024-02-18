import styled from '@emotion/styled';
import { MOBILE_NAVIGATION_HEIGHT } from '@/constants';
import { device } from '@/ui/theme';

const Container = styled.main(({ width }: { width?: string }) => ({
  width: width ?? '69%',
  margin: '0 auto',
  [device('tablet')]: {
    width: '90%',
  },
  [device('smWeb')]: {
    paddingBottom: `${MOBILE_NAVIGATION_HEIGHT}px`,
  },
}));

export const FormContainer = styled(Container)`
  width: 68%;
  max-width: 640px;
  padding-bottom: 80px;
`;

export default Container;
