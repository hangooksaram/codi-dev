import { LabelType } from "@/types/ui";
import FlexBox from "@/ui/atoms/FlexBox";
import { ContentText } from "@/ui/atoms/ContentText";
import styled from "@emotion/styled";

export const StyledContentTextContainer = styled.div`
  width: 100%;
`;

const ContentTextContainer = ({
  text,
  helpText,
  children,
  labelColor,
}: {
  text: string;
  helpText?: string;
  children?: React.ReactNode;
  labelColor?: string;
}) => {
  return (
    <StyledContentTextContainer>
      <ContentText text={text} helpText={helpText} labelColor={labelColor} />
      <FlexBox justifyContent="space-between">{children}</FlexBox>
    </StyledContentTextContainer>
  );
};

export default ContentTextContainer;
