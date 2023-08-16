"use client";

import MentorProfile from "@/components/Profile/MentorProfile";
import { selectUser } from "@/features/user/userSlice";
import { useGetMentorQuery } from "@/queries/mentorQuery";
import { useSelector } from "react-redux";

const MentorProfilePage = () => {
  const { mentorId } = useSelector(selectUser);

  return <MentorProfile mentorId={mentorId!} />;
};

export default MentorProfilePage;
