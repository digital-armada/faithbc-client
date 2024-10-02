import Link from "next/link";

export default function ConfirmationMessage() {
  return (
    <div className="mb-8 max-w-lg rounded-sm bg-zinc-100 px-4 py-8">
      <h2 className="mb-4 text-lg font-bold">Please confirm your email.</h2>
      <p>
        We sent you an email with a confirmation link. Please open this email
        and click the link to confirm your email.
      </p>
      <h3 className="my-4 font-bold">No email found?</h3>
      <p>If you did not receive an email with a confirmation link</p>
      <ul>
        <li>&bull;&nbsp;Check your email spam folder</li>
        <li>&bull;&nbsp;Wait a couple of minutes</li>
        <li>
          &bull;&nbsp;
          <Link href="/confirmation/newrequest" className="underline">
            Request a new confirmation email.
          </Link>
        </li>
      </ul>
      <p className="mt-10">
        If you are still having trouble, please contact us at{" "}
        <a className="underline" href="mailto:communications@faithbc.org.au">
          communications@faithbc.org.au
        </a>
      </p>
    </div>
  );
}
