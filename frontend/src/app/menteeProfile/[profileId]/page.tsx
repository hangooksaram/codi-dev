"use client";

import MenteeProfile from "@/components/Profile/MenteeProfile";
import { useParams, useSearchParams } from "next/navigation";

const MenteeProfilePage = () => {
  const { profileId } = useParams();
  const param = useSearchParams();
  return <MenteeProfile profileId={parseInt(profileId)} pageParams={param} />;
};

export default MenteeProfilePage;
