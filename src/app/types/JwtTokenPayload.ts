export default interface JwtTokenPayload {
  userId: string,
  email: string,
  role: string,
  exp: number
}