import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ResetPassword from "./_components/ResetPassword";

type Props = {
  searchParams: Promise<{
    code?: string;
  }>;
};

export default async function page(props: Props) {
  const searchParams = await props.searchParams;
  const session = await auth();
  // if the user is logged in, redirect to account where password change is possible
  if (session) redirect("/dashboard/profile");
  return <ResetPassword code={searchParams.code} />;
}
