import { checkAccessToken, checkLoginInfo } from "@/api/authApi";
import { selectAuth, setIsLoggedIn } from "@/features/auth/authSlice";
import { setUser } from "@/features/user/userSlice";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const AuthContainer = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  useEffect(() => {
    (async () => {
      const { data } = await checkAccessToken();
      dispatch(setIsLoggedIn(data!.isLoggedIn));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (auth.isLoggedIn) {
        const { data } = await checkLoginInfo();
        dispatch(
          setUser({
            id: data?.id,
            isMentor: data?.isMentor,
            isProfile: data?.isProfile,
            profileImageUrl: data?.imgUrl,
          })
        );
      }
    })();
  }, [auth.isLoggedIn]);
  return <>{children}</>;
};

export default AuthContainer;
