import {
  selectDisabilityOption,
  toggleFontSize,
} from '@/features/webAccessibility/webAccessibilitySlice';
import FlexBox from '@/ui/atoms/FlexBox';
import Typography from '@/ui/atoms/Typography';
import theme from '@/ui/theme';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Toggle from 'react-toggle';

export default function VisualOption() {
  const dispatch = useDispatch();
  const { visual } = useSelector(selectDisabilityOption);

  return (
    <div>
      <FlexBox justifyContent="space-between" {...{ marginBottom: '24px' }}>
        <Typography variant="div" color={theme.colors.white}>
          시각장애
        </Typography>
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
      <Typography variant="div" color="white">
        글자 크기를 키우고 색상 대비를 높입니다.
      </Typography>
    </div>
  );
}
