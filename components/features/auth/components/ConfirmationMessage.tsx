import Link from "next/link";

export default function ConfirmationMessage() {
  return (
    <div className="mb-8 rounded-sm bg-zinc-100 px-4 py-8">
      <h2 className="mb-4 text-lg font-bold">Please confirm your email.</h2>
      <p>
        We sent you an email with a confirmation link. Please open this email
        and click the link to confirm your [project name] account and email.
      </p>
      <h3 className="my-4 font-bold">No email found?</h3>
      <p>
        If you did not receive an email with a confirmation link please check
        your spam folder or wait a couple of minutes.
      </p>
      <p>
        Still no email?{" "}
        <Link href="/confirmation/newrequest" className="underline">
          Request a new confirmation email.
        </Link>
      </p>
    </div>
  );
}
