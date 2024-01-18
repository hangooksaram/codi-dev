'use client'

import MentorProfile from '@/components/Profile/MentorProfile/MentorProfile'
import MentorStatus from '@/components/Profile/MentorProfile/MentorStatus'
import ProfileCard from '@/components/Profile/ProfileCard'
import Content from '@/components/Profile/ProfileCard/Content'
import { useGetMentorQuery } from '@/queries/mentorQuery'

function MentorProfilePage() {
  const { data: mentor, isSuccess } = useGetMentorQuery()
  return (
    isSuccess && (
      <MentorProfile mentor={mentor!}>
        <ProfileCard width="313px">
          <Content.Container>
            <Content.Avatar imgUrl={mentor?.imgUrl} />
            <Content.Name name={mentor?.name!} />
            <Content.Job job={mentor?.job!} />
            <Content.Rating star={mentor?.star!} mentees={mentor?.mentees!} />
            <Content.Tags
              career={mentor?.career}
              disability={mentor?.disability!}
              severity={mentor?.severity!}
            />
          </Content.Container>
          <MentorStatus />
        </ProfileCard>
      </MentorProfile>
    )
  )
}

export default MentorProfilePage
