"use client";

import ProfileCard from "@/components/Profile/ProfileCard";
import Button from "@/ui/atoms/Button";
import Card from "@/ui/atoms/Card";
import Chip from "@/ui/atoms/Chip";
import FlexBox from "@/ui/atoms/FlexBox";
import Grid from "@/ui/atoms/Grid";
import LabelBox from "@/ui/molecules/LabelBox";
import theme, { device } from "@/ui/theme";
import { css } from "@emotion/css";

const MentorCenterApplyCard = ({
  date,
  categories,
  introduction,
  menteeInfo,
}: {
  date: string;
  categories: string[];
  introduction: string;
  menteeInfo: {
    name: string;
    job: string;
    disability: string;
    severity: string;
  };
}) => {
  const { name, disability, job, severity } = menteeInfo;
  return (
    <FlexBox
      justifyContent="space-between"
      columnGap="20px"
      className={css({
        [device("tablet")]: {
          flexDirection: "column",
        },
      })}
    >
      <div
        className={css({
          [device("tablet")]: {
            width: "100%",
          },
        })}
      >
        <ProfileCard
          width="293px"
          height="400px"
          name={name}
          disability={disability}
          job={job}
          severity={severity}
          imgUrl="/images/ProfileTest.png"
          apply={true}
        />
      </div>
      <Card padding="40px" width="100%" height="400px">
        <FlexBox
          direction="column"
          justifyContent="space-between"
          alignItems="flex-start"
          {...{ height: "100%" }}
        >
          <Grid gridTemplateColumns="1fr 1fr">
            <LabelBox text="신청일자" width="50%">
              <Chip title={date} />
            </LabelBox>

            <LabelBox text="카테고리" width="50%">
              <FlexBox justifyContent="flex-start">
                {categories.map((category, index) => (
                  <Chip key={index} title={category} />
                ))}
              </FlexBox>
            </LabelBox>
            <div className={css({ gridColumnEnd: 2 })}>
              <LabelBox text="하고 싶은 말">
                <p>{introduction}</p>
              </LabelBox>
            </div>
          </Grid>

          <FlexBox justifyContent="space-between">
            <Button
              size="small"
              color={theme.colors.secondary}
              variant="default"
            >
              멘티 프로필 보기
            </Button>
            <FlexBox width="fit-content">
              <Button
                size="small"
                color={theme.colors.primary}
                variant="default"
                {...{ marginRight: "24px" }}
              >
                수락
              </Button>
              <Button
                size="small"
                color={theme.colors.white}
                outline
                variant="default"
              >
                거절
              </Button>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </Card>
    </FlexBox>
  );
};

export default MentorCenterApplyCard;
