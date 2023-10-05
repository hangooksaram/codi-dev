import { Dispatch, SetStateAction, useRef, useState } from "react";

export const useDropdown = (
  setSelectedCategory: Dispatch<SetStateAction<string | number>>
) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLUListElement>(null);
  const setCategory = (category: string | number) => {
    setOpen(false);
    setSelectedCategory(category);
  };
  const setDropdownContentPosition = () => {
    const windowHeight = window.innerHeight;
    const buttonPosition = document
      .getElementById("dropdown-button")!
      .getBoundingClientRect()!.y;
    setOpen((prev) => !prev);
    setTimeout(() => {
      if (buttonPosition + ref.current!.offsetHeight > windowHeight) {
        ref.current!.style.top = "auto";
        ref.current!.style.top = `-${ref.current!.offsetHeight + 20}px`;
      }
    }, 1);
  };

  return { open, setOpen, setCategory, ref, setDropdownContentPosition };
};