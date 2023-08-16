"use client";

import MentorProfile from "@/components/Profile/MentorProfile";
import { useParams, useSearchParams } from "next/navigation";

const MentorProfilePage = () => {
  const param = useSearchParams();
  return (
    <MentorProfile
      mentorId={parseInt(param.get("mentorId")!)}
      pageParams={param}
    />
  );
};

export default MentorProfilePage;
