export interface CommonApiResponse<T = undefined> {
  data?: T?;
  status?: number;
  errorMessage?: string;
}
