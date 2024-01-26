export interface CommonApiResponse<T = undefined> {
  data?: T;
  status?: number;
  errorMessage?: string;
}

export interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
