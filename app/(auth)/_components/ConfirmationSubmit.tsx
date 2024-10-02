// frontend/src/components/auth/confirmation/ConfirmationSubmit.tsx

import Link from "next/link";
import React from "react";

type Props = {
  confirmationToken?: string;
};

export function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 rounded-sm bg-zinc-100 px-4 py-8">{children}</div>
  );
}

export default async function ConfirmationSubmit({ confirmationToken }: Props) {
  if (!confirmationToken || confirmationToken === "") {
    return (
      <Wrapper>
        <h2 className="mb-4 text-lg font-bold">Error</h2>
        <p>Token is not valid.</p>
      </Wrapper>
    );
  }

  // send email validation request to strapi and wait for the response.
  try {
    const strapiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/email-confirmation?confirmation=${confirmationToken}`,
    );
    if (!strapiResponse.ok) {
      let error = "";
      const contentType = strapiResponse.headers.get("content-type");
      if (contentType === "application/json; charset=utf-8") {
        const data = await strapiResponse.json();
        error = data.error.message;
      } else {
        error = strapiResponse.statusText;
      }
      return (
        <Wrapper>
          <h2 className="mb-4 text-lg font-bold">Error</h2>
          <p>Error: {error}</p>
        </Wrapper>
      );
    }
    // success, do nothing
  } catch (error: any) {
    return (
      <Wrapper>
        <h2 className="mb-4 text-lg font-bold">Error</h2>
        <p>{error.message}</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h2 className="mb-4 text-lg font-bold">Email confirmed.</h2>
      <p>
        Your email was successfully verified. You can now{" "}
        <Link href="/login" className="underline">
          login
        </Link>
        .
      </p>
    </Wrapper>
  );
}
