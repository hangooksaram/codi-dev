"use client";
import MenteeProfile from "@/components/Profile/MenteeProfile";
import { useSearchParams } from "next/navigation";

const MentoringAppliedMenteeProfilePage = () => {
  const param = useSearchParams();

  return (
    <MenteeProfile
      profileId={param.get("profileId")!}
      mentoringId={param.get("mentoringId")!}
      isMentoringApply={Boolean(param.get("mentoringApply"))!}
    />
  );
};

export default MentoringAppliedMenteeProfilePage;
