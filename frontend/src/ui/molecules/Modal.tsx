import { Dispatch, ReactNode, SetStateAction } from 'react';
import styled from '@emotion/styled';
import Overlay from '../atoms/BackgroundOverlay';
import { device } from '../theme';
import { createPortal } from 'react-dom';
import { selectModal, setModalState } from '@/features/modal/modalSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

function Modal({ children }: { children: ReactNode }) {
  const { open } = useSelector(selectModal);
  console.log(open);
  const dispatch = useDispatch();

  return (
    open &&
    createPortal(
      <>
        <ModalOverlay onClick={() => dispatch(setModalState(false))} />
        <ModalContainer>{children}</ModalContainer>
      </>,
      document.body,
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
  boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.04)',
  cursor: 'default',

  [device('tablet')]: {
    transform: 'translate(-50%, -50%)',
    width: '90%',
  },
});

export default Modal;
