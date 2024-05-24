import styled from '@emotion/styled';
import { TypographyProps } from '../../types/ui';
import { useSelector } from 'react-redux';
import { selectFont } from '@/features/accessibility/accessibilitySlice';
import theme from '@/ui/theme';

function OptionTypography({
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
      fontSize: size ? `${size}px` : `${theme.fonts.size.sm}px`,
      color: color ?? theme.colors.text.strong,
      textAlign: align ?? 'left',
      height: 'fit-content',
      fontWeight: weight ?? theme.fonts.weight.regular,
      wordBreak: wordBreak ?? 'break-word',
      ...rest,
    }))
    .withComponent(variant);
  return <StyledTypography>{children}</StyledTypography>;
}

export default OptionTypography;
