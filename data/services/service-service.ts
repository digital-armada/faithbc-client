import { auth } from "@/lib/auth";
import { getStrapiURL } from "@/lib/utils";

export async function getServices() {
  const baseUrl = getStrapiURL();
  const url = new URL("/api/service-type", baseUrl);
  const session = await auth();

  try {
    const response = await fetch(url.href, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.strapiToken}`,
      },
      // cache: "no-cache",
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
