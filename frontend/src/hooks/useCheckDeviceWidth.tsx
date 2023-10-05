import { useEffect, useState } from "react";

export const useCheckDeviceWidth = (breakpoint: number) => {
  const [isBelow, setIsBlow] = useState(false);

  const setIsBlowBySize = () => {
    setIsBlow(window.innerWidth < breakpoint);
  };

  useEffect(() => {
    setIsBlowBySize();
    addEventListener("resize", setIsBlowBySize);
    return () => {
      removeEventListener("resize", setIsBlowBySize);
    };
  }, []);

  return isBelow;
};
