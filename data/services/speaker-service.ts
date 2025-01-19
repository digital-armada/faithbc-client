import { auth } from "@/lib/auth";
import { getStrapiURL } from "@/lib/utils";

export async function getSpeakers() {
  const baseUrl = getStrapiURL();
  const url = new URL("/api/speakers", baseUrl);

  // Add pagination parameter to get all results
  url.searchParams.append("pagination[pageSize]", "10000"); // Set a large number

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

export async function addOrUpdateSpeaker(speakerData, id = null) {
  const baseUrl = getStrapiURL();
  const url = new URL(id ? `/api/speakers/${id}` : "/api/speakers", baseUrl);
  const session = await auth();

  // Handle relation fields
  if (speakerData.relatedEntity) {
    speakerData.relatedEntity = {
      connect: [{ id: speakerData.relatedEntity }],
    };
  }

  try {
    const response = await fetch(url.href, {
      method: id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.strapiToken}`,
      },
      body: JSON.stringify({ data: speakerData }),
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
