import Chip from "@/ui/atoms/Chip";
import Typography from "@/ui/atoms/Typography";

const ApplicationDate = ({ applicationDate }: { applicationDate?: string }) => (
  <Chip>
    <Typography variant="span" size="sm">
      {applicationDate!}
    </Typography>
  </Chip>
);

export default ApplicationDate;
