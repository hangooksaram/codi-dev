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

export default function RetinalOption() {
  const dispatch = useDispatch();
  const { retinal } = useSelector(selectAccessibilityOption);
  return (
    <div>
      <FlexBox justifyContent="space-between" {...{ marginBottom: '24px' }}>
        <OptionTypography variant="div" color={theme.colors.white}>
          망막 편두통
        </OptionTypography>
        <Toggle
          defaultChecked={retinal.isActivated}
          onChange={(e) => {
            if (e.target.checked) {
              dispatch(
                setActivatedAccessibilityOption({
                  key: 'retinal',
                  isActivated: true,
                }),
              );
              dispatch(toggleFontSize('increase'));
            }
            if (!e.target.checked) {
              dispatch(
                setActivatedAccessibilityOption({
                  key: 'retinal',
                  isActivated: false,
                }),
              );
              dispatch(toggleFontSize('decrease'));
            }
          }}
        />
      </FlexBox>
      <OptionTypography variant="div" color="white">
        글자 크기를 키우고 배경색은 어둡게, 글자색은 밝게 변경됩니다. 전체적인
        색상을 부드럽게 합니다.
      </OptionTypography>
    </div>
  );
}
