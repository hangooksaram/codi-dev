import Typography from '@/ui/atoms/Typography';
import theme from '@/ui/theme';

function Job({ job }: { job: string }) {
  return (
    <Typography
      variant="div"
      size={theme.fonts.size.xs}
      color={theme.colors.text.strong}
      {...{ marginTop: '6px' }}
    >
      {job!}
    </Typography>
  );
}

export default Job;
