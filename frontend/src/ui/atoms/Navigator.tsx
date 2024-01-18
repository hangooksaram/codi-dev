import styled from '@emotion/styled'
import Link from 'next/link'
import theme from '../theme'

const Navigator = styled(Link)(({ current }: { current?: boolean }) => ({
  display: 'flex',
  cursor: 'pointer',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  backgroundColor: current ? theme.colors.primary.main : theme.colors.white,

  ':hover': !current
    ? {
        backgroundColor: theme.colors.background,
        color: theme.colors.primary.main,
      }
    : {},
}))

export const TopNavigator = styled(Navigator)(({ current }) => ({
  height: '100%',
  width: '159px',
  alignItems: 'center',

  color: current ? theme.colors.white : theme.colors.black,
}))

export const SideNavigator = styled(Navigator)(
  ({
    current,
    nested,
    nestedParent,
  }: {
    current?: boolean
    nested?: number
    nestedParent?: boolean
  }) => ({
    width: '244px',
    height: '64px',
    paddingLeft: nested ? `${40 * nested}px` : '40px',
    color: nestedParent
      ? theme.colors.primary.main
      : current
        ? theme.colors.white
        : theme.colors.gray.main,
  }),
)

export default Navigator
