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
  adornment,
}: {
  width?: string
  text: string
  helpText?: string
  children?: ReactNode
  adornment?: JSX.Element
}) {
  return (
    <StyledLabelBox>
      <FlexBox justifyContent="space-between" alignItems="flex-start">
        <ContentText text={text} helpText={helpText} />
        {adornment}
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
