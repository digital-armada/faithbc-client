"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BreadCrumbs() {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").slice(1);
  const lastSegment = pathSegments[pathSegments.length - 1];

  return (
    <div className="mb-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem key="home">
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {pathSegments.map((segment, index) => {
            const title = segment
              .replace(/-/g, " ")
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");
            if (segment === lastSegment) {
              return (
                <BreadcrumbItem key={segment}>
                  <BreadcrumbPage>{title}</BreadcrumbPage>
                </BreadcrumbItem>
              );
            }
            return (
              <BreadcrumbItem key={segment}>
                <BreadcrumbLink asChild>
                  <Link href={`/${pathSegments.slice(0, index + 1).join("/")}`}>
                    {title}
                  </Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </BreadcrumbItem>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
