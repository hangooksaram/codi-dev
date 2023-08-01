import theme from "@/ui/theme";
import styled from "@emotion/styled";

export const dayPickerContainerStyle = {
  maxWidth: "482px",
  maxHeight: "590px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "20px",
  border: `1px solid ${theme.colors.gray.main}`,
  background: theme.colors.white,
  padding: "30px 43px",
};

export const CustomCaptionNavigation = styled.button`
  height: 24px;
  border: none;
  outline: none;
  background-color: transparent;
`;

export const CustomContentdates = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  size: ${theme.fonts.size.md};
  font-weight: ${theme.fonts.weight.regular};
  margin-bottom: 39px;
`;
