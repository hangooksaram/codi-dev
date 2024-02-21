import { DROPDOWN_RESET_CATEGORY } from '@/constants';
import { isStringArray } from '@/utils/typeGuards';
import { useEffect, useState } from 'react';

const useResetCategory = (
  categories: string[] | number[],
  selectedCategory: string | number | null,
  setSelectedCategory: (category: string) => void,
  isReset?: boolean,
) => {
  const [resetContainedCategories, setResetContainedCategories] = useState<
    any[]
  >([]);
  useEffect(() => {
    if (isReset && isStringArray(categories)) {
      const copiedCategories = [...categories];
      copiedCategories.unshift(DROPDOWN_RESET_CATEGORY);
      setResetContainedCategories(copiedCategories);
    }
  }, []);

  useEffect(() => {
    if (isReset && selectedCategory === DROPDOWN_RESET_CATEGORY) {
      setSelectedCategory('');
    }
  }, [selectedCategory]);

  return { resetContainedCategories };
};

export default useResetCategory;
