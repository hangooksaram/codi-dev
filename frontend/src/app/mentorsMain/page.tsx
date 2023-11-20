"use client";

import JobRank from "@/components/Job/JobRank";
import FlexBox from "@/ui/atoms/FlexBox";
import theme from "@/ui/theme";
import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MentorsBanner from "@/components/pages/mentorsMain/MentorBanner";
import { PageComponentLayout } from "@/components/pages/mentorsMain/PageComonentLayout";
import TitleSection from "@/components/pages/mentorsMain/TitleSection";
import Logo from "@icons/logo/recommend-icon.svg";
import Mentors from "@/components/Mentor/Mentors";
import Recommendation from "@/components/pages/mentorsMain/Recommendation";

const MentorsPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const params = useSearchParams();
  const router = useRouter();

  const goToMentorsPage = () => {
    router.push("/mentors");
  };

  useEffect(() => {
    if (params.get("fromRecommendation")) goToMentorsPage();
  }, []);

  return (
    <main style={{ backgroundColor: theme.colors.background }}>
      <FlexBox direction="column" rowGap="20px">
        <MentorsBanner goToMentorsPage={goToMentorsPage} />
        <JobRank />

        <Recommendation />
      </FlexBox>
    </main>
  );
};

export default MentorsPage;
