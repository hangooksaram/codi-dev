import { ReactNode } from 'react'
import styled from '@emotion/styled'
import { ContentText } from '../atoms/ContentText'
import { device } from '../theme'
import FlexBox from '../atoms/FlexBox'

function LabelBox({
  width,
  text,
  helpText,
  children,
  adorement,
}: {
  width?: string
  text: string
  helpText?: string
  children?: ReactNode
  adorement?: JSX.Element
}) {
  return (
    <StyledLabelBox>
      <FlexBox justifyContent="space-between" alignItems="center">
        <ContentText text={text} helpText={helpText} />
        {adorement}
      </FlexBox>

      {children}
    </StyledLabelBox>
  )
}

const StyledLabelBox = styled.div(({ width }: { width?: string }) => ({
  width: width ?? '100%',
  [device('tablet')]: {
    width: '100%',
  },
}))

export default LabelBox
