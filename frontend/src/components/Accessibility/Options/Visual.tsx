import {
  selectAccessibilityOption,
  setActivatedAccessibilityOption,
  toggleFontSize,
} from '@/features/accessibility/accessibilitySlice';
import FlexBox from '@/ui/atoms/FlexBox';
import theme from '@/ui/theme';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Toggle from 'react-toggle';
import OptionTypography from '../OptionTypography';
import VisualIcon from '@icons/accessibility/visual-icon.svg';

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
        <FlexBox justifyContent="flex-start" columnGap="8px">
          <VisualIcon />
          <OptionTypography variant="div" color={theme.colors.white} size={20}>
            시각장애
          </OptionTypography>
        </FlexBox>
        <Toggle
          checked={visual.isActivated}
          onChange={(e) => {
            if (e.target.checked) {
              dispatch(
                setActivatedAccessibilityOption({
                  key: 'visual',
                  isActivated: true,
                }),
              );
              dispatch(toggleFontSize('increase'));
            }
            if (!e.target.checked) {
              dispatch(
                setActivatedAccessibilityOption({
                  key: 'visual',
                  isActivated: false,
                }),
              );
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
