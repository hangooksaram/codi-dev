import Typography from "@/ui/atoms/Typography";
import theme from "@/ui/theme";

const EmploymentStatus = ({
  employmentStatus,
}: {
  employmentStatus: string;
}) => (
  <Typography
    variant="div"
    color={theme.colors.black}
    {...{ marginTop: "6px" }}
  >
    {employmentStatus!}
  </Typography>
);

export default EmploymentStatus;
