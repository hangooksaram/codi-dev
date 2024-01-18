import FlexBox from "../atoms/FlexBox";
import Button from "../atoms/Button";
import theme from "../theme";
import styled from "@emotion/styled";
import RightIcon from "../../../public/icons/common/right-arrow.svg";
import LeftIcon from "../../../public/icons/common/left-arrow.svg";
import ImageComponent from "../atoms/ImageComponent";
import StyledImage from "../atoms/StyledImage";

const Pagination = ({
  isStart,
  goNext,
  goPrev,
  currentPages,
  current,
  setCurrent,
  isNext,
  onClickCurrentPage,
}: {
  isStart: Function;
  goNext: Function;
  goPrev: Function;
  currentPages: number[];
  current: number;
  setCurrent: Function;
  isNext: Function;
  onClickCurrentPage: Function;
}) => {
  return (
    <FlexBox rowGap="8px">
      {isStart() && (
        <NavigateButton
          variant="square"
          size="small"
          outline
          color={theme.colors.white}
          onClick={() => goPrev()}
        >
          이전
          <LeftIcon width={20} height={20} fill={theme.colors.gray.main} />
        </NavigateButton>
      )}
      {currentPages.map((page) => (
        <PageButton
          variant="square"
          key={page}
          color={
            page === current ? theme.colors.primary.main : theme.colors.white
          }
          onClick={() => {
            setCurrent(page);
            onClickCurrentPage(page);
          }}
        >
          {page}
        </PageButton>
      ))}

      {isNext() && (
        <NavigateButton
          size="small"
          outline
          variant="square"
          color={theme.colors.white}
          onClick={() => goNext()}
        >
          다음
          <RightIcon width={20} height={20} fill={theme.colors.gray.main} />
        </NavigateButton>
      )}
    </FlexBox>
  );
};

const PageButton = styled(Button)(({}) => ({
  width: "39px",
  height: "39px",
}));

const NavigateButton = styled(Button)(({}) => ({}));

export default Pagination;
