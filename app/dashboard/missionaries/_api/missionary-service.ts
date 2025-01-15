import { getStrapiURL } from "@/lib/utils";
import { auth } from "@/auth";
import qs from "qs";

export async function getMissionaries() {
  const query = qs.stringify(
    {
      filters: {
        id: {
          $ne: 1, // Exclude id 1
        },
      },
      populate: "*",
      pagination: {
        limit: 100,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const baseUrl = getStrapiURL();
  const url = new URL("/api/missionaries?populate=*", baseUrl);
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

    if (data.error) return { ok: false, data: null, error: data.error };
    return { ok: true, data: data, error: null };
  } catch (error) {
    console.log(error);
    return { ok: false, data: null, error: error };
  }
}

export async function getChurch() {
  const query = qs.stringify(
    {
      filters: {
        id: 1,
      },
      populate: "*",
      pagination: {
        limit: 100,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const baseUrl = getStrapiURL();
  const url = new URL("/api/missionaries?populate=*", baseUrl);
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
    console.log(response);
    const data = await response.json();

    if (data.error) return { ok: false, data: null, error: data.error };
    return { ok: true, data: data, error: null };
  } catch (error) {
    console.log(error);
    return { ok: false, data: null, error: error };
  }
}
