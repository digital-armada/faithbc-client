import { IAuthenticationService } from "@/src/domain/interfaces/IAuthenticationService";

export async function checkUserRole(
  allowedRoles: string[],
  authService: IAuthenticationService,
): Promise<boolean> {
  const user = await authService.getUser();
  return !!user?.role && allowedRoles.includes(user.role);
}
