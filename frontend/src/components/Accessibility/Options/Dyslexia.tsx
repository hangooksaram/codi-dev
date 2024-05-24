import {
  selectAccessibilityOption,
  setActivatedAccessibilityOption,
  setDyslexiaData,
  toggleFontSize,
} from '@/features/accessibility/accessibilitySlice';
import FlexBox from '@/ui/atoms/FlexBox';
import theme from '@/ui/theme';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Toggle from 'react-toggle';
import OptionTypography from '../OptionTypography';
import Input from '@/ui/atoms/Input';
import { useState } from 'react';
import Button from '@/ui/atoms/Button';

export default function DyslexiaOption() {
  const dispatch = useDispatch();
  const { dyslexia } = useSelector(selectAccessibilityOption);
  const [text, setText] = useState('');
  return (
    <div>
      <FlexBox
        width="100%"
        justifyContent="space-between"
        {...{ marginBottom: '24px' }}
      >
        <OptionTypography variant="div" color={theme.colors.white}>
          난독증
        </OptionTypography>
        <OptionTypography variant="div" color={theme.colors.white}>
          원하는 단어를 찾아서 강조합니다.
        </OptionTypography>
      </FlexBox>
      <Input value={text} onChange={(e) => setText(e.target.value)} />
      <Button variant="default" onClick={() => dispatch(setDyslexiaData(text))}>
        단어 강조하기
      </Button>
    </div>
  );
}
