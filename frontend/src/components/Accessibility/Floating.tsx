import Button from "@/ui/atoms/Button";
import FloatIcon from "@icons/common/float.svg";
import theme, { device } from "@/ui/theme";
import styled from "@emotion/styled";
import Card from "@/ui/atoms/Card";
import Typography from "@/ui/atoms/Typography";
import FlexBox from "@/ui/atoms/FlexBox";
import { useEffect, useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  initializeAll,
  selectFocused,
  selectHighlight,
  selectLetterSpacing,
  selectLineHeight,
  selectZoom,
  setFocused,
  setHighlight,
  setLetterSpacing,
  setLineHeight,
  setZoom,
} from "@/features/webAccessibility/webAccessibliitySlice";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";

const BOX_LIST = ["하이라이터", "포커싱 박스"];

const Floating = () => {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  if (path === "/signin/") return;

  return (
    <StyledFloating.ExternalContainer>
      <StyledFloating.Container>
        <Button
          onClick={() => setOpen((prev) => !prev)}
          variant="round"
          width="110px"
          color={theme.colors.primary}
        >
          <FloatIcon />
        </Button>
        {open && <FloatingMenu />}
      </StyledFloating.Container>
    </StyledFloating.ExternalContainer>
  );
};

const FloatingMenu = () => {
  const dispatch = useDispatch();
  const highlight = useSelector(selectHighlight);
  const focused = useSelector(selectFocused);
  const letterSpacing = useSelector(selectLetterSpacing);
  const lineHeight = useSelector(selectLineHeight);
  const zoom = useSelector(selectZoom);
  const applyOption = (type: string) => {
    if (type === "하이라이터") {
      dispatch(setHighlight());
      return;
    }
    dispatch(setFocused());
  };

  const initializeOption = () => {
    dispatch(initializeAll());
  };
  return (
    <StyledFloating.Menu color={theme.colors.primary}>
      <FlexBox direction="column" rowGap="40px" alignItems="flex-start">
        <Typography
          variant="div"
          color={theme.colors.white}
          size={theme.fonts.size.md}
          weight={theme.fonts.weight.extraBold}
        >
          사용성 옵션
        </Typography>
        <StyledFloating.InitializeButton
          size="small"
          variant="default"
          onClick={initializeOption}
          color={theme.colors.gray.main}
        >
          초기화
        </StyledFloating.InitializeButton>

        <>
          <Typography
            variant="div"
            color={theme.colors.white}
            size={theme.fonts.size.sm}
          >
            강조 표시 및 포커스
          </Typography>

          <FlexBox columnGap="21px">
            <StyledFloating.Button
              variant="default"
              color={highlight ? theme.colors.white : theme.colors.primary}
              onClick={() => applyOption("하이라이터")}
            >
              하이라이터
            </StyledFloating.Button>
            <StyledFloating.Button
              variant="default"
              color={focused ? theme.colors.white : theme.colors.primary}
              onClick={() => applyOption("포커싱박스")}
            >
              포커싱박스
            </StyledFloating.Button>
          </FlexBox>
        </>
        <>
          <Typography variant="div" color={theme.colors.white}>
            가독성
          </Typography>
          <FlexBox direction="column" rowGap="20px">
            <FlexBox justifyContent="flex-start" columnGap="10px">
              <Typography
                variant="div"
                color={theme.colors.white}
                {...{ minWidth: "90px" }}
              >
                자간
              </Typography>
              <Button
                outline
                variant="default"
                size="small"
                color={
                  letterSpacing === "initial"
                    ? theme.colors.white
                    : theme.colors.primary
                }
                onClick={() => dispatch(setLetterSpacing("initial"))}
              >
                기본값
              </Button>
              <Button
                outline
                size="small"
                color={
                  letterSpacing === "1px"
                    ? theme.colors.white
                    : theme.colors.primary
                }
                onClick={() => dispatch(setLetterSpacing("1px"))}
                variant="default"
              >
                크게
              </Button>
            </FlexBox>
            <FlexBox justifyContent="flex-start" columnGap="10px">
              <Typography
                variant="div"
                color={theme.colors.white}
                {...{ minWidth: "90px" }}
              >
                행간
              </Typography>
              <Button
                outline
                size="small"
                color={
                  lineHeight === 1 ? theme.colors.white : theme.colors.primary
                }
                onClick={() => dispatch(setLineHeight(1))}
                variant="default"
              >
                기본값
              </Button>
              <Button
                outline
                size="small"
                color={
                  lineHeight !== 1 ? theme.colors.white : theme.colors.primary
                }
                onClick={() => dispatch(setLineHeight(1.2))}
                variant="default"
              >
                크게
              </Button>
            </FlexBox>
            <FlexBox justifyContent="flex-start" columnGap="10px">
              <Typography
                variant="div"
                color={theme.colors.white}
                {...{ minWidth: "90px" }}
              >
                페이지확대
              </Typography>
              <Button
                outline
                size="small"
                color={zoom === 1 ? theme.colors.white : theme.colors.primary}
                onClick={() => dispatch(setZoom(1))}
                variant="default"
              >
                기본값
              </Button>
              <Button
                outline
                size="small"
                color={zoom === 1.1 ? theme.colors.white : theme.colors.primary}
                onClick={() => dispatch(setZoom(1.1))}
                variant="default"
              >
                크게
              </Button>
              <Button
                outline
                size="small"
                color={zoom === 1.2 ? theme.colors.white : theme.colors.primary}
                onClick={() => dispatch(setZoom(1.2))}
                variant="default"
              >
                최대
              </Button>
            </FlexBox>
          </FlexBox>
        </>
      </FlexBox>
    </StyledFloating.Menu>
  );
};

const StyledFloating = {
  ExternalContainer: styled.div({
    position: "fixed",
    zIndex: 2,
    bottom: "20px",
    left: "20px",
    letterSpacing: "initial !important",
    lineHeight: "1 !important",
    zoom: "1 !important",
    [device("tablet")]: {
      bottom: "150px",
    },
  }),
  Container: styled.div({
    position: "relative",
  }),
  Menu: styled(Card)({
    position: "absolute",

    width: "420px",
    height: "auto",
    bottom: "150px",
    padding: "30px",
  }),
  Button: styled(Button)({
    width: "96px",
    height: "96px",
    padding: "10px",
    borderRadius: "20px",
    boxShadow: `4px 4px 4px 0px #28364D, 2px 2px 4px 0px #2D3C52 inset, -1px -1px 2px 0px #2E3D53`,
  }),
  InitializeButton: styled(Button)({
    position: "absolute",
    top: "20px",
    right: "30px",
    color: theme.colors.black,
  }),
};

export default Floating;
