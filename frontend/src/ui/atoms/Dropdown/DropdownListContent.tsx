import styled from "@emotion/styled";
import theme from "../../theme";

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

export default DropdownListContent;
