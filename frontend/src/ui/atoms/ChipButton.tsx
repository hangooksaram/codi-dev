import styled from '@emotion/styled'
import Chip from './Chip'
import Button from './Button'
import theme from '../theme'

const StyledChipButton = Chip.withComponent('button')

const ChipButton = styled(Button)({
  ':disabled': {
    backgroundColor: theme.colors.white,
    color: theme.colors.gray.main,
    cursor: 'default',
  },
})

export default ChipButton
