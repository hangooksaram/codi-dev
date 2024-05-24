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
import AttentionIcon from '@icons/accessibility/attention-icon.svg';

export default function AttentionDisorderOption() {
  const dispatch = useDispatch();
  const { attentionDisorder } = useSelector(selectAccessibilityOption);
  return (
    <div>
      <FlexBox
        width="100%"
        justifyContent="space-between"
        {...{ marginBottom: '24px' }}
      >
        <FlexBox justifyContent="flex-start" columnGap="8px">
          <AttentionIcon />
          <OptionTypography variant="div" color={theme.colors.white} size={20}>
            주의력 부족
          </OptionTypography>
        </FlexBox>
        <Toggle
          checked={attentionDisorder.isActivated}
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
      <OptionTypography variant="div" color="white">
        색상의 대비를 높이고 글자와 콘텐츠가 왼쪽으로 정렬됩니다. 가로로
        강조선이 나타납니다.
      </OptionTypography>
    </div>
  );
}
