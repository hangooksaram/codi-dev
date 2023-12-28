import { RefObject, forwardRef } from "react";
import theme from "@/ui/theme";
import { Dropdown } from "@/types/ui";
import styled from "@emotion/styled";
import OpenDropdown from "@icons/common/expand-open.svg";
import Card from "./Card";
import Button from "./Button";
import { useDropdown } from "@/hooks/useDropdown";
import useClickOutOfInput from "@/hooks/useClickOutOfInput";

const Dropdown = ({
  id,
  width,
  title,
  type,
  contentType = "list",
  categories,
  invalid,
  selectedCategory,
  children,
  setSelectedCategory,
}: Dropdown) => {
  const { open, setOpen, ref, setCategory, setDropdownContentPosition } =
    useDropdown(setSelectedCategory, id);

  useClickOutOfInput(id!, setOpen);
  return (
    <>
      <DropDownListContainer width={width}>
        {type === "menu" ? (
          <div id={id} onClick={() => setOpen((prev) => !prev)}>
            {children}
          </div>
        ) : (
          <DropdownButton
            id={id}
            invalid={invalid}
            width="100%"
            color={theme.colors.white}
            onClick={setDropdownContentPosition}
            variant="square"
            type="button"
            role="tab"
            hoverDisabled
          >
            {selectedCategory ? selectedCategory : title}
            <OpenDropdown />
          </DropdownButton>
        )}

        {open &&
          (contentType === "list" ? (
            <DropdownListContent
              ref={ref! as RefObject<HTMLUListElement>}
              categories={categories}
              setCategory={setCategory}
            />
          ) : (
            <DropdownGridContent
              ref={ref! as RefObject<HTMLDivElement>}
              categories={categories}
              setCategory={setCategory}
            />
          ))}
      </DropDownListContainer>
    </>
  );
};

const DropdownGridContent = forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ categories, setCategory }, ref) => {
    return (
      <DropdownGridCard ref={ref!}>
        {/* <FlexBox
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
              handleClick={setCategory}
            />
          ))}
        </FlexBox> */}
      </DropdownGridCard>
    );
  }
);

interface DropdownContentProps {
  categories: string[] | number[];
  setCategory: Function;
}

const DropdownListContent = forwardRef<HTMLUListElement, DropdownContentProps>(
  ({ categories, setCategory }, ref) => {
    return (
      <DropDownList ref={ref} width="100%">
        {categories.map((category, index) => (
          <div key={`${index}-${category}`}>
            <DropdownItem onClick={() => setCategory(category)}>
              {category}
            </DropdownItem>
            {index < categories.length - 1 && <Divider />}
          </div>
        ))}
      </DropDownList>
    );
  }
);

export const DropDownListContainer = styled.div(
  ({ width }: { width?: string }) => ({
    width: width,
    minWidth: "fit-content",
    position: "relative",
  })
);

export const DropdownButton = styled(Button)(
  ({ invalid }: { invalid: boolean | undefined }) => ({
    justifyContent: "space-between",
    border: "1px solid",
    borderColor:
      invalid === true && invalid !== undefined
        ? theme.colors.error
        : theme.colors.gray.main,
  })
);

const DropDownList = styled.ul(
  ({ width, left }: { width?: string; left?: boolean }) => ({
    width: width ?? "100%",
    minWidth: "fit-content",
    maxHeight: "250px",
    // height: "250px",
    overflow: "auto",
    position: "absolute",
    zIndex: 1,
    top: "70px",

    right: left ? "0px" : "0px",

    marginBottom: "20px",
    backgroundColor: theme.colors.white,
    borderRadius: "10px",
    listStyle: "none",
    border: `1px solid ${theme.colors.gray.main}`,
    overscrollBehavior: "none",
  })
);

const DropdownGridCard = styled(Card)(() => ({
  width: "100%",
  height: "auto",
  minWidth: "fit-content",
  position: "absolute",
  zIndex: 1,
  top: "70px",
  padding: "40px",
}));

const DropdownItem = styled.button`
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0px 20px;
  width: 100%;
  min-width: 130px;
  color: ${theme.colors.black};
  font-size: ${theme.fonts.size.sm};
  font-weight: ${theme.fonts.weight.regular};
  background-color: ${theme.colors.white};
  border: none;
  cursor: pointer;
  :hover {
    background-color: ${theme.colors.background};
  }
  :focus {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
  }
`;

const Divider = styled.div`
  width: 90%;
  margin: 0 auto;
  height: 2px;
  background-color: ${theme.colors.background};
`;
export default Dropdown;
