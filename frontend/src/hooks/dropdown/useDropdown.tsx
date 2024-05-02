import { DROPDOWN_RESET_CATEGORY } from '@/constants';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

export const useDropdown = (
  selectedCategory: string | number | null,
  setSelectedCategory: Dispatch<SetStateAction<string | number | null>>,
  id?: string,
) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLUListElement | HTMLDivElement>(null);
  const [resetContainedCategories, setResetContainedCategories] = useState<
    any[]
  >([]);
  const setCategory = (category: string | number) => {
    setOpen(false);
    setSelectedCategory(category);
  };
  const setDropdownContentPosition = () => {
    const windowHeight = window.innerHeight;
    const buttonPosition = document
      .getElementById(id!)!
      .getBoundingClientRect()!.y;
    setOpen((prev) => !prev);
    setTimeout(() => {
      if (buttonPosition + ref.current!.offsetHeight > windowHeight) {
        ref.current!.style.top = 'auto';
        ref.current!.style.top = `-${ref.current!.offsetHeight + 20}px`;
      }
    }, 1);
  };

  return {
    open,
    setOpen,
    setCategory,
    ref,
    setDropdownContentPosition,
  };
};
