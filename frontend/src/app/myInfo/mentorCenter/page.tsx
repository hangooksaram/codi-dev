"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const MentorCenterPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("profile");
  }, []);
  return;
};

export default MentorCenterPage;
