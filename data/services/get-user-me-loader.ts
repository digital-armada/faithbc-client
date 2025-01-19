import { auth } from "@/lib/auth";
import { getStrapiURL } from "@/lib/utils";
import qs from "qs";

const query = qs.stringify({
  populate: {
    role: true,
    image: { fields: ["url", "alternativeText"] },
    address: true,
  },
});

export async function getUserMeLoader() {
  const baseUrl = getStrapiURL();
  const url = new URL("/api/users/me?populate=*", baseUrl);
  url.search = query;
  const session = await auth();
  // const authToken = await getAuthToken();
  // if (!authToken) return { ok: false, data: null, error: null };
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
    // console.log("data", data);
    if (data.error) return { ok: false, data: null, error: data.error };
    return { ok: true, data: data, error: null };
  } catch (error) {
    console.log(error);
    return { ok: false, data: null, error: error };
  }
}
