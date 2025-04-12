import { auth } from "@/auth";
import SignInForm from "@/features/auth/components/SigninForm";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (session?.strapiToken) {
    redirect("/dashboard");
    return <div>Already signed in</div>;
  }

  return <SignInForm />;
}
