// "use client";
// // components/RoleProtected.tsx
// import { ReactNode } from "react";
// import { useRoleCheck } from "@/hooks/useRoleCheck";
//
// interface RoleProtectedProps {
//   children: ReactNode;
//   allowedRoles: string[];
//   fallback?: ReactNode;
// }
//
// export default function RoleProtected({
//   children,
//   allowedRoles,
//   fallback = null,
// }: RoleProtectedProps) {
//   const hasAccess = useRoleCheck(allowedRoles);
//
//   if (!hasAccess) {
//     return fallback;
//   }
//
//   return <>{children}</>;
// }
