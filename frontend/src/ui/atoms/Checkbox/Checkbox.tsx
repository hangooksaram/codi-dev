import theme from "@/ui/theme";
import EmptyCheckbox from "../../../../public/icons/empty-checkbox.svg";
import FileedCheckbox from "../../../../public/icons/filled-checkbox.svg";
import FlexBox from "../Layout/FlexBox";
import Typography from "../Typography/Typography";
import { useState } from "react";

const Checkbox = ({
  width,
  label,
  handleClick,
}: {
  width?: string;
  label: string | number;
  handleClick: Function;
}) => {
  const [checked, setChecked] = useState(false);

  const toggle = () => {
    handleClick(label);
    setChecked((prev) => !prev);
  };
  return (
    <FlexBox
      justifyContent="flex-start"
      alignItems="center"
      width={"fit-content"}
      columnGap="10px"
      {...{ minWidth: "150px" }}
    >
      <div style={{ width: "24px", height: "24px" }}>
        {checked ? (
          <FileedCheckbox onClick={toggle} fill={theme.colors.black} />
        ) : (
          <EmptyCheckbox onClick={toggle} fill={theme.colors.gray.dark} />
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
};

export default Checkbox;
