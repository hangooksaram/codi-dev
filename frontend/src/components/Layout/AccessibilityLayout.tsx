'use client';

import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import {
  selectFocused,
  selectHighlight,
  selectLetterSpacing,
  selectLineHeight,
  selectZoom,
  setHighlight,
} from '@/features/webAccessibility/webAccessibilitySlice';
import Highlight from '../Accessibility/Highlight';
import myFont from '@/ui/font';
import theme from '@/ui/theme';

type StyledLayoutProps = {
  zoom: number;
  letterSpacing: string;
  lineHeight: number;
  focused: boolean;
};

const StyledLayout = styled.body(
  ({ zoom, letterSpacing, lineHeight, focused }: StyledLayoutProps) => ({
    zoom,
    letterSpacing,
    lineHeight,

    input: {
      ':hover': {
        border: focused ? `4px solid ${theme.colors.secondary.main}` : '',
      },
    },
    button: {
      ':hover': {
        border: focused ? `4px solid ${theme.colors.secondary.main}` : '',
      },
    },
  }),
);

function AccessibilityLayout({ children }: { children: React.ReactNode }) {
  const zoom = useSelector(selectZoom);
  const highlight = useSelector(selectHighlight);
  const letterSpacing = useSelector(selectLetterSpacing);
  const lineHeight = useSelector(selectLineHeight);
  const focused = useSelector(selectFocused);

  return (
    <StyledLayout
      zoom={zoom}
      letterSpacing={letterSpacing}
      lineHeight={lineHeight}
      focused={focused}
      className={myFont.className}
    >
      {highlight && <Highlight />}
      {children}
    </StyledLayout>
  );
}

export default AccessibilityLayout;
