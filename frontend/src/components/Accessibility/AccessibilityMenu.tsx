import {
  initializeAll,
  selectAccessibilityOption,
  toggleFontSize,
} from '@/features/accessibility/accessibilitySlice';
import FlexBox from '@/ui/atoms/FlexBox';
import { StyledFloating } from '@/ui/atoms/Floating';
import theme from '@/ui/theme';
import { useDispatch } from 'react-redux';
import { SetState } from '@/index';
import 'react-toggle/style.css';
import VisualOption from './Options/Visual';
import RetinalOption from './Options/Retinal';
import ImpreciseMovementOption from './Options/ImpreciseMovement';
import AttentionDisorderOption from './Options/AttentionDisorder';
import OptionBox from './OptionBox';
import OptionTypography from './OptionTypography';
import { useSelector } from 'react-redux';

export default function AccessibilityMenu() {
  const dispatch = useDispatch();
  const { visual, retinal } = useSelector(selectAccessibilityOption);

  const initializeOption = () => {
    dispatch(initializeAll());
    if (visual.isActivated) {
      dispatch(toggleFontSize('decrease'));
    }
    if (retinal.isActivated) {
      dispatch(toggleFontSize('decrease'));
    }
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
          {/* <OptionBox>
            <DyslexiaOption />
          </OptionBox> */}
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
