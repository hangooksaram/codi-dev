import styled from "@emotion/styled";
import Card from "../Card/Card";
import Checkbox from "../Checkbox/Checkbox";
import FlexBox from "../Layout/FlexBox";

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

const DropdownGridCard = styled(Card)(() => ({
  width: "100%",
  height: "auto",
  minWidth: "fit-content",
  position: "absolute",
  zIndex: 1,
  top: "70px",
  padding: "40px",
}));

export default DropdownGridContent;
