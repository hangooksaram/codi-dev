import styled from "@emotion/styled";
import Button from "../Button/Button";
import { ReactNode } from "react";
import theme from "../theme";

const Chip = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 31px;
  padding: 0px 20px;
  width: fit-content;
  font-size: ${theme.fonts.size.xs};
  background-color: ${theme.colors.background};
  color: ${theme.colors.info};
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  cursor: default;
`;

export default Chip;
