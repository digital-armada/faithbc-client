"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
export function SignOut() {
  return (
    <div className="flex items-center justify-center">
      <LogOut className="mr-3 h-4 w-4 text-muted-foreground" />
      <div onClick={() => signOut()}>Sign Out</div>
    </div>
  );
}
