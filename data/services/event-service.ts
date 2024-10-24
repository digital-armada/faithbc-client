// event-service.ts

import { getStrapiURL } from "@/lib/utils";
import { mutateData } from "./mutate-data";
import qs from "qs";
import { auth } from "@/auth";

export async function updateEvent(eventData) {
  console.log(eventData);
  //   try {
  //     const response = await mutateData(
  //       "PUT",
  //       `/api/events/${eventData.slug}`,
  //       eventData,
  //     );
  //
  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       console.error("Error Response:", errorData);
  //       throw new Error("Failed to update event");
  //     }
  //
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error("Update Event Service Error:", error);
  //     throw error;
  //   }
}

export async function checkSlug({ slug }: { slug: string }) {
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const baseUrl = getStrapiURL();
  const url = new URL("/api/events", baseUrl);
  url.search = query;
  const session = await auth();

  try {
    const response = await fetch(url.href, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.strapiToken}`,
      },
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.data && data.data.length > 0) {
      return { message: "Slug already exists", slug: null };
    } else {
      return { message: null, slug };
    }
  } catch (error) {
    console.error("Error checking slug:", error);
    return { message: "Error checking slug", slug: null };
  }
}
