import Chip from '@/ui/atoms/Chip';
import Typography from '@/ui/atoms/Typography';

function ApplicationDate({ applicationDate }: { applicationDate?: string }) {
  return (
    <Chip>
      <Typography variant="span">{applicationDate!}</Typography>
    </Chip>
  );
}

export default ApplicationDate;
