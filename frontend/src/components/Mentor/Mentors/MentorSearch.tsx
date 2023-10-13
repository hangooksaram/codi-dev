import Dropdown from "@/ui/atoms/Dropdown";
import IconInputContainer from "@/ui/molecules/Input/IconInput";
import FlexBox from "@/ui/atoms/FlexBox";
import Search from "@icons/common/search.svg";
import { Dispatch, SetStateAction, useState } from "react";
import Input from "@/ui/atoms/Input";
import Button from "@/ui/atoms/Button";
import theme, { device } from "@/ui/theme";
import { CAREERS, DISABILITIES, JOBS } from "@/constants";
import { GetMentorsParameters } from "@/types/api/mentor";
import ContentTextContainer from "@/ui/molecules/Container/ContentTextContainer";

const MentorSearch = ({
  query,
  setQuery,
  refetch,
  setSearched,
}: {
  query: GetMentorsParameters;
  setQuery: (query: GetMentorsParameters) => void;
  setSearched: Dispatch<SetStateAction<string>>;
  refetch: () => void;
}) => {
  return (
    <FlexBox
      justifyContent="flex-start"
      columnGap="10px"
      {...{
        [device("tablet")]: {
          flexDirection: "column",
          rowGap: "10px",
        },
      }}
    >
      <FlexBox
        width="60%"
        columnGap="10px"
        {...{
          [device("tablet")]: {
            width: "100%",
          },
        }}
      >
        <Dropdown
          width="30%"
          title="장애구분"
          categories={DISABILITIES}
          selectedCategory={query.disability!}
          setSelectedCategory={(disability) =>
            setQuery({ ...query, disability })
          }
        />
        <Dropdown
          width="40%"
          title="직무"
          categories={JOBS}
          selectedCategory={query.job!}
          setSelectedCategory={(job) => setQuery({ ...query, job })}
        />
        <Dropdown
          width="30%"
          title="경력"
          categories={CAREERS}
          selectedCategory={query.career!}
          setSelectedCategory={(career) => setQuery({ ...query, career })}
        />
      </FlexBox>
      <FlexBox
        width="40%"
        columnGap="10px"
        {...{
          [device("tablet")]: {
            width: "100%",
          },
        }}
      >
        <ContentTextContainer
          text="원하는 멘토를 검색하세요"
          type="general"
          htmlFor="search-mentor"
        >
          <IconInputContainer iconComponent={<Search />}>
            <Input
              id="search-mentor"
              value={query.keyword}
              onChange={(e) => setQuery({ ...query, keyword: e.target.value })}
              outline
            />
          </IconInputContainer>
        </ContentTextContainer>
        <Button
          onClick={() => {
            setSearched(JSON.stringify(query));
          }}
          width="40%"
          color={theme.colors.primary}
          variant="square"
        >
          검색
        </Button>
      </FlexBox>
    </FlexBox>
  );
};

export default MentorSearch;
