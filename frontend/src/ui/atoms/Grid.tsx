import styled from '@emotion/styled'

const Grid = styled.div(
  ({
    width,
    gridTemplateColumns,
    gridTemplateRows,
    gridAutoColumns,
    gridAutoRows,
    columnGap,
    rowGap,
  }: {
    width?: string
    gridTemplateColumns?: string
    gridTemplateRows?: string
    gridAutoColumns?: string
    gridAutoRows?: string
    columnGap?: string
    rowGap?: string
  }) => ({
    display: 'grid',
    width: width ?? '100%',
    gridTemplateColumns,
    gridTemplateRows,
    gridAutoColumns,
    gridAutoRows,
    columnGap,
    rowGap,
  }),
)

export default Grid
