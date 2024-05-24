import {
  toggleFontSize,
  initializeAll,
  selectFocused,
  selectHighlight,
  selectLetterSpacing,
  selectLineHeight,
  selectZoom,
  setFocused,
  setHighlight,
  setLetterSpacing,
  setLineHeight,
  setZoom,
} from '@/features/accessibility/accessibilitySlice';
import FlexBox from '@/ui/atoms/FlexBox';
import { StyledFloating } from '@/ui/atoms/Floating';
import ImageComponent from '@/ui/atoms/ImageComponent';
import Typography from '@/ui/atoms/Typography';
import theme from '@/ui/theme';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import highlightImage from '@images/accessibility/highlight.png';
import focusingboxImage from '@images/accessibility/focusingbox.png';
import { SetState } from '@/index';
import Button from '@/ui/atoms/Button';
import Toggle from 'react-toggle';
import { useEffect, useState } from 'react';
import 'react-toggle/style.css';
import VisualOption from './Options/Visual';
import RetinalOption from './Options/Retinal';
import ImpreciseMovementOption from './Options/ImpreciseMovement';
import AttentionDisorderOption from './Options/AttentionDisorder';
import OptionBox from './OptionBox';
import OptionTypography from './OptionTypography';

type OptionState = 'on' | 'off' | 'initial';

export default function AccessibilityMenu({
  setOpen,
}: {
  setOpen: SetState<boolean>;
}) {
  const dispatch = useDispatch();
  const highlight = useSelector(selectHighlight);
  const focused = useSelector(selectFocused);
  const applyOption = (type: string) => {
    if (type === '하이라이터') {
      dispatch(setHighlight());
      return;
    }
    dispatch(setFocused());
  };

  const initializeOption = () => {
    dispatch(initializeAll());
  };

  return (
    <StyledFloating.Menu color={theme.colors.primary.normal}>
      <FlexBox direction="column" rowGap="40px" alignItems="flex-start">
        <OptionTypography
          variant="div"
          color={theme.colors.primary.text}
          size={theme.fonts.size.md}
          weight={theme.fonts.weight.extraBold}
        >
          사용성 옵션
        </OptionTypography>
        <StyledFloating.InitializeButton
          size="small"
          variant="default"
          onClick={initializeOption}
          color={theme.colors.gray.main}
        >
          초기화
        </StyledFloating.InitializeButton>

        <StyledFloating.OptionContainer>
          <OptionBox>
            <VisualOption />
          </OptionBox>
          <OptionBox>
            <RetinalOption />
          </OptionBox>
          <OptionBox>
            <ImpreciseMovementOption />
          </OptionBox>
          <OptionBox>
            <AttentionDisorderOption />
          </OptionBox>
        </StyledFloating.OptionContainer>
      </FlexBox>
    </StyledFloating.Menu>
  );
}
