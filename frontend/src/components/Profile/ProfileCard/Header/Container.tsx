import FlexBox from "@/ui/atoms/FlexBox";
import styled from "@emotion/styled";
import { ReactNode } from "react";

const RelativeContainer = styled(FlexBox)(({}) => ({
  justifyContent: "space-between",
  position: "relative",
}));

const AbsoluteRelativeContainer = styled.div`
  width: 100%;
  position: absolute;
`;

const Container = ({ children }: { children: ReactNode }) => (
  <AbsoluteRelativeContainer>
    <RelativeContainer>{children}</RelativeContainer>
  </AbsoluteRelativeContainer>
);

export default Container;
