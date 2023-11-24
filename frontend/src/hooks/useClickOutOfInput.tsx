import { useEffect } from "react";
import { SetState } from "..";

const useClickOutOfInput = (elementId: string, setOpen: SetState<boolean>) => {
  const addClickOutOfInputHandler = (e: MouseEvent) => {
    if (elementId !== (e.target! as HTMLElement).id) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", addClickOutOfInputHandler);

    return document.removeEventListener("click", addClickOutOfInputHandler);
  }, []);
};

export default useClickOutOfInput;
