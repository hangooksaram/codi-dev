import FlexBox from "@/ui/atoms/FlexBox";
import { PageComponentLayout } from "@/components/pages/mentorsMain/PageComonentLayout";
import Typography from "@/ui/atoms/Typography";
import theme, { device } from "@/ui/theme";
import styled from "@emotion/styled";
import Logo from "@icons/logo/recommendation-page-logo.svg";
import TitleSection from "../pages/mentorsMain/TitleSection";
import { JobRanks } from "@/types/job";

const JobRank = ({ jobRanks }: { jobRanks: JobRanks }) => (
  <PageComponentLayout>
    <FlexBox direction="column">
      <TitleSection
        title={`${jobRanks?.disability} 취업 직무순위`}
        logo={<Logo />}
      />

      <FlexBox justifyContent="center" direction="column">
        {jobRanks?.infos.map(({ job, ranking, ratio }, index) => (
          <Bar key={index} first={index === 0}>
            <FlexBox alignItems="center" justifyContent="space-between">
              <Typography
                weight={
                  index === 0
                    ? theme.fonts.weight.extraBold
                    : theme.fonts.weight.regular
                }
                size={index === 0 ? theme.fonts.size.md : theme.fonts.size.sm}
                color={theme.colors.black}
                variant="div"
              >
                {`${ranking}위 ${job}`}
              </Typography>
              <Typography
                size={index === 0 ? theme.fonts.size.md : theme.fonts.size.sm}
                color={theme.colors.black}
                variant="div"
              >{`${ratio.toString()}%`}</Typography>
            </FlexBox>
          </Bar>
        ))}
      </FlexBox>
    </FlexBox>
  </PageComponentLayout>
);

const Bar = styled.div(({ first }: { first: boolean }) => ({
  width: first ? "771px" : "709px",
  height: first ? "56px" : "39px",
  backgroundColor: first ? theme.colors.secondary : theme.colors.white,
  display: "flex",
  alignItems: "center",
  borderRadius: "43px",
  border: `1px solid ${theme.colors.background}`,
  padding: "0px 20px",
  boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.04)",
  marginBottom: "10px",
  ":last-child": {
    marginBottom: "0px",
  },
  [device("tablet")]: {
    width: first ? "100%" : "90%",
  },
}));

export default JobRank;
