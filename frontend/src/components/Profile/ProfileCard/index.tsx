import styled from '@emotion/styled'
import Card from '@/ui/atoms/Card'
import FlexBox from '@/ui/atoms/FlexBox'

import { ProfileCard } from '@/types/profile'
import theme, { device } from '@/ui/theme'
import StyledImage from '@/ui/atoms/StyledImage'

function ProfileCard({ width, height, children }: ProfileCard) {
  return (
    <CardContainer width={width} height={height} padding="10px 10px 40px 10px">
      <FlexBox
        direction="column"
        justifyContent="space-between"
        {...{ height: '100%', position: 'relative' }}
      >
        {children}
      </FlexBox>
    </CardContainer>
  )
}

const CardContainer = styled(Card)(() => ({
  background: theme.colors.white,
  [device('mdWeb')]: {
    backgroundPosition: 'top',
  },
  [device('tablet')]: {
    width: '100%',
  },
  backgroundPosition: 'center',
  backgroundSize: 'cover',

  // border: "none",
  borderColor: '#D2E6FE',
  padding: '24px',
}))

export const Header = styled(FlexBox)(({}) => ({
  justifyContent: 'space-between',
  position: 'relative',
}))

export const Content = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Footer = styled.div``

export default ProfileCard
