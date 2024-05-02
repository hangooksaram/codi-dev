import { createPortal } from 'react-dom';

import {
  ModalContainer,
  ModalExternalContainer,
  ModalOverlay,
} from './Modal.styled';
import { ReactNode, useState } from 'react';
import { SetState } from '@/index';

export type ModalType = 'confirm' | 'select';

function LocalModal({
  open,
  setOpen,
  children,
}: {
  open: boolean;
  setOpen: SetState<boolean>;
  children: ReactNode;
}) {
  return (
    open &&
    createPortal(
      <ModalExternalContainer>
        <ModalOverlay onClick={() => setOpen(false)} />
        <ModalContainer>{children}</ModalContainer>
      </ModalExternalContainer>,
      document.body,
    )
  );
}

export default LocalModal;
