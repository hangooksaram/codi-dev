'use client';

import FloatIcon from '@icons/common/float.svg';
import styled from '@emotion/styled';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Overlay from '@/ui/atoms/BackgroundOverlay';
import theme, { device } from '@/ui/theme';
import { StyledFloating } from '@/ui/atoms/Floating';
import { trackGAEvent } from '../GoogleAnalytics/GoogleAnalyticsWithLibrary/googlaAnalytics';
import AccessibilityMenu from './AccessibilityMenu';
import OptionTypography from './OptionTypography';
import FlexBox from '@/ui/atoms/FlexBox';

function AccessibilityFloating() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  if (path === '/signin/') return;

  return (
    <>
      <AccessibilityFloatingButton
        id="accessibility-button"
        onClick={() => {
          setOpen((prev) => !prev);
          trackGAEvent('클릭', '접근성 버튼 클릭', '접근성');
        }}
        variant="round"
        width="110px"
        color={theme.colors.primary.normal}
        hoverDisabled
      >
        <FlexBox direction="column" rowGap="4px">
          <FloatIcon />
          <OptionTypography
            variant="div"
            color="white"
            {...{ [device('mobile')]: { display: 'none' } }}
          >
            접근성 기능
          </OptionTypography>
        </FlexBox>
      </AccessibilityFloatingButton>
      {open && (
        <FloatingOverlay
          onClick={() => {
            setOpen(false);
          }}
        />
      )}
      {open && <AccessibilityMenu setOpen={setOpen} />}
    </>
  );
}

const FloatingOverlay = styled(Overlay)`
  z-index: 103;
`;

const AccessibilityFloatingButton = styled(StyledFloating.OpenButton)(() => ({
  // [device('mobile')]: {
  //   display: 'none',
  // },
}));

export default AccessibilityFloating;
