import styled from "@emotion/styled";

const Container = styled.main(({ width }: { width?: string }) => ({
  width: width ?? "90%",
  margin: "0 auto",
}));

export default Container;
