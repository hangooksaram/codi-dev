import { signIn } from "@/api/signApi";
import { selectUser, setUser } from "@/features/user/userSlice";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const AuthContainer = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
    }
  }, []);
  return <>{children}</>;
};

export default AuthContainer;
