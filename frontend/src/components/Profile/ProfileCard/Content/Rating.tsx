import Star from '@icons/common/favorite.svg'
import FlexBox from '@/ui/atoms/FlexBox'
import Typography from '@/ui/atoms/Typography'
import theme from '@/ui/theme'

function Rating({ star, mentees }: { star: number; mentees: number }) {
  return (
    <FlexBox {...{ marginTop: '16px' }}>
      <Star />
      <Typography
        variant="span"
        size={theme.fonts.size.sm}
        color={theme.colors.black}
        {...{ margin: '0px 10px 0px 5px' }}
      >
        {`(${star?.toString()}/5)`}
      </Typography>

      <Typography
        variant="span"
        size={theme.fonts.size.sm}
        color={theme.colors.black}
      >
        {`(${mentees?.toString()}명의 멘티)`}
      </Typography>
    </FlexBox>
  )
}

export default Rating
