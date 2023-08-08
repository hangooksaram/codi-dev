import { setUser } from "@/features/user/userSlice";
import { isUser, user } from "@/utils/tempUser";
import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";

const AuthContainer = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (isUser()) {
      dispatch(setUser(user()));
    }
  }, []);

  return <>{children}</>;
};

export default AuthContainer;
