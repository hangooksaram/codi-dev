import { selectUser } from "@/features/user/userSlice";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";

type RedirectCondition = "user" | "profile";

interface RedirectRoutes {
  allowed: RedirectCondition;
  currentRoute: string;
  redirectRoute: string;
}

const redirectRoutes: RedirectRoutes[] = [
  {
    currentRoute: "/mentorRegisterForm/",
    redirectRoute: "/profileForm",
    allowed: "profile",
  },
  {
    currentRoute: "/mentorRegisterForm/",
    redirectRoute: "/signin",
    allowed: "user",
  },
  {
    currentRoute: "/profileForm/",
    redirectRoute: "/signin",
    allowed: "user",
  },
];

const useRedirectOnUnverified = () => {
  const router = useRouter();
  const pathname = usePathname();
  const user = useSelector(selectUser);
  const checkRedirectRoutes = (id?: string, isProfile?: boolean) => {
    const userId = id ?? user.id;
    const isUserProfile = isProfile ?? user.isProfile;
    console.log(pathname);
    if (!isRedirectPage(pathname)) {
      return;
    }

    for (let route of redirectRoutes) {
      if (pathname.includes(route.currentRoute)) {
        if (!userId && route.allowed === "user") {
          router.replace(route.redirectRoute);
          return;
        }
        if (!isUserProfile && route.allowed === "profile") {
          router.replace(route.redirectRoute);
          return;
        }
      }
    }
  };

  return checkRedirectRoutes;
};

const isRedirectPage = (currentUrl: string) => {
  return redirectRoutes.some(({ currentRoute }) =>
    currentRoute.includes(currentUrl)
  );
};

export default useRedirectOnUnverified;
