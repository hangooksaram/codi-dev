import { selectUser, setUser } from "@/features/user/userSlice";
import { isLocalUser, localUser } from "@/utils/tempUser";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const AuthContainer = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLocalUser()) {
      dispatch(setUser(localUser()));
    }
  }, []);

  return <>{children}</>;
};

export default AuthContainer;
