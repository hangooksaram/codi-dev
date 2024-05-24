import {
  selectDisabilityOption,
  setActivatedDisabilityOption,
  toggleFontSize,
} from '@/features/webAccessibility/webAccessibilitySlice';
import FlexBox from '@/ui/atoms/FlexBox';
import Typography from '@/ui/atoms/Typography';
import theme from '@/ui/theme';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Toggle from 'react-toggle';

export default function ImpreciseMovementOption() {
  const dispatch = useDispatch();
  const { impreciseMovement } = useSelector(selectDisabilityOption);
  return (
    <div>
      <FlexBox justifyContent="space-between" {...{ marginBottom: '24px' }}>
        <Typography variant="div" color={theme.colors.white}>
          손 떨림
        </Typography>
        <Toggle
          defaultChecked={impreciseMovement.isActivated}
          onChange={(e) => {
            if (e.target.checked) {
              dispatch(
                setActivatedDisabilityOption({
                  key: 'impreciseMovement',
                  isActivated: true,
                }),
              );
            }
            if (!e.target.checked) {
              dispatch(
                setActivatedDisabilityOption({
                  key: 'impreciseMovement',
                  isActivated: false,
                }),
              );
            }
          }}
        />
      </FlexBox>
      <Typography variant="div" color="white">
        버튼의 크기가 커지고, 마우스를 올리면 버튼에 사각박스가 표시됩니다.
      </Typography>
    </div>
  );
}
