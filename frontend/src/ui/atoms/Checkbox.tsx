import EmptyCheckbox from '@icons/common/empty-checkbox.svg';
import FileedCheckbox from '@icons/common/filled-checkbox.svg';
import { useState } from 'react';
import theme from '@/ui/theme';
import Typography from './Typography';
import FlexBox from './FlexBox';
import { SetState } from '@/index';

function Checkbox({
  width,
  label,
  checked,
  setChecked,
}: {
  width?: string;
  label: string | number;
  checked: boolean;
  setChecked: SetState<boolean>;
}) {
  const toggle = () => {
    setChecked(!checked);
  };
  return (
    <FlexBox
      justifyContent="flex-start"
      alignItems="center"
      width={width ?? 'fit-content'}
      columnGap="10px"
      {...{ minWidth: label ?? '150px' }}
      onClick={toggle}
    >
      <div style={{ width: '24px', height: '24px' }}>
        {checked ? (
          <FileedCheckbox fill={theme.colors.black} />
        ) : (
          <EmptyCheckbox fill={theme.colors.gray.dark} />
        )}
      </div>

      <Typography
        variant="label"
        size={theme.fonts.size.sm}
        color={theme.colors.gray.dark}
      >
        {label}
      </Typography>
    </FlexBox>
  );
}

export default Checkbox;
