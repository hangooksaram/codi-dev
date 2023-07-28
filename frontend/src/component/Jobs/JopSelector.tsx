import styled from "@emotion/styled";

import theme from "@/ui/theme";

import Close from "@icons/common/close.svg";

import { CATEGORIZED_JOBS } from "@/constants";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Card from "@/ui/atoms/Card";
import Typography from "@/ui/atoms/Typography";
import FlexBox from "@/ui/atoms/FlexBox";
import Button from "@/ui/atoms/Button";

const JobSelector = ({
  selectedContent,
  setSelectedContent,
}: {
  selectedContent: string;
  setSelectedContent: Dispatch<SetStateAction<string>>;
}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [categorizedJobs, setCategorizedJobs] = useState<string[]>();
  useEffect(() => {
    setCategorizedJobs(
      CATEGORIZED_JOBS.find((item, index) => {
        return index === selectedTab;
      })?.jobs
    );
  }, [selectedTab]);

  return (
    <Container>
      <FlexBox rowGap="30px" direction="column">
        <Header />
        <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <TabContent
          jobs={categorizedJobs!}
          selectedContent={selectedContent}
          setSelectedContent={setSelectedContent}
        />
      </FlexBox>
    </Container>
  );
};

const Header = () => (
  <FlexBox justifyContent="space-between">
    <FlexBox columnGap="10px" justifyContent="flex-start">
      <Typography variant="h1" size={theme.fonts.size.md}>
        직무 선택
      </Typography>
      <Typography variant="div" color={theme.colors.gray.main}>
        해당하는 직무 카테고리를 선택해주세요.
      </Typography>
    </FlexBox>
    <Close />
  </FlexBox>
);

const Tabs = ({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: number;
  setSelectedTab: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <FlexBox justifyContent="flex-start">
      {CATEGORIZED_JOBS.map(({ category }, index) => {
        return (
          <TabButton
            onClick={() => setSelectedTab(index)}
            role="tab"
            variant="square"
            key={index}
            color={
              selectedTab === index ? theme.colors.primary : theme.colors.white
            }
            width="20%"
          >
            {category}
          </TabButton>
        );
      })}
    </FlexBox>
  );
};

const TabContent = ({
  jobs,
  selectedContent,
  setSelectedContent,
}: {
  jobs: string[];
  selectedContent: string;
  setSelectedContent: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <FlexBox
      justifyContent="flex-start"
      columnGap="15px"
      rowGap="15px"
      isWrap={true}
    >
      {jobs?.map((item, index) => {
        return (
          <Button
            onClick={() => setSelectedContent(item)}
            variant="default"
            size="sm"
            outline
            key={index}
            color={
              selectedContent === item
                ? theme.colors.secondary
                : theme.colors.white
            }
          >
            {item}
          </Button>
        );
      })}
    </FlexBox>
  );
};

const Container = styled(Card)`
  max-width: 790px;
  min-height: 467px;
  border-radius: 20px;
  padding: 30px;
  border: 1px solid ${theme.colors.gray.main};
`;

const TabButton = styled(Button)(({}) => ({
  borderRadius: "10px",
  borderBottomLeftRadius: "0px",
  borderBottomRightRadius: "0px",
  borderBottom: `2px solid ${theme.colors.primary}`,
}));

export default JobSelector;
