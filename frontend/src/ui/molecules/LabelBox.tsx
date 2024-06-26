import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { device } from '../theme';
import FlexBox from '../atoms/FlexBox';
import { LabelText } from '../atoms/LabelText';

function LabelBox({
  text,
  helpText,
  children,
  labelColor,
}: {
  width?: string;
  text: string;
  helpText?: string;
  children?: ReactNode;
  labelColor?: string;
}) {
  return (
    <StyledLabelBox>
      <LabelText labelColor={labelColor} text={text} helpText={helpText} />
      {children}
    </StyledLabelBox>
  );
}

const StyledLabelBox = styled.div(({ width }: { width?: string }) => ({
  width: width ?? '100%',
  [device('tablet')]: {
    width: '100%',
  },
}));

export default LabelBox;
