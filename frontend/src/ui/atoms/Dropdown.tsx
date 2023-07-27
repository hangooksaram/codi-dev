import { useState } from "react";
import theme from "@/ui/theme";
import { Dropdown } from "@/ui/ui";
import styled from "@emotion/styled";
import OpenDropdown from "@icons/common/expand-open.svg";
import Card from "./Card";
import Checkbox from "./Checkbox";
import Button from "./Button";
import FlexBox from "./FlexBox";

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

const DropdownGridContent = ({
  categories,
  handleClick,
}: {
  categories: string[] | number[];
  handleClick: Function;
}) => {
  return (
    <DropdownGridCard>
      <FlexBox
        justifyContent="flex-start"
        width="100%"
        isWrap
        columnGap="80px"
        rowGap="22px"
      >
        {categories.map((category, index) => (
          <Checkbox
            width="20%"
            label={category}
            key={`${index}-${category}`}
            handleClick={handleClick}
          />
        ))}
      </FlexBox>
    </DropdownGridCard>
  );
};

const DropdownListContent = ({
  categories,
  handleClick,
}: {
  categories: string[] | number[];
  handleClick: Function;
}) => {
  return (
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
  );
};

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

const DropDownList = styled.ul(({ width }: { width?: string }) => ({
  width: width ?? "100%",
  minWidth: "fit-content",
  maxHeight: "250px",
  overflow: "auto",
  position: "absolute",
  zIndex: 1,
  top: "70px",
  padding: "0px 10px",
  backgroundColor: theme.colors.white,
  borderRadius: "10px",
  listStyle: "none",
  border: `1px solid ${theme.colors.gray.main}`,
}));

const DropdownGridCard = styled(Card)(() => ({
  width: "100%",
  height: "auto",
  minWidth: "fit-content",
  position: "absolute",
  zIndex: 1,
  top: "70px",
  padding: "40px",
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
export default Dropdown;
