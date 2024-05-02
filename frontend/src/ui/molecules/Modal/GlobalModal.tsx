import { createPortal } from 'react-dom';
import { selectModal, setModalState } from '@/features/modal/modalSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import ConfirmModal from './ConfirmModal';
import SelectModal from './SelectModal';
import {
  ModalContainer,
  ModalExternalContainer,
  ModalOverlay,
} from './Modal.styled';

export type ModalType = 'confirm' | 'select';

function GlobalModal() {
  const { open } = useSelector(selectModal);
  const dispatch = useDispatch();

  return (
    open &&
    createPortal(
      <ModalExternalContainer>
        <ModalOverlay onClick={() => dispatch(setModalState(false))} />
        <ModalContainer>
          <ModalByType />
        </ModalContainer>
      </ModalExternalContainer>,
      document.body,
    )
  );
}

const ModalByType = () => {
  const { currentModalType } = useSelector(selectModal);
  switch (currentModalType!) {
    case 'confirm':
      return <ConfirmModal />;
    case 'select':
      return <SelectModal />;
    default:
      return <ConfirmModal />;
  }
};
export default GlobalModal;
