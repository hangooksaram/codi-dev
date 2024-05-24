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
import ImpreciseIcon from '@icons/accessibility/imprecision-icon.svg';

export default function ImpreciseMovementOption() {
  const dispatch = useDispatch();
  const { impreciseMovement } = useSelector(selectAccessibilityOption);
  return (
    <div>
      <FlexBox justifyContent="space-between" {...{ marginBottom: '24px' }}>
        <FlexBox justifyContent="flex-start" columnGap="8px">
          <ImpreciseIcon />
          <OptionTypography variant="div" color={theme.colors.white} size={20}>
            손 떨림
          </OptionTypography>
        </FlexBox>
        <Toggle
          checked={impreciseMovement.isActivated}
          onChange={(e) => {
            if (e.target.checked) {
              dispatch(
                setActivatedAccessibilityOption({
                  key: 'impreciseMovement',
                  isActivated: true,
                }),
              );
            }
            if (!e.target.checked) {
              dispatch(
                setActivatedAccessibilityOption({
                  key: 'impreciseMovement',
                  isActivated: false,
                }),
              );
            }
          }}
        />
      </FlexBox>
      <OptionTypography variant="div" color="white">
        버튼의 크기가 커지고, 마우스를 올리면 버튼에 사각박스가 표시됩니다.
      </OptionTypography>
    </div>
  );
}
