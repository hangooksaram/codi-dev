import { selectUser } from "@/features/user/userSlice";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";

type RedirectCondition = "user" | "profile";

interface RedirectRoutes {
  condition: RedirectCondition;
  currentRoute: string;
  redirectRoute: string;
}

const redirectRoutes: RedirectRoutes[] = [
  {
    currentRoute: "/mentorRegisterForm/",
    redirectRoute: "/profileForm",
    condition: "profile",
  },
  {
    currentRoute: "/mentorRegisterForm/",
    redirectRoute: "/signin",
    condition: "user",
  },
  {
    currentRoute: "/profileForm/",
    redirectRoute: "/signin",
    condition: "user",
  },
];

const useRedirectOnUnverified = () => {
  const router = useRouter();
  const pathname = usePathname();
  const user = useSelector(selectUser);

  const checkRedirectRoutes = () => {
    if (!isRedirectPage(pathname)) {
      return;
    }

    for (let route of redirectRoutes) {
      if (pathname.includes(route.currentRoute)) {
        if (
          (!user.id && route.condition === "user") ||
          (!user.isProfile && route.condition === "profile")
        ) {
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
