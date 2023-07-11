import { useState } from "react";
import Button from "../Button/Button";
import theme from "@/ui/theme";
import { Dropdown } from "@/ui/ui";
import styled from "@emotion/styled";
import OpenDropdown from "../../../../public/icons/expand-open.svg";

const DropDownListContainer = styled.div(({ width }: { width?: string }) => ({
  width: width,
  position: "relative",
}));

const DropDownList = styled.ul(({ width }: { width?: string }) => ({
  width: width ?? "100%",
  position: "absolute",
  zIndex: 1,
  top: "70px",
  padding: "0px 10px",
  backgroundColor: theme.colors.white,
  borderRadius: "10px",
  listStyle: "none",
}));

const DropdownItem = styled.li`
  padding: 21.5px 30px;
  color: ${theme.colors.black};
  font-size: ${theme.fonts.size.sm};
  font-weight: ${theme.fonts.weight.regular};
`;

const Divider = styled.div`
  width: 90%;
  margin: 0 auto;
  height: 2px;
  background-color: ${theme.colors.background};
  :last-child {
    display: none;
  }
`;

const DropdownButton = styled(Button)`
  justify-content: space-between;
  border: 1px solid ${theme.colors.gray.main};
`;

const Dropdown = ({ width, type, categories }: Dropdown) => {
  const [open, setOpen] = useState(false);
  return (
    <DropDownListContainer width={width}>
      <DropdownButton
        width={width}
        color={theme.colors.white}
        onClick={() => setOpen((prev) => !prev)}
        variant="square"
        type="button"
      >
        {type}
        <OpenDropdown />
      </DropdownButton>
      {open && (
        <DropDownList width={width}>
          {categories.map((category, index) => (
            <>
              <DropdownItem key={index}>{category}</DropdownItem>
              <Divider />
            </>
          ))}
        </DropDownList>
      )}
    </DropDownListContainer>
  );
};

export default Dropdown;
