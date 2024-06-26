import styled from '@emotion/styled';
import Card from '@/ui/atoms/Card';
import theme, { device } from '@/ui/theme';

const MyInfoCommonContainerCard = styled(Card)({
  backgroundColor: theme.colors.background,
  padding: '30px',
  height: 'auto',

  [device('tablet')]: {
    backgroundColor: 'white',
    border: 'none',
    padding: '0px',
  },
});

export default MyInfoCommonContainerCard;
