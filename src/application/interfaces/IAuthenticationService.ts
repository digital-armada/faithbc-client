import { Session } from "next-auth";

export interface IAuthenticationService {
  getSession(): Promise<Session | null>;
  signIn(provider: string, options?: any): Promise<void>;
  signOut(): Promise<void>;
  isAuthenticated(): Promise<boolean>;
  getUser(): Promise<Session["user"] | null>;
}
