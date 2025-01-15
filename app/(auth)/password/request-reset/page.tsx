import { auth } from "@/auth";
import { redirect } from "next/navigation";
import RequestPasswordReset from "@/app/(auth)/password/request-reset/_components/RequestPasswordReset";
export default async function RequestResetPage() {
  const session = await auth();

  if (session) redirect("/dashboard/profile");

  return <RequestPasswordReset />;
}
