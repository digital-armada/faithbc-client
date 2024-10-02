import { auth } from "@/auth";
import ResetPassword from "@/components/auth/password/ResetPassword";
import { redirect } from "next/navigation";

type Props = {
  searchParams: {
    code?: string;
  };
};

export default async function page({ searchParams }: Props) {
  const session = await auth();
  // if the user is logged in, redirect to account where password change is possible
  if (session) redirect("/dashboard/profile");
  return <ResetPassword code={searchParams.code} />;
}
