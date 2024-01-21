import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { HOMEPAGE_URL } from '@/constants'
import { selectUser } from '@/features/user/userSlice'
import FlexBox from '@/ui/atoms/FlexBox'
import StyledImage from '@/ui/atoms/StyledImage'
import { copyText } from '@/utils/clipboard'

function ApplyAndShareButtons() {
  const { isMentor, id } = useSelector(selectUser)
  const router = useRouter()

  useEffect(() => {
    copyText('recommend', 'homepageUrl', '홈페이지 주소')
  }, [])

  return (
    <FlexBox>
      {!isMentor && (
        <StyledImage
          width="651px"
          height="251px"
          src="/images/main-mentor-apply.png"
          alt="apply-button"
          {...{ cursor: 'pointer' }}
          onClick={() => router.push(id ? `/mentorApplyForm` : `/signup`)}
        />
      )}
      <input
        style={{ position: 'absolute', top: -200 }}
        id="homepageUrl"
        value="ffff"
      />
      <StyledImage
        id="recommend"
        width="651px"
        height="251px"
        src="/images/main-mentor-recommend.png"
        alt="recommend-button"
        {...{ cursor: 'pointer' }}
      />
    </FlexBox>
  )
}

export default ApplyAndShareButtons
