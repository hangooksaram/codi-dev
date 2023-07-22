import { useState } from "react";
import Button from "../Button/Button";
import theme from "@/ui/theme";
import { Dropdown } from "@/ui/ui";
import styled from "@emotion/styled";
import OpenDropdown from "../../../../public/icons/expand-open.svg";
import DropdownListContent from "./DropdownListContent";
import DropdownGridContent from "./DropdownGridContent";

const DropDownListContainer = styled.div(({ width }: { width?: string }) => ({
  width: width,
  minWidth: "fit-content",
  position: "relative",
}));

const DropdownButton = styled(Button)(
  ({ invalid }: { invalid: boolean | undefined }) => ({
    justifyContent: "space-between",
    border: "1px solid",
    borderColor:
      invalid === true && invalid !== undefined
        ? theme.colors.error
        : theme.colors.gray.main,
  })
);

const Dropdown = ({
  width,
  title,
  type,
  contentType = "list",
  categories,
  invalid,
  selectedCategory,
  setSelectedCategory,
}: Dropdown) => {
  const [open, setOpen] = useState(false);
  const handleClick = (category: string | number) => {
    setOpen(false);
    setSelectedCategory(category);
  };

  return (
    <DropDownListContainer width={width}>
      <DropdownButton
        invalid={invalid}
        width="100%"
        color={theme.colors.white}
        onClick={() => setOpen((prev) => !prev)}
        variant="square"
        type="button"
      >
        {selectedCategory ? selectedCategory : title}
        <OpenDropdown />
      </DropdownButton>
      {open &&
        (contentType === "list" ? (
          <DropdownListContent
            categories={categories}
            handleClick={handleClick}
          />
        ) : (
          <DropdownGridContent
            categories={categories}
            handleClick={handleClick}
          />
        ))}
    </DropDownListContainer>
  );
};

export default Dropdown;
