import styled from '@emotion/styled'
import theme from '../theme'
import { Card } from '@/types/ui'

const Card = styled.div(({ width, height, color, padding, ...rest }: Card) => ({
  width: width ?? '100%',
  height: height ?? '100%',
  backgroundColor: color ?? theme.colors.white,
  borderRadius: '20px',
  border: `1px solid ${theme.colors.gray.main}`,
  padding,
}))

export default Card
