'use client';

import MentorList from '@/components/Mentor/Mentors/MentorList';
import MyInfoCommonContainerCard from '@/components/pages/myInfoCommon/MyInfoCommonContainerCard';
import { useGetFavoriteMentorsQuery } from '@/queries/mentorQuery';
import FlexBox from '@/ui/atoms/FlexBox';
import LabelBox from '@/ui/molecules/LabelBox';

function FavoritesPage() {
  const { data, isSuccess } = useGetFavoriteMentorsQuery();

  return (
    <FlexBox direction="column">
      <LabelBox text="관심 멘토" />
      <MyInfoCommonContainerCard>
        {isSuccess && <MentorList mentors={data!} />}
      </MyInfoCommonContainerCard>
    </FlexBox>
  );
}

export default FavoritesPage;
