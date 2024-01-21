import styled from '@emotion/styled'
import theme from '../theme'
import { Typography } from '../../types/ui'

function Typography({
  variant,
  size,
  color,
  weight,
  align,
  children,
  wordBreak,
  ...rest
}: Typography) {
  const StyledTypography = styled
    .div(() => ({
      minWidth: 'fit-content',
      fontSize: size ?? '16px',
      color: color ?? theme.colors.black,
      textAlign: align ?? 'left',
      height: 'fit-content',
      fontWeight: weight ?? theme.fonts.weight.regular,
      wordBreak: wordBreak ?? 'break-word',
      ...rest,
    }))
    .withComponent(variant)
  return <StyledTypography>{children}</StyledTypography>
}

export default Typography
