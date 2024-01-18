'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import SinglePageLayout from '@/components/Layout/SinglePageLayout'
import MentoringPlatformModal from '@/components/Mentoring/MentoringPlatformModal'
import MenteeProfile from '@/components/Profile/MenteeProfile/MenteeProfile'
import ProfileCard, { Footer } from '@/components/Profile/ProfileCard'
import Content from '@/components/Profile/ProfileCard/Content'
import useGetProfileQuery from '@/queries/profileQuery'
import Button from '@/ui/atoms/Button'
import theme from '@/ui/theme'

function MentoringMenteeProfilePage({}) {
  const param = useSearchParams()
  const profileId = param.get('profileId')!
  const mentoringId = param.get('mentoringId')!
  const platform = param.get('platform')
  const { data: profile } = useGetProfileQuery(profileId!)
  const [openModal, setOpenModal] = useState(false)
  return (
    <SinglePageLayout>
      <MenteeProfile profile={profile}>
        <ProfileCard width="313px">
          <Content.Container>
            <Content.Avatar imgUrl={profile?.imgUrl} />
            <Content.Name name={profile?.name!} />
            <Content.EmploymentStatus
              employmentStatus={profile?.employmentStatus!}
            />
            <Content.Job job={profile?.job!} />
            <Content.Tags
              disability={profile?.disability!}
              severity={profile?.severity!}
            />
          </Content.Container>
          <Footer>
            {!platform?.includes('No') && (
              <>
                <Button
                  onClick={() => setOpenModal(true)}
                  size="small"
                  variant="default"
                  color={theme.colors.secondary.main}
                >
                  멘토링 링크 수정
                </Button>
                <MentoringPlatformModal
                  mentoringId={parseInt(mentoringId!)}
                  open={openModal}
                  setOpen={setOpenModal}
                />
              </>
            )}
          </Footer>
        </ProfileCard>
      </MenteeProfile>
    </SinglePageLayout>
  )
}

export default MentoringMenteeProfilePage
