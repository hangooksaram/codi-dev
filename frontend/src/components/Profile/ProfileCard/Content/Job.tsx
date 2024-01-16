import Typography from "@/ui/atoms/Typography";
import theme from "@/ui/theme";

const Job = ({ job }: { job: string }) => (
  <Typography
    variant="div"
    size={theme.fonts.size.xs}
    color={theme.colors.black}
    {...{ marginTop: "6px" }}
  >
    {job!}
  </Typography>
);

export default Job;
