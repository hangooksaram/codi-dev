import { Dispatch, ReactNode, SetStateAction } from 'react';
import styled from '@emotion/styled';
import Overlay from '../atoms/BackgroundOverlay';
import { device } from '../theme';

function Modal({
  open,
  setOpen,
  children,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}) {
  return (
    open && (
      <>
        <ModalOverlay onClick={() => setOpen(false)} />
        <ModalContainer>{children}</ModalContainer>
      </>
    )
  );
}

const ModalOverlay = styled(Overlay)({
  backgroundColor: 'rgba(0,0,0,0.4)',
  zIndex: 1,
  cursor: 'default',
});

const ModalContainer = styled.div({
  position: 'fixed',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, 0)',
  zIndex: 2,

  [device('tablet')]: {
    transform: 'translate(-50%, -50%)',
  },
  cursor: 'default',
});

export default Modal;
