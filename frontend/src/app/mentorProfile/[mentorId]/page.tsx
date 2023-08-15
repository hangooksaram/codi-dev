"use client";

import MentorProfile from "@/components/Profile/MentorProfile";
import { useParams } from "next/navigation";

const MentorProfilePage = () => {
  const { mentorId } = useParams();
  return <MentorProfile mentorId={parseInt(mentorId!)} />;
};

export default MentorProfilePage;
