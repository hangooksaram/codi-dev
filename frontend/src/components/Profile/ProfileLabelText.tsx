import FlexBox from "@/ui/atoms/FlexBox";
import Typography from "@/ui/atoms/Typography";
import theme from "@/ui/theme";

const ProfileLabelText = ({
  name,
  value,
}: {
  name: string;
  value?: string;
}) => (
  <FlexBox justifyContent="flex-start">
    <Typography
      variant="div"
      color={theme.colors.gray.main}
      {...{
        minWidth: "96px",
      }}
    >
      {name}
    </Typography>
    <Typography
      variant="div"
      {...{
        minWidth: "240px",
        width: "240px",
      }}
    >
      {!value ? "-" : value}
    </Typography>
  </FlexBox>
);

export default ProfileLabelText;
