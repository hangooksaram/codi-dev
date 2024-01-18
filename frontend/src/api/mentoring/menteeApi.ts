import { ApplyMentoringBody } from '@/types/api/mentoring'
import customAxios from '../customAxios'
import { handleApiError } from '@/utils/api'

export const applyMentoring = async (
  mentorId: number,
  application: ApplyMentoringBody,
) => {
  try {
    const { status } = await customAxios.post(
      `/mentees/mentoring/apply/${mentorId}`,
      application,
    )
    return { status }
  } catch (e: unknown) {
    return handleApiError(e)
  }
}

export const cancelMentoring = async (mentorId: number) => {
  try {
    const { status } = await customAxios.patch(
      `/mentees/mentoring/applications/${mentorId}/cancel`,
    )
    return { status }
  } catch (e: unknown) {
    return handleApiError(e)
  }
}
