import Typography from '@/ui/atoms/Typography'
import theme from '@/ui/theme'

function EmploymentStatus({ employmentStatus }: { employmentStatus: string }) {
  return (
    <Typography
      variant="div"
      color={theme.colors.black}
      {...{ marginTop: '6px' }}
    >
      {employmentStatus!}
    </Typography>
  )
}

export default EmploymentStatus
