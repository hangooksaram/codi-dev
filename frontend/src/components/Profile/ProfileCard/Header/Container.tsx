import styled from '@emotion/styled'
import { ReactNode } from 'react'
import FlexBox from '@/ui/atoms/FlexBox'

const RelativeContainer = styled(FlexBox)(({}) => ({
  justifyContent: 'space-between',
  position: 'relative',
}))

const AbsoluteRelativeContainer = styled.div`
  width: 100%;
  position: absolute;
`

function Container({ children }: { children: ReactNode }) {
  return (
    <AbsoluteRelativeContainer>
      <RelativeContainer>{children}</RelativeContainer>
    </AbsoluteRelativeContainer>
  )
}

export default Container
