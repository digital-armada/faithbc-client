import { getStrapiURL } from "@/lib/utils";
import { auth } from "@/auth";
import qs from "qs";

const query = qs.stringify({
  filters: {
    missionary: {
      name: {
        $eq: "Church",
      },
    },
  },

  populate: "*",
});

export async function getChurchPrayers() {
  const baseUrl = getStrapiURL();
  const url = new URL("/api/prayeritems", baseUrl);
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
export async function getPrayers() {
  const baseUrl = getStrapiURL();
  const url = new URL("/api/prayeritems?populate=*", baseUrl);
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
    console.log(data);
    if (data.error) return { ok: false, data: null, error: data.error };

    return { ok: true, data: data, error: null };
  } catch (error) {
    console.log(error);
    return { ok: false, data: null, error: error };
  }
}
