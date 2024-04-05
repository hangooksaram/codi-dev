import styled from '@emotion/styled';
import Button from './Button';
import theme, { device } from '../theme';
import Card from './Card';
import { MOBILE_NAVIGATION_HEIGHT } from '@/constants';

export const StyledFloating = {
  OpenButton: styled(Button)(({}) => ({
    position: 'fixed',
    zIndex: 104,
    bottom: '20px',
    right: '20px',
    letterSpacing: 'initial !important',
    lineHeight: '1 !important',
    zoom: '1 !important',

    width: '110px',
    [device('tablet')]: {
      width: '84px',
      height: '84px',

      bottom: '148px',
    },
  })),
  CloseButton: styled(Button)(({}) => ({
    display: 'none',
    [device('mobile')]: {
      display: 'block',
    },
  })),

  Menu: styled(Card)({
    position: 'absolute',
    zIndex: '105',
    width: '420px',
    height: 'auto',
    bottom: '150px',
    padding: '30px',
    right: '20px',
    overflow: 'auto',
    [device('tablet')]: {
      position: 'fixed',
      width: '100%',
      top: '0',
      left: '0',
      height: `calc(100vh - ${MOBILE_NAVIGATION_HEIGHT}px);`,
      padding: '30px',
      borderRadius: 0,
    },
  }),
  Button: styled(Button)({
    width: '96px',
    height: '96px',
    padding: '10px',
    borderRadius: '20px',
    boxShadow: `4px 4px 4px 0px #28364D, 2px 2px 4px 0px #2D3C52 inset, -1px -1px 2px 0px #2E3D53`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [device('mobile')]: {
      fontSize: theme.fonts.size.xs,
    },
  }),
  InitializeButton: styled(Button)({
    position: 'absolute',
    top: '20px',
    right: '30px',
    color: theme.colors.black,
  }),
};
