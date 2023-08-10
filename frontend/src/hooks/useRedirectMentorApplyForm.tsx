import { selectUser } from "@/features/user/userSlice";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const useRedirectMentorRegisterForm = () => {
  const user = useSelector(selectUser);
  const router = useRouter();
  useEffect(() => {
    if (!user.id) redirect("/signin");
    else if (!user.profileId) redirect("/profileForm");
  }, []);
};

export default useRedirectMentorRegisterForm;
