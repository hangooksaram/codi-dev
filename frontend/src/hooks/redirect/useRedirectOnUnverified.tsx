import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/user/userSlice';
import { useDispatch } from 'react-redux';
import { setCurrentModal, setModalState } from '@/features/modal/modalSlice';
import { useState } from 'react';
import useModalCallback from '../useModalCallback';
import { REDIRECT_ROUTES } from '@/constants';

const useRedirectOnUnverified = () => {
  const router = useRouter();
  const pathname = usePathname();
  const user = useSelector(selectUser);
  const [redirectRoute, setRedirectRoute] = useState<string | null>(null);
  const dispatch = useDispatch();
  useModalCallback({
    confirmCallback: () => router.replace(redirectRoute!),
    cancelCallback: () => router.replace('/'),
  });

  const checkRedirectRoutes = (id?: string, isProfile?: boolean) => {
    const userId = id ?? user.id;
    const isUserProfile = isProfile ?? user.isProfile;

    if (!isRedirectPage(pathname)) {
      return;
    }

    for (const route of REDIRECT_ROUTES) {
      if (pathname.includes(route.currentRoute)) {
        const isNotUser = !userId && route.allowed === 'user';
        const isNotProfile = !isUserProfile && route.allowed === 'profile';

        if (isNotUser || isNotProfile) {
          setRedirectRoute(route.redirectRoute);
          dispatch(
            setCurrentModal({
              text: route.message,
              currentModalType: 'select',
            }),
          );
          dispatch(setModalState(true));

          return;
        }
      }
    }
  };

  return checkRedirectRoutes;
};

const isRedirectPage = (currentUrl: string) => {
  return REDIRECT_ROUTES.some(({ currentRoute }) =>
    currentRoute.includes(currentUrl),
  );
};

export default useRedirectOnUnverified;
