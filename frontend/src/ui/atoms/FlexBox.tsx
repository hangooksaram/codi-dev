import styled from '@emotion/styled';
import { FlexBoxProps } from '../../types/ui';

const FlexBox = styled.div(
  ({
    width,
    direction,
    justifyContent,
    alignItems,
    rowGap,
    columnGap,
    children,
    isWrap,
    ...rest
  }: FlexBoxProps) => ({
    display: 'flex',
    width: width ?? '100%',
    flexDirection: direction ?? 'row',
    justifyContent: justifyContent ?? 'center',
    alignItems: alignItems ?? 'center',
    flexWrap: isWrap ? 'wrap' : 'nowrap',
    rowGap,
    columnGap,
    ...rest,
  }),
);

export default FlexBox;
