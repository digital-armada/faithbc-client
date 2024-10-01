import { auth } from "@/auth";

export async function checkUserRole(allowedRoles: string[]) {
  const session = await auth();
  // @ts-ignore

  return session?.user?.role && allowedRoles.includes(session.user.role);
}
