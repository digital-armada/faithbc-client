import Link from "next/link";

export default function ConfirmationError() {
  return (
    <p>
      It looks like you {"haven't"} confirmed your email yet. Check your email
      client for a confirmation email. Did not find it?{" "}
      <Link href="/confirmation/newrequest" className="underline">
        Resend the confirmation email.
      </Link>
    </p>
  );
}
