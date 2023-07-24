import theme from "@/ui/theme";
import styled from "@emotion/styled";
import Container from "./Container";
import { ReactNode } from "react";

const Layout = styled.div`
  width: 100%;
  background-color: ${theme.colors.white};
  height: auto;
  padding: 50px 0px;
`;

export const PageComponentLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Layout>
      <Container>{children}</Container>
    </Layout>
  );
};
