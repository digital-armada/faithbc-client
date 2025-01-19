import { IAuthenticationService } from "@/src/domain/interfaces/IAuthenticationService";
import { auth } from "@/lib/auth";
import {
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
} from "@/lib/auth";
import { Session } from "next-auth";

export class AuthService implements IAuthenticationService {
  async getSession(): Promise<Session | null> {
    return await auth();
  }

  async signIn(provider: string, options?: any): Promise<void> {
    await nextAuthSignIn(provider, options);
  }

  async signOut(): Promise<void> {
    return await nextAuthSignOut();
  }
  async isAuthenticated(): Promise<boolean> {
    const session = await this.getSession();
    return !!session;
  }

  async getUser(): Promise<Session["user"] | null> {
    const session = await this.getSession();
    return session?.user || null;
  }
}
