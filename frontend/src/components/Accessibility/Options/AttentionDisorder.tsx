import {
  selectAccessibilityOption,
  setActivatedAccessibilityOption,
  toggleFontSize,
} from '@/features/accessibility/accessibilitySlice';
import FlexBox from '@/ui/atoms/FlexBox';
import Typography from '@/ui/atoms/Typography';
import theme from '@/ui/theme';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Toggle from 'react-toggle';

export default function AttentionDisorderOption() {
  const dispatch = useDispatch();
  const { attentionDisorder } = useSelector(selectAccessibilityOption);
  return (
    <div>
      <FlexBox justifyContent="space-between" {...{ marginBottom: '24px' }}>
        <Typography variant="div" color={theme.colors.white}>
          주의력 부족
        </Typography>
        <Toggle
          defaultChecked={attentionDisorder.isActivated}
          onChange={(e) => {
            if (e.target.checked) {
              dispatch(
                setActivatedAccessibilityOption({
                  key: 'attentionDisorder',
                  isActivated: true,
                }),
              );
            }
            if (!e.target.checked) {
              dispatch(
                setActivatedAccessibilityOption({
                  key: 'attentionDisorder',
                  isActivated: false,
                }),
              );
            }
          }}
        />
      </FlexBox>
      <Typography variant="div" color="white">
        색상의 대비를 높이고 글자와 콘텐츠가 왼쪽으로 정렬됩니다. 가로로
        강조선이 나타납니다.
      </Typography>
    </div>
  );
}
