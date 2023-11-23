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
import Overlay from "@/ui/atoms/BackgroundOverlay";
import ImageComponent from "@/ui/atoms/ImageComponent";
import highlightImage from "@images/webAccessibility/highlight.png";
import focusingboxImage from "@images/webAccessibility/focusingbox.png";
import { SetState } from "@/index";

const BOX_LIST = ["하이라이터", "포커싱 박스"];

const Floating = () => {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  if (path === "/signin/") return;

  return (
    <>
      <StyledFloating.OpenButton
        onClick={() => setOpen((prev) => !prev)}
        variant="round"
        width="110px"
        color={theme.colors.primary}
      >
        <FloatIcon />
      </StyledFloating.OpenButton>
      {open && (
        <Overlay
          onClick={() => {
            setOpen(false);
          }}
        />
      )}
      {open && <FloatingMenu setOpen={setOpen} />}
    </>
  );
};

const FloatingMenu = ({ setOpen }: { setOpen: SetState<boolean> }) => {
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
              <ImageComponent
                width="36px"
                height="auto"
                alt="하이라이트"
                src={highlightImage}
              ></ImageComponent>
              하이라이터
            </StyledFloating.Button>
            <StyledFloating.Button
              variant="default"
              color={focused ? theme.colors.white : theme.colors.primary}
              onClick={() => applyOption("포커싱박스")}
            >
              <ImageComponent
                width="36px"
                height="auto"
                alt="하이라이트"
                src={focusingboxImage}
              ></ImageComponent>
              <div>포커싱박스</div>
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
            <StyledFloating.CloseButton
              variant="default"
              width="100%"
              color={theme.colors.white}
              onClick={() => {
                setOpen(false);
              }}
            >
              닫기
            </StyledFloating.CloseButton>
          </FlexBox>
        </>
      </FlexBox>
    </StyledFloating.Menu>
  );
};

const StyledFloating = {
  OpenButton: styled(Button)(({}) => ({
    position: "fixed",
    zIndex: 2,
    bottom: "20px",
    left: "20px",
    letterSpacing: "initial !important",
    lineHeight: "1 !important",
    zoom: "1 !important",

    width: "110px",
    [device("tablet")]: {
      width: "84px",
      height: "84px",

      bottom: "148px",
    },
  })),
  CloseButton: styled(Button)(({}) => ({
    display: "none",
    [device("mobile")]: {
      display: "block",
    },
  })),

  Menu: styled(Card)({
    position: "absolute",
    zIndex: "2",
    width: "420px",
    height: "auto",
    bottom: "150px",
    padding: "30px",
    left: "20px",
    overflow: "auto",
    [device("tablet")]: {
      position: "fixed",
      width: "100%",
      top: "0",
      left: "0",
      height: "calc(100vh - 128px);",
      padding: "30px",
      borderRadius: 0,
    },
  }),
  Button: styled(Button)({
    width: "96px",
    height: "96px",
    padding: "10px",
    borderRadius: "20px",
    boxShadow: `4px 4px 4px 0px #28364D, 2px 2px 4px 0px #2D3C52 inset, -1px -1px 2px 0px #2E3D53`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    [device("mobile")]: {
      fontSize: theme.fonts.size.xs,
    },
  }),
  InitializeButton: styled(Button)({
    position: "absolute",
    top: "20px",
    right: "30px",
    color: theme.colors.black,
  }),
};

export default Floating;
