"use client";

import MenteeProfile from "@/components/Profile/MenteeProfile";
import { useParams } from "next/navigation";

const MenteeProfilePage = () => {
  const { profileId } = useParams();

  return <MenteeProfile profileId={parseInt(profileId)} />;
};

export default MenteeProfilePage;
