export class User {
  id: string
  firstName: string
  lastName: string
  credential: Credential
  token: string
}

export class Credential {
  username: string
  password: string
}
