import { postRequest } from './common'

export interface AuthInfo {
  userId: string,
  password: string,
}

export class AuthService {
  private static _instance: AuthService
  static getInstance(): AuthService {
    if (!AuthService._instance) {
      AuthService._instance = new AuthService()
    }
    return AuthService._instance
  }

  public async login(body: AuthInfo): Promise<any> {
    const reqBody = {
      user_id: body.userId,
      password: body.password
    }
    return postRequest("/login", reqBody)
  }
}