import Typography from '@/ui/atoms/Typography';
import theme from '@/ui/theme';

function Name({ name }: { name: string }) {
  return (
    <Typography
      variant="div"
      size={theme.fonts.size.lg}
      color={theme.colors.black}
      {...{ marginTop: '22px' }}
      weight={theme.fonts.weight.black}
    >
      {name!}
    </Typography>
  );
}

export default Name;
