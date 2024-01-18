"use client";

import theme from "@/ui/theme";
import styled from "@emotion/styled";
import { ReactNode } from "react";

const Layout = styled.div(({ color }) => ({
  width: "100%",

  backgroundColor: theme.colors.background,
  height: "calc(100vh - 59px)",
}));

const StyledSinglePageLayoutSinglePageLayout = styled.main(({}) => ({
  width: "69%",
  margin: "0 auto",
  padding: "50px 0px",
}));

const SinglePageLayout = ({ children }: { children: ReactNode }) => (
  <Layout>
    <StyledSinglePageLayoutSinglePageLayout>
      {children}
    </StyledSinglePageLayoutSinglePageLayout>
  </Layout>
);

export default SinglePageLayout;
