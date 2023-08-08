import { Dispatch, ReactNode, SetStateAction } from "react";
import Overlay from "../atoms/BackgroundOverlay";

import styled from "@emotion/styled";

const Modal = ({
  open,
  setOpen,
  children,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}) => {
  return (
    open && (
      <>
        <ModalOverlay onClick={() => setOpen(false)}></ModalOverlay>
        {children}
      </>
    )
  );
};

const ModalOverlay = styled(Overlay)({
  backgroundColor: "rgba(0,0,0,0.4)",

  zIndex: 1,
});

export default Modal;
