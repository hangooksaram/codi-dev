import {
  selectLetterSpacing,
  selectLineHeight,
  selectZoom,
  setLetterSpacing,
  setLineHeight,
  setZoom,
} from '@/features/accessibility/accessibilitySlice';
import Button from '@/ui/atoms/Button';
import FlexBox from '@/ui/atoms/FlexBox';
import { StyledFloating } from '@/ui/atoms/Floating';
import theme from '@/ui/theme';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import OptionTypography from '../OptionTypography';

const Personalize = () => {
  const letterSpacing = useSelector(selectLetterSpacing);
  const lineHeight = useSelector(selectLineHeight);
  const zoom = useSelector(selectZoom);
  const dispatch = useDispatch();
  return (
    <>
      <OptionTypography variant="div" color={theme.colors.primary.text}>
        가독성
      </OptionTypography>
      <FlexBox direction="column" rowGap="20px">
        <FlexBox justifyContent="flex-start" columnGap="10px">
          <OptionTypography
            variant="div"
            color={theme.colors.primary.text}
            {...{ minWidth: '90px' }}
          >
            자간
          </OptionTypography>
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
          <OptionTypography
            variant="div"
            color={theme.colors.primary.text}
            {...{ minWidth: '90px' }}
          >
            행간
          </OptionTypography>
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
          <OptionTypography
            variant="div"
            color={theme.colors.primary.text}
            {...{ minWidth: '90px' }}
          >
            페이지확대
          </OptionTypography>
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
      </FlexBox>
    </>
  );
};
