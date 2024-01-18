import styled from '@emotion/styled'
import Card from '@/ui/atoms/Card'
import FlexBox from '@/ui/atoms/FlexBox'
import Typography from '@/ui/atoms/Typography'
import theme, { device } from '@/ui/theme'

function MentorStatus() {
  return (
    <FlexBox
      direction="column"
      alignItems="center"
      justifyContent="space-between"
      rowGap="4px"
      {...{ marginTop: '24px' }}
    >
      {[
        { text: '멘토링 횟수', value: '0회' },
        { text: '응답률', value: '0%' },
      ].map(({ text, value }, index) => (
        <MentorStatusCard width="100%">
          <FlexBox justifyContent="space-between" key={index}>
            <Typography variant="div" color={theme.colors.gray.main}>
              {text}
            </Typography>
            <Typography
              variant="div"
              size={theme.fonts.size.md}
              color={theme.colors.primary.main}
              weight={theme.fonts.weight.extraBold}
            >
              {value}
            </Typography>
          </FlexBox>
        </MentorStatusCard>
      ))}
    </FlexBox>
  )
}

export default MentorStatus

const MentorStatusCard = styled(Card)(({}) => ({
  backgroundColor: theme.colors.background,
  border: 'none',
  padding: '20px',
}))
