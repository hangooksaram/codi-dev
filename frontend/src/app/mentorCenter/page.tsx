'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/user/userSlice';
import Skeleton from 'react-loading-skeleton';
import MentorCenterLoading from './loading';

function MentorCenterPage() {
  const router = useRouter();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user.isMentor) {
      router.replace('/mentorCenter/schedule/');
      return;
    }

    router.push('/noneMentor');
  }, []);

  return <MentorCenterLoading />;
}

export default MentorCenterPage;
