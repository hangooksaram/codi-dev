import styled from '@emotion/styled';
import theme from '../theme';
import { TypographyProps } from '../../types/ui';
import { useSelector } from 'react-redux';
import {
  selectAccessibilityOption,
  selectFont,
} from '@/features/accessibility/accessibilitySlice';
import dynamicColor from '../dynamicColor';

function Typography({
  variant,
  size,
  color,
  weight,
  align,
  children,
  wordBreak,
  ...rest
}: TypographyProps) {
  const { size: globalFontSize } = useSelector(selectFont);
  const { impreciseMovement, attentionDisorder, dyslexia } = useSelector(
    selectAccessibilityOption,
  );
  const StyledTypography = styled
    .div(() => ({
      minWidth: 'fit-content',
      fontSize: size
        ? `${size + globalFontSize}px`
        : `${theme.fonts.size.sm + globalFontSize}px`,
      color: color ? dynamicColor(color!) : theme.colors.text.strong,
      textAlign: align ?? 'left',
      height: 'fit-content',
      fontWeight: weight ?? theme.fonts.weight.regular,
      wordBreak: wordBreak ?? 'break-word',
      ...rest,
    }))
    .withComponent(variant);
  return <StyledTypography>{children}</StyledTypography>;
}

export default Typography;
