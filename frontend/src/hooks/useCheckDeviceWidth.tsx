import { useEffect, useState } from 'react';

export const useCheckDeviceWidth = (breakpoint: number) => {
  const [isDeviceUnderWidth, setIsDeviceUnderWidth] = useState(false);

  const setIsDeviceUnderWidthBySize = () => {
    setIsDeviceUnderWidth(window.innerWidth < breakpoint);
  };

  useEffect(() => {
    setIsDeviceUnderWidthBySize();
    addEventListener('resize', setIsDeviceUnderWidthBySize);
    return () => {
      removeEventListener('resize', setIsDeviceUnderWidthBySize);
    };
  }, []);

  return isDeviceUnderWidth;
};
