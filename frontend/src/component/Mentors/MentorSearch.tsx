import Dropdown from "@/ui/atoms/Dropdown/Dropdown";
import IconInputContainer from "@/ui/atoms/Input/IconInput";
import FlexBox from "@/ui/atoms/Layout/FlexBox";
import Search from "../../../public/icons/search.svg";
import { useState } from "react";
import Input from "@/ui/atoms/Input/Input";
import Button from "@/ui/atoms/Button/Button";
import theme from "@/ui/theme";
import { CAREERS, DISABILITIES, JOBS } from "@/constants";

const MentorSearch = () => {
  const [query, setQuery] = useState({
    disability: "",
    job: "",
    career: "",
  });
  return (
    <FlexBox justifyContent="flex-start" columnGap="10px">
      <FlexBox width="60%" columnGap="10px">
        <Dropdown
          width="30%"
          title="장애구분"
          categories={DISABILITIES}
          selectedCategory={query.disability}
          setSelectedCategory={(disability) =>
            setQuery({ ...query, disability })
          }
        />
        <Dropdown
          width="40%"
          title="직무"
          categories={JOBS}
          selectedCategory={query.job}
          setSelectedCategory={(job) => setQuery({ ...query, job })}
        />
        <Dropdown
          width="30%"
          title="경력"
          categories={CAREERS}
          selectedCategory={query.career}
          setSelectedCategory={(career) => setQuery({ ...query, career })}
        />
      </FlexBox>
      <FlexBox width="40%" columnGap="10px">
        <IconInputContainer iconComponent={<Search />}>
          <Input outline />
        </IconInputContainer>
        <Button width="40%" color={theme.colors.primary} variant="square">
          검색
        </Button>
      </FlexBox>
    </FlexBox>
  );
};

export default MentorSearch;
