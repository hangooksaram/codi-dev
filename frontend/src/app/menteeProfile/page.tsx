"use client";

import MenteeProfile from "@/components/Profile/MenteeProfile";
import { useParams, useSearchParams } from "next/navigation";

const MenteeProfilePage = () => {
  const param = useSearchParams();

  return (
    <MenteeProfile
      profileId={parseInt(param.get("profileId")!)}
      pageParams={param}
    />
  );
};

export default MenteeProfilePage;
