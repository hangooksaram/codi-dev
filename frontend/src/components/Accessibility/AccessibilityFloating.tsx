'use client';

import FloatIcon from '@icons/common/float.svg';
import styled from '@emotion/styled';
import { useEffect, useLayoutEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import highlightImage from '@images/webAccessibility/highlight.png';
import focusingboxImage from '@images/webAccessibility/focusingbox.png';
import Overlay from '@/ui/atoms/BackgroundOverlay';
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
} from '@/features/webAccessibility/webAccessibilitySlice';
import ImageComponent from '@/ui/atoms/ImageComponent';
import FlexBox from '@/ui/atoms/FlexBox';
import Typography from '@/ui/atoms/Typography';
import Card from '@/ui/atoms/Card';
import theme, { device } from '@/ui/theme';
import Button from '@/ui/atoms/Button';
import { SetState } from '@/index';
import { MOBILE_NAVIGATION_HEIGHT } from '@/constants';
import { StyledFloating } from '@/ui/atoms/Floating';

function AccessibilityFloating() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  if (path === '/signin/') return;

  return (
    <>
      <AccessibilityFloatingButton
        onClick={() => setOpen((prev) => !prev)}
        variant="round"
        width="110px"
        color={theme.colors.primary.main}
        hoverDisabled
      >
        <FloatIcon />
      </AccessibilityFloatingButton>
      {open && (
        <FloatingOverlay
          onClick={() => {
            setOpen(false);
          }}
        />
      )}
      {open && <FloatingMenu setOpen={setOpen} />}
    </>
  );
}

const FloatingOverlay = styled(Overlay)`
  z-index: 103;
`;

function FloatingMenu({ setOpen }: { setOpen: SetState<boolean> }) {
  const dispatch = useDispatch();
  const highlight = useSelector(selectHighlight);
  const focused = useSelector(selectFocused);
  const letterSpacing = useSelector(selectLetterSpacing);
  const lineHeight = useSelector(selectLineHeight);
  const zoom = useSelector(selectZoom);
  const applyOption = (type: string) => {
    if (type === '하이라이터') {
      dispatch(setHighlight());
      return;
    }
    dispatch(setFocused());
  };

  const initializeOption = () => {
    dispatch(initializeAll());
  };
  return (
    <StyledFloating.Menu color={theme.colors.primary.main}>
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
              color={highlight ? theme.colors.white : theme.colors.primary.main}
              onClick={() => applyOption('하이라이터')}
            >
              <ImageComponent
                width="36px"
                height="auto"
                alt="하이라이트"
                src={highlightImage}
              />
              하이라이터
            </StyledFloating.Button>
            <StyledFloating.Button
              variant="default"
              color={focused ? theme.colors.white : theme.colors.primary.main}
              onClick={() => applyOption('포커싱박스')}
            >
              <ImageComponent
                width="36px"
                height="auto"
                alt="하이라이트"
                src={focusingboxImage}
              />
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
                {...{ minWidth: '90px' }}
              >
                자간
              </Typography>
              <Button
                outline
                variant="default"
                size="small"
                color={
                  letterSpacing === 'initial'
                    ? theme.colors.white
                    : theme.colors.primary.main
                }
                onClick={() => dispatch(setLetterSpacing('initial'))}
              >
                기본값
              </Button>
              <Button
                outline
                size="small"
                color={
                  letterSpacing === '1px'
                    ? theme.colors.white
                    : theme.colors.primary.main
                }
                onClick={() => dispatch(setLetterSpacing('1px'))}
                variant="default"
              >
                크게
              </Button>
            </FlexBox>
            <FlexBox justifyContent="flex-start" columnGap="10px">
              <Typography
                variant="div"
                color={theme.colors.white}
                {...{ minWidth: '90px' }}
              >
                행간
              </Typography>
              <Button
                outline
                size="small"
                color={
                  lineHeight === 1
                    ? theme.colors.white
                    : theme.colors.primary.main
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
                  lineHeight !== 1
                    ? theme.colors.white
                    : theme.colors.primary.main
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
                {...{ minWidth: '90px' }}
              >
                페이지확대
              </Typography>
              <Button
                outline
                size="small"
                color={
                  zoom === 1 ? theme.colors.white : theme.colors.primary.main
                }
                onClick={() => dispatch(setZoom(1))}
                variant="default"
              >
                기본값
              </Button>
              <Button
                outline
                size="small"
                color={
                  zoom === 1.1 ? theme.colors.white : theme.colors.primary.main
                }
                onClick={() => dispatch(setZoom(1.1))}
                variant="default"
              >
                크게
              </Button>
              <Button
                outline
                size="small"
                color={
                  zoom === 1.2 ? theme.colors.white : theme.colors.primary.main
                }
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
}

const AccessibilityFloatingButton = styled(StyledFloating.OpenButton)(() => ({
  [device('mobile')]: {
    display: 'none',
  },
}));

export default AccessibilityFloating;
