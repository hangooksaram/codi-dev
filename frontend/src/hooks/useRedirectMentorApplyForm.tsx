import { selectUser } from "@/features/user/userSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const useRedirectMentorRegisterForm = () => {
  const user = useSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    if (!user.id) {
      router.replace("/signin");
    } else if (!user.isProfile) router.replace("/profileForm");
  }, []);
};

export default useRedirectMentorRegisterForm;
