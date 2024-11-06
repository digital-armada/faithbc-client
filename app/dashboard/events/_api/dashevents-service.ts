"server only";
import { auth } from "@/auth";
import { getStrapiURL } from "@/lib/utils";
import qs from "qs";
export async function getDashEvents({
  sort = ["startDate:desc"],
  includesPast = true,
} = {}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to beginning of the day

  const query = qs.stringify(
    {
      sort,
      populate: "*",
      filters: {
        ...(includesPast ? {} : { startDate: { $gte: today.toISOString() } }),
      },
    },
    {
      encodeValuesOnly: true, // This is important for Strapi to parse the filters correctly
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
    const data = await response.json();

    return { ok: true, data: data, error: null };
  } catch (error) {
    console.log(error);
    return { ok: false, data: null, error: error };
  }
}
