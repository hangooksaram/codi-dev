import { ReactNode, useState } from 'react';
import Modal from '../Modal';
import Button from '@/ui/atoms/Button';
import styled from '@emotion/styled';
import Card from '@/ui/atoms/Card';
import { SetState } from '@/index';
import { device } from '@/ui/theme';
import FlexBox from '@/ui/atoms/FlexBox';
import { useDispatch } from 'react-redux';
import { setModalState } from '@/features/modal/modalSlice';

const ConfirmModal = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  return (
    <ModalContent>
      <FlexBox direction="column" alignItems="center">
        {children}

        <Button
          variant="default"
          onClick={() => dispatch(setModalState(false))}
          {...{
            marginTop: '30px',
            [device('tablet')]: {
              width: '100%',
              maxWidth: '100%',
            },
          }}
        >
          확인
        </Button>
      </FlexBox>
    </ModalContent>
  );
};

const ModalContent = styled(Card)(() => ({
  padding: '60px',
  maxWidth: '482px',

  [device('tablet')]: {
    padding: '30px',
  },
}));

export default ConfirmModal;
