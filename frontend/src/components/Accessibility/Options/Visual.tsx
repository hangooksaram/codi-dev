import {
  selectAccessibilityOption,
  toggleFontSize,
} from '@/features/accessibility/accessibilitySlice';
import FlexBox from '@/ui/atoms/FlexBox';
import theme from '@/ui/theme';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Toggle from 'react-toggle';
import OptionTypography from '../OptionTypography';

export default function VisualOption() {
  const dispatch = useDispatch();
  const { visual } = useSelector(selectAccessibilityOption);

  return (
    <div style={{ width: '100%' }}>
      <FlexBox
        width="100%"
        justifyContent="space-between"
        {...{ marginBottom: '24px' }}
      >
        <OptionTypography variant="div" color={theme.colors.white}>
          시각장애
        </OptionTypography>
        <Toggle
          defaultChecked={visual.isActivated}
          onChange={(e) => {
            if (e.target.checked) {
              dispatch(toggleFontSize('increase'));
            }
            if (!e.target.checked) {
              dispatch(toggleFontSize('decrease'));
            }
          }}
        />
      </FlexBox>
      <OptionTypography variant="div" color="white">
        글자 크기를 키우고 색상 대비를 높입니다.
      </OptionTypography>
    </div>
  );
}
