import { Dispatch, ReactNode, SetStateAction } from 'react';
import styled from '@emotion/styled';
import Overlay from '../atoms/BackgroundOverlay';
import { device } from '../theme';
import { createPortal } from 'react-dom';
import { selectModal, setModalState } from '@/features/modal/modalSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { keyframes } from '@emotion/css';

function Modal() {
  const { currentModal } = useSelector(selectModal);
  const { open } = useSelector(selectModal);
  const dispatch = useDispatch();

  return (
    open &&
    createPortal(
      <ModalExternalContainer>
        <ModalOverlay onClick={() => dispatch(setModalState(false))} />
        <ModalContainer>{currentModal}</ModalContainer>
      </ModalExternalContainer>,
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
    top: '50%',
    width: '90%',
  },
});

const ModalExternalContainer = styled.div(() => ({
  animation: `${fadeIn} 0.3s`,
}));

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100%{
    opacity:1;
  }
`;

export default Modal;
