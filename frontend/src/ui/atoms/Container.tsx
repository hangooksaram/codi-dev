import theme, { device } from "@/ui/theme";
import styled from "@emotion/styled";

const Container = styled.main(({ width }: { width?: string }) => ({
  width: width ?? "69%",
  margin: "0 auto",
  [device("tablet")]: {
    width: "90%",
  },
}));

export const FormContainer = styled(Container)`
  width: 68%;
  max-width: 640px;
  padding-bottom: 80px;
`;

export default Container;
