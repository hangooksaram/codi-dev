export interface User {
  id: string;
  imgUrl: string;
  mentorId: string;
  profileId: string;
}

export interface Token {
  access: TokenInformation;
  refresh: TokenInformation;
}

export interface TokenInformation {
  value: string;
  expiredTime: number;
}

export interface AuthSliceState {
  token?: Token;
}
