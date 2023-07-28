"use client";

const setLocal = (obj: object) => {
  if (typeof window !== "undefined")
    window.localStorage.setItem("tempUser", JSON.stringify(obj));
};

const isUser = () => {
  if (typeof window !== "undefined") {
    const user = window.localStorage.getItem("tempUser");
    if (!user) return false;
    return true;
  }
};

const checkUser = ({ id, password }: { id: string; password: string }) => {
  if (typeof window !== "undefined") {
    const user = window.localStorage.getItem("tempUser");
    if (!user) return false;
    if (JSON.parse(user).id !== id || JSON.parse(user).password !== password)
      return false;

    return true;
  }
};

export { setLocal, isUser, checkUser };
