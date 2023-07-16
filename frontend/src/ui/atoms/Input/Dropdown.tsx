import { useState } from "react";
import Button from "../Button/Button";
import theme from "@/ui/theme";
import { Dropdown } from "@/ui/ui";
import styled from "@emotion/styled";
import OpenDropdown from "../../../../public/icons/expand-open.svg";

const DropDownListContainer = styled.div(({ width }: { width?: string }) => ({
  width: width,
  minWidth: "fit-content",
  position: "relative",
}));

const DropDownList = styled.ul(({ width }: { width?: string }) => ({
  width: width ?? "100%",
  minWidth: "fit-content",
  position: "absolute",
  zIndex: 1,
  top: "70px",
  padding: "0px 10px",
  backgroundColor: theme.colors.white,
  borderRadius: "10px",
  listStyle: "none",
  border: `1px solid ${theme.colors.gray.main}`,
}));

const DropdownItem = styled.li`
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0px 21.5px;
  min-width: 130px;
  color: ${theme.colors.black};
  font-size: ${theme.fonts.size.sm};
  font-weight: ${theme.fonts.weight.regular};
  background-color: ${theme.colors.white};
  cursor: pointer;
`;

const Divider = styled.div`
  width: 90%;
  margin: 0 auto;
  height: 2px;
  background-color: ${theme.colors.background};
`;

const DropdownButton = styled(Button)`
  justify-content: space-between;
  border: 1px solid ${theme.colors.gray.main};
`;

const Dropdown = ({
  width,
  title,
  type,
  categories,
  selectedCategory,
  setSelectedCategory,
}: Dropdown) => {
  const [open, setOpen] = useState(false);
  const handleClick = (category: string) => {
    setOpen(false);
    setSelectedCategory(category);
  };
  return (
    <DropDownListContainer width={width}>
      <DropdownButton
        width="100%"
        color={theme.colors.white}
        onClick={() => setOpen((prev) => !prev)}
        variant="square"
        type="button"
      >
        {selectedCategory ? selectedCategory : title}
        <OpenDropdown />
      </DropdownButton>
      {open && (
        <DropDownList width="100%">
          {categories.map((category, index) => (
            <div key={`${index}-${category}`}>
              <DropdownItem onClick={() => handleClick(category)}>
                {category}
              </DropdownItem>
              {index < categories.length - 1 && <Divider />}
            </div>
          ))}
        </DropDownList>
      )}
    </DropDownListContainer>
  );
};

export default Dropdown;
