import { SetState } from '@/index';
import Card from '@/ui/atoms/Card';
import Checkbox from '@/ui/atoms/Checkbox';
import FlexBox from '@/ui/atoms/FlexBox';
import Typography from '@/ui/atoms/Typography';
import theme from '@/ui/theme';
import styled from '@emotion/styled';
import { ReactNode } from 'react';
import Markdown from 'react-markdown';

const TermsChecker = ({
  text,
  check,
  setChecked,
  content,
  submitted,
}: {
  text: string;
  check: boolean;
  setChecked: SetState<boolean>;
  submitted?: boolean;
  content: string;
}) => {
  return (
    <TermsCheckerCard checked={check} submitted={submitted}>
      <FlexBox
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <FlexBox
          justifyContent="space-between"
          alignItems="center"
          {...{ marginBottom: '20px' }}
        >
          <Typography
            variant="div"
            size={theme.fonts.size.sm}
            color={check ? theme.colors.white : theme.colors.gray.main}
          >
            {text}
          </Typography>

          <Checkbox label="" checked={check} setChecked={setChecked} />
        </FlexBox>
        <TermsContent>
          <Markdown>{content}</Markdown>
        </TermsContent>
      </FlexBox>
    </TermsCheckerCard>
  );
};

export default TermsChecker;

const TermsCheckerCard = styled(Card)(
  ({ checked, submitted }: { checked: boolean; submitted?: boolean }) => ({
    borderRadius: '5px',
    padding: '20px',
    borderColor: !checked && submitted ? theme.colors.error : '',
    backgroundColor: checked ? theme.colors.primary.normal : theme.colors.white,
  }),
);

const TermsContent = styled(Card)(() => ({
  height: '140px',
  borderRadius: '5px',
  overflow: 'auto',
  padding: '10px 30px',
}));
