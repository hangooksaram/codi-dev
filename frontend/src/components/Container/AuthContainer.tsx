import { checkAccessToken, checkLoginInfo } from "@/api/authApi";
import { selectAuth, setIsLoggedIn } from "@/features/auth/authSlice";
import { selectUser, setUser } from "@/features/user/userSlice";
import useRedirectOnUnverified from "@/hooks/redirect/useRedirectOnUnverified";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

/** 초기 페이지 진입 시, 토큰 확인 */
const AuthContainer = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  const redirect = useRedirectOnUnverified();

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
        dispatch(setUser({ ...data }));
        redirect(data?.id, data?.isProfile);
        return;
      } else if (auth.isLoggedIn === false) {
        redirect();
      }
    })();
  }, [auth.isLoggedIn]);
  return <>{children}</>;
};

export default AuthContainer;
