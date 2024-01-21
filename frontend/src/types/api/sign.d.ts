export type SignUpBody = {
  birth: string
  email: string
  gender: string
  id: string
  name: string
  password: string
}

export type SignInBody = {
  id: string
  password: string
}

export interface UpdatePasswordBody {
  newPassword: string
  oldPassword: String
}
