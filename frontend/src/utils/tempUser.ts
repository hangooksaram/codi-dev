"use client";

import { User } from "@/types/user";

const setUser = (obj: object) => {
  if (typeof window !== "undefined")
    window.localStorage.setItem("user", JSON.stringify(obj));
};

const isUser = () => {
  if (typeof window !== "undefined") {
    const user = window.localStorage.getItem("user");
    if (!user) return false;
    return true;
  }
};

const user = () => {
  if (typeof window !== "undefined" && window.localStorage.getItem("user"))
    return JSON.parse(window.localStorage.getItem("user")!) as User;
  return null;
};

export { setUser, isUser, user };
