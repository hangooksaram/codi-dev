import theme from "@/ui/theme";
import styled from "@emotion/styled";

const Container = styled.main(({ width }: { width?: string }) => ({
  width: width ?? "90%",
  margin: "0 auto",
}));

export const FormContainer = styled(Container)`
  width: 50%;
  max-width: 640px;
  padding-bottom: 80px;
`;

export default Container;
