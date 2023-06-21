export type ProfileType = {
  uid: string
  email: string | null
  emailVerified: boolean
  isAnonymous: boolean
  providerId: string
  displayName: string | null
  phoneNumber: string | null
  photoURL: string | null
  refreshToken: string
}

export type ArgAuthType = {
  email: string
  password: string
}