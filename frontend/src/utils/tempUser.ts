"use client";

import { User } from "@/types/user";

const setLocalUser = (obj: object) => {
  if (typeof window !== "undefined") {
    if (localUser() !== null) {
      window.localStorage.setItem(
        "user",
        JSON.stringify(Object.assign(localUser()!, obj))
      );
    } else window.localStorage.setItem("user", JSON.stringify(obj));
  }
};

const isLocalUser = () => {
  if (typeof window !== "undefined") {
    const user = window.localStorage.getItem("user");
    if (!user) return false;
    return true;
  }
};

const localUser = () => {
  if (typeof window !== "undefined" && window.localStorage.getItem("user"))
    return JSON.parse(window.localStorage.getItem("user")!) as User;
  return null;
};

export { setLocalUser, isLocalUser, localUser };
