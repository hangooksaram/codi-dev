"use client";

import JobRank from "@/component/Mentors/JobRank";
import MentorList from "@/component/Mentors/MentorList";
import MentorSearch from "@/component/Mentors/MentorSearch";
import Recommendation from "@/component/Mentors/Recommendation";
import useGetMentorsQuery from "@/queries/mentorQuery";
import { Mentor } from "@/types/mentor";
import FlexBox from "@/ui/atoms/Layout/FlexBox";
import theme from "@/ui/theme";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import MentorsBanner from "@/component/Mentors/MentorBanner";
import { PageComponentLayout } from "@/ui/atoms/Layout/PageComonentLayout";
import TitleSection from "@/component/Mentors/TitleSection";
import Logo from "../../../public/icons/recommend-icon.svg";

const MentorsPage = () => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const { data, isLoading, isSuccess } = useGetMentorsQuery({
    page: 1,
    size: 10,
  });
  const scrollToMentorList = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const mentors = data?.data as Mentor[];
  const recommendationMentors = mentors?.filter((mentor, index) => index < 4);

  return (
    isSuccess && (
      <main style={{ backgroundColor: theme.colors.background }}>
        <FlexBox direction="column" rowGap="20px">
          <MentorsBanner scrollToMentorList={scrollToMentorList} />
          <JobRank
            ranks={["제조 단순직", "기계 설치/정비/생산직", "경영/행정/사무직"]}
          />
          <Recommendation mentors={recommendationMentors} />

          <div style={{ width: "100%" }} ref={ref}>
            <PageComponentLayout>
              <TitleSection title="멘토리스트" logo={<Logo />} />
              <div style={{ marginBottom: "40px" }}>
                <MentorSearch />
              </div>
              <MentorList mentors={mentors} />
            </PageComponentLayout>
          </div>
        </FlexBox>
      </main>
    )
  );
};

export default MentorsPage;
