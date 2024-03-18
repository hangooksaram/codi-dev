import styled from '@emotion/styled';

import Close from '@icons/common/close.svg';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Add from '@icons/common/add.svg';
import theme, { device } from '@/ui/theme';

import { CATEGORIZED_JOBS } from '@/constants';
import Card from '@/ui/atoms/Card';
import Typography from '@/ui/atoms/Typography';
import FlexBox from '@/ui/atoms/FlexBox';
import Button from '@/ui/atoms/Button';
import { getJobCategories } from '@/api/jobApi';
import { SetState } from '@/index';
import Overlay from '@/ui/atoms/BackgroundOverlay';
import { DropdownContainer, DropdownButton } from '@/ui/atoms/Dropdown';
import useClickOutOfInput from '@/hooks/dropdown/useClickOutOfInput';

export interface Jobs {
  classification: string;
  jobs: {
    name: string;
  }[];
}

function JobSelector({
  id,
  width,
  invalid,
  open,
  setOpen,
  selected,
  setSelected,
  ...rest
}: {
  id: string;
  width?: string;
  invalid: boolean;
  open: boolean;
  setOpen: SetState<boolean>;
  selected: string;
  setSelected: SetState<string>;
}) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [jobs, setJobs] = useState<Jobs[]>([]);
  const [categorizedJobs, setCategorizedJobs] = useState<
    { name: string }[] | undefined
  >([]);

  useEffect(() => {
    (async () => {
      const { data } = await getJobCategories<Jobs[]>();
      setJobs(data!);
      setCategorizedJobs(data![0].jobs);
    })();
  }, []);
  useEffect(() => {
    setCategorizedJobs(
      jobs!.find((_, index) => {
        return index === selectedTab;
      })?.jobs,
    );
  }, [selectedTab, jobs]);

  return (
    <DropdownContainer width={width} {...rest}>
      <JobSelectorDropdownButton
        id={id}
        width="100%"
        variant="square"
        type="button"
        color={theme.colors.white}
        invalid={invalid}
        onClick={() => {
          setOpen((prev) => !prev);
        }}
        hoverDisabled
        {...rest}
      >
        {selected || '직무 카테고리'}

        <Add id={id} />
      </JobSelectorDropdownButton>

      {open && (
        <Container>
          <FlexBox rowGap="30px" direction="column">
            <Header setOpen={setOpen} />
            <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <TabContent
              jobs={categorizedJobs!}
              selected={selected}
              setSelected={setSelected}
            />
          </FlexBox>
        </Container>
      )}
    </DropdownContainer>
  );
}

function Header({ setOpen }: { setOpen: SetState<boolean> }) {
  return (
    <FlexBox justifyContent="space-between">
      <FlexBox columnGap="10px" justifyContent="flex-start">
        <Typography variant="h1" size={theme.fonts.size.md}>
          직무 선택
        </Typography>
        <Typography variant="div" color={theme.colors.gray.main}>
          해당하는 직무 카테고리를 선택해주세요.
        </Typography>
      </FlexBox>
      <Close onClick={() => setOpen(false)} />
    </FlexBox>
  );
}

function Tabs({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: number;
  setSelectedTab: Dispatch<SetStateAction<number>>;
}) {
  return (
    <FlexBox justifyContent="flex-start">
      {CATEGORIZED_JOBS.map(({ category }, index) => {
        return (
          <TabButton
            onClick={() => setSelectedTab(index)}
            type="button"
            variant="square"
            key={index}
            color={
              selectedTab === index
                ? theme.colors.primary.main
                : theme.colors.white
            }
            width="20%"
            hoverDisabled
          >
            {category}
          </TabButton>
        );
      })}
    </FlexBox>
  );
}

function TabContent({
  jobs,
  selected,
  setSelected,
}: {
  jobs: { name: string }[];
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}) {
  return (
    <FlexBox justifyContent="flex-start" columnGap="15px" rowGap="15px" isWrap>
      {jobs?.map(({ name }, index) => {
        return (
          <Button
            onClick={() => setSelected(name)}
            type="button"
            variant="default"
            size="sm"
            outline
            key={index}
            color={
              selected === name
                ? theme.colors.secondary.main
                : theme.colors.white
            }
            hoverDisabled
          >
            {name}
          </Button>
        );
      })}
    </FlexBox>
  );
}

const Container = styled(Card)({
  position: 'absolute',
  minWidth: '790px',
  minHeight: '467px',
  padding: '30px',
  marginTop: '20px',
  zIndex: 1,
  [device('tablet')]: {
    width: '100%',
  },
});

const TabButton = styled(Button)(({}) => ({
  borderRadius: '10px',
  borderBottomLeftRadius: '0px',
  borderBottomRightRadius: '0px',
  borderBottom: `2px solid ${theme.colors.primary.main}`,
}));

const Truncate = styled.div({
  width: '100%',
  minWidth: '240px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textAlign: 'left',
});

const JobSelectorDropdownButton = styled(DropdownButton)(() => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textAlign: 'left',
}));

export default JobSelector;
