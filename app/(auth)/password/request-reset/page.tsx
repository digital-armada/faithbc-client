import { redirect } from "next/navigation";
import RequestPasswordReset from "@/components/auth/password/RequestPasswordReset";
import { auth } from "@/auth";

export default async function RequestResetPage() {
  // const session = await getServerSession(authOptions);
  const session = await auth();
  console.log(session);
  if (session) redirect("/dashboard/profile");
  return <RequestPasswordReset />;
}
