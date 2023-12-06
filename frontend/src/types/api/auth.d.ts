export interface CheckAccessTokenResponse {
  isLoggedIn: boolean;
}

export interface CheckLoginInfoResponse {
  id?: string;
  isMentor?: boolean;
  isProfile?: boolean;
  imgUrl?: string;
}
