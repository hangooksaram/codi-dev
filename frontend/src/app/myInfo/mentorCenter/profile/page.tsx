"use client";

import MentorProfile from "@/components/Profile/MentorProfile";
import { selectUser } from "@/features/user/userSlice";
import { useGetMentorQuery } from "@/queries/mentorQuery";
import { useSelector } from "react-redux";

const MentorProfilePage = () => {
  return <MentorProfile />;
};

export default MentorProfilePage;
