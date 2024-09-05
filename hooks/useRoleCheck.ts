// hooks/useRoleCheck.ts
import { useSession } from "next-auth/react";

export function useRoleCheck(allowedRoles: string[]) {
  const { data: session } = useSession();
  const userRoles = session?.user?.role ? [session.user.role] : [];
  return allowedRoles.some((role) => userRoles.includes(role));
}
