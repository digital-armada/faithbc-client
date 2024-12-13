import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Link href="/">
        <Image src="/fbc(darker).png" alt="FBC Logo" width={150} height={150} />
      </Link>
      {children}
    </div>
  );
}
