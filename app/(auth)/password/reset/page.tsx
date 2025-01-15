import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ResetPassword from "./_components/ResetPassword";

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
