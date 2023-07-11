import theme from "@/ui/theme";
import styled from "@emotion/styled";

const Textarea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 20px;
  border: 1px solid ${theme.colors.gray.main};
  color: ${theme.colors.gray.dark};
  font-size: ${theme.fonts.size.sm};
  font-weight: ${theme.fonts.weight.regular};
  resize: none;
  border-radius: 10px;
  outline: none;
`;

export default Textarea;
