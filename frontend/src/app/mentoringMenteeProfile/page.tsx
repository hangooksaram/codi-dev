"use client";

import MenteeProfile from "@/components/Profile/MenteeProfile";
import { useSearchParams } from "next/navigation";

const MentoringMenteeProfilePage = ({}) => {
  const param = useSearchParams();

  return (
    <MenteeProfile
      profileId={param.get("profileId")!}
      mentoringId={param.get("mentoringId")!}
    />
  );
};

export default MentoringMenteeProfilePage;
