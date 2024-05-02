import { selectModal, setCurrentModal } from '@/features/modal/modalSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const useModalCallback = ({
  confirmCallback,
  cancelCallback,
}: {
  confirmCallback?: Function;
  cancelCallback?: Function;
}) => {
  const dispatch = useDispatch();
  const { isConfirmed, isCanceled } = useSelector(selectModal);
  useEffect(() => {
    if (isConfirmed) {
      confirmCallback!();
      setTimeout(() => {
        dispatch(
          setCurrentModal({
            isConfirmed: false,
          }),
        );
      });
      return;
    }

    if (isCanceled) {
      cancelCallback!();
      setTimeout(() => {
        dispatch(
          setCurrentModal({
            isCanceled: false,
          }),
        );
      });
    }
  }, [isConfirmed, isCanceled]);
};

export default useModalCallback;
