import { getStrapiURL } from "@/lib/utils";
import { auth } from "@/auth";

export async function getComms() {
  const baseUrl = getStrapiURL();
  const url = new URL("/api/commgroups?populate=*", baseUrl);
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

export async function getComm(id) {
  const baseUrl = getStrapiURL();
  const url = new URL(`/api/commgroups/${id}?populate=*`, baseUrl);
  const session = await auth();
  if (!session) return { ok: false, data: null, error: null };

  try {
    const response = await fetch(url.href, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.strapiToken}`,
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
