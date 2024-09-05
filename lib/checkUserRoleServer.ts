import { auth } from "@/auth";

export async function checkUserRole(allowedRoles: string[]) {
  const session = await auth();
  return session?.user?.role && allowedRoles.includes(session.user.role);
}
