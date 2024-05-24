import styled from '@emotion/styled';
import theme from '@/ui/theme';
import { borderStyle } from './Input';
import { TextareaProps } from '@/types/ui';

export const textareaStyle = `
width: 100%;
height: 300px;
padding: 20px;
border: 1px solid ${theme.colors.gray.main};
color: ${theme.colors.black};
::placeholder {
  color: ${theme.colors.gray.dark};
}
font-size: ${theme.fonts.size.sm}px;
font-weight: ${theme.fonts.weight.regular};
resize: none;
border-radius: 10px;
outline: none;
`;

const Textarea = styled.textarea(
  textareaStyle,
  ({ invalid, outline }: TextareaProps) => ({
    borderColor: borderStyle(invalid, outline),
  }),
);

export default Textarea;
