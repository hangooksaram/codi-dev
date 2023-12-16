export interface User {
  id?: string;
  isMentor?: boolean;
  isProfile?: boolean;
  profileImageUrl?: string;
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
