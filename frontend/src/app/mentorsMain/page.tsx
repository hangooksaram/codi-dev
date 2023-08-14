"use client";

import JobRank from "@/components/Job/JobRank";
import FlexBox from "@/ui/atoms/FlexBox";
import theme from "@/ui/theme";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import MentorsBanner from "@/components/pages/mentorsMain/MentorBanner";
import { PageComponentLayout } from "@/components/pages/mentorsMain/PageComonentLayout";
import TitleSection from "@/components/pages/mentorsMain/TitleSection";
import Logo from "@icons/logo/recommend-icon.svg";
import Mentors from "@/components/Mentor/Mentors";
import { useJobRanksQuery } from "@/queries/jobQuery";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/user/userSlice";

const MentorsPage = () => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const { id } = useSelector(selectUser);
  const { data } = useJobRanksQuery(id!);

  const scrollToMentorList = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main style={{ backgroundColor: theme.colors.background }}>
      <FlexBox direction="column" rowGap="20px">
        <MentorsBanner scrollToMentorList={scrollToMentorList} />
        <JobRank
          ranks={["제조 단순직", "기계 설치/정비/생산직", "경영/행정/사무직"]}
        />
        {/* <Recommendation mentors={recommendationMentors} /> */}

        <div style={{ width: "100%" }} ref={ref}>
          <PageComponentLayout>
            <TitleSection title="멘토리스트" logo={<Logo />} />
            <Mentors />
          </PageComponentLayout>
        </div>
      </FlexBox>
    </main>
  );
};

export default MentorsPage;
