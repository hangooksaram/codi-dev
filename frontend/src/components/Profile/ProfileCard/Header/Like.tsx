import { useEffect, useState } from 'react';
import FilledLike from '@icons/common/filled-like.svg';
import EmptyLike from '@icons/common/empty-like.svg';
import { likeMentor, unLikeMentor } from '@/api/mentorApi';
import Button from '@/ui/atoms/Button';
import theme from '@/ui/theme';

function Like({
  mentorId,
  favorites,
}: {
  mentorId?: number;
  favorites?: number[];
}) {
  const [localFavoriteState, setLocalFavoriteState] = useState(false);
  const toggleLikeMentor = async () => {
    if (localFavoriteState) {
      await unLikeMentor(mentorId!);
    } else {
      await likeMentor(mentorId!);
    }
    setLocalFavoriteState((prev) => !prev);
  };

  useEffect(() => {
    setLocalFavoriteState(favorites?.includes(mentorId!)!);
  }, [favorites]);
  return (
    <Button
      onClick={toggleLikeMentor}
      variant="round"
      width="48px"
      color={localFavoriteState ? theme.colors.info.main : theme.colors.white}
      {...{ position: 'absolute', top: '0px', right: '0px' }}
    >
      {localFavoriteState ? <FilledLike /> : <EmptyLike />}
    </Button>
  );
}

export default Like;
