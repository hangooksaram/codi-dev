export type RegisterMentorBody = {
  company: string;
  fileUrl: string;
  id: number;
  introduction: string;
  job: string;
};

export interface GetMentorsParameters {
  direction?: string;
  job?: string;
  page: number;
  size: number;
  career?: string;
  disability?: string;
  keyword?: string;
}
