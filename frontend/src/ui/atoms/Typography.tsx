import styled from '@emotion/styled';
import theme from '../theme';
import { TypographyProps } from '../../types/ui';
import { useSelector } from 'react-redux';
import { selectFont } from '@/features/webAccessibility/webAccessibilitySlice';

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
  const StyledTypography = styled
    .div(() => ({
      minWidth: 'fit-content',
      fontSize: size
        ? `${size + globalFontSize}px`
        : `${theme.fonts.size.sm + globalFontSize}px`,
      color: color ?? theme.colors.black,
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
