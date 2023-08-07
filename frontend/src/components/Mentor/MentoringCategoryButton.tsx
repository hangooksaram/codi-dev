import Button from "@/ui/atoms/Button";
import theme from "@/ui/theme";
import styled from "@emotion/styled";
const MentorCategoryButton = styled(Button)(
  ({ selected }: { selected: boolean }) => ({
    width: "100px",
    height: "100px",
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    borderRadius: "10px",
    border: `1px solid ${theme.colors.gray.light}`,
    background: selected ? theme.colors.primary : theme.colors.white,
    boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.04)",
    color: selected ? theme.colors.white : theme.colors.primary,
  })
);

export default MentorCategoryButton;
