import {
  toggleFontSize,
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
import FlexBox from '@/ui/atoms/FlexBox';
import { StyledFloating } from '@/ui/atoms/Floating';
import ImageComponent from '@/ui/atoms/ImageComponent';
import Typography from '@/ui/atoms/Typography';
import theme from '@/ui/theme';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import highlightImage from '@images/webAccessibility/highlight.png';
import focusingboxImage from '@images/webAccessibility/focusingbox.png';
import { SetState } from '@/index';
import Button from '@/ui/atoms/Button';
import Toggle from 'react-toggle';
import { useEffect, useState } from 'react';
import 'react-toggle/style.css';
import VisualOption from './Options/Visual';
import RetinalOption from './Options/Retinal';

type OptionState = 'on' | 'off' | 'initial';

export default function AccessibilityMenu({
  setOpen,
}: {
  setOpen: SetState<boolean>;
}) {
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
    <StyledFloating.Menu color={theme.colors.primary.normal}>
      <FlexBox direction="column" rowGap="40px" alignItems="flex-start">
        <Typography
          variant="div"
          color={theme.colors.primary.text}
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
            color={theme.colors.primary.text}
            size={theme.fonts.size.sm}
          >
            강조 표시 및 포커스
          </Typography>

          <FlexBox columnGap="21px">
            <StyledFloating.Button
              variant="default"
              color={
                highlight
                  ? theme.colors.primary.text
                  : theme.colors.primary.normal
              }
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
              color={
                focused
                  ? theme.colors.primary.text
                  : theme.colors.primary.normal
              }
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
          <VisualOption />
          <RetinalOption />
          <Typography variant="div" color={theme.colors.primary.text}>
            가독성
          </Typography>
          <FlexBox direction="column" rowGap="20px">
            <FlexBox justifyContent="flex-start" columnGap="10px">
              <Typography
                variant="div"
                color={theme.colors.primary.text}
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
                    ? theme.colors.primary.text
                    : theme.colors.primary.normal
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
                    ? theme.colors.primary.text
                    : theme.colors.primary.normal
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
                color={theme.colors.primary.text}
                {...{ minWidth: '90px' }}
              >
                행간
              </Typography>
              <Button
                outline
                size="small"
                color={
                  lineHeight === 1
                    ? theme.colors.primary.text
                    : theme.colors.primary.normal
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
                    ? theme.colors.primary.text
                    : theme.colors.primary.normal
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
                color={theme.colors.primary.text}
                {...{ minWidth: '90px' }}
              >
                페이지확대
              </Typography>
              <Button
                outline
                size="small"
                color={
                  zoom === 1
                    ? theme.colors.primary.text
                    : theme.colors.primary.normal
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
                  zoom === 1.1
                    ? theme.colors.primary.text
                    : theme.colors.primary.normal
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
                  zoom === 1.2
                    ? theme.colors.primary.text
                    : theme.colors.primary.normal
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
              color={theme.colors.primary.text}
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
