'use client';

import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import {
  selectFocused,
  selectFont,
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
  font: {
    color: string;
    size: number;
  };
};

const StyledLayout = styled.div(
  ({ zoom, letterSpacing, lineHeight, focused, font }: StyledLayoutProps) => ({
    zoom,
    letterSpacing,
    lineHeight,
    fontSize: `${font.size}px`,

    input: {
      ':hover': {
        border: focused
          ? `4px solid ${theme.colors.secondary.normal} !important`
          : '',
      },
    },
    button: {
      ':hover': {
        border: focused
          ? `4px solid ${theme.colors.secondary.normal} !important`
          : '',
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
  const font = useSelector(selectFont);

  return (
    <StyledLayout
      zoom={zoom}
      letterSpacing={letterSpacing}
      lineHeight={lineHeight}
      focused={focused}
      font={font}
      className={myFont.className}
    >
      {highlight && <Highlight />}
      {children}
    </StyledLayout>
  );
}

export default AccessibilityLayout;
