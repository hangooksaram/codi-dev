import styled from "@emotion/styled";

const Container = styled.main(({ width }: { width?: string }) => ({
  width: width ?? "90%",
  margin: "0 auto",
}));

export const FormContainer = styled(Container)`
  width: 50%;
  padding-bottom: 80px;
`;

export default Container;
