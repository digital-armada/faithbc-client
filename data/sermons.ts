import { auth } from "@/auth";
import { API_CONFIG } from "@/lib/constants/api-endpoints";

export async function getSermonsByYoutubeIds(youtubeIds) {
  try {
    const idsQuery = youtubeIds
      .map((id) => `filters[youtubeId][$in]=${id}`)
      .join("&");
    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/sermons?${idsQuery}&fields[0]=youtubeId&pagination[limit]=100`;

    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (res.status !== 200) {
      throw new Error("Failed to fetch sermons");
    }

    const data = await res.json();
    return data.data.reduce((acc, sermon) => {
      acc[sermon.attributes.youtubeId] = sermon.id;
      return acc;
    }, {});
  } catch (error) {
    console.error("Failed to fetch sermons:", error);
    return {};
  }
}

export async function getSermon(id: string) {
  const session = await auth();

  if (!session?.strapiToken) {
    throw new Error("Unauthorized");
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/sermons/${id}?populate=*`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.strapiToken}`,
        },
      },
    );

    if (res.status !== 200) {
      const errorBody = await res.text();
      console.error("Error response:", errorBody);
      throw new Error(`Failed to fetch sermon: ${res.status} ${errorBody}`);
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Failed to fetch sermon:", error);
    throw new Error("Failed to fetch sermon");
  }
}
//   const baseUrl = getStrapiURL();
//   const url = new URL(`/api/sermons/${id}`, baseUrl);
//   url.searchParams.append("populate", "*");
//
//   const session = await auth();
//
//   if (!session?.strapiToken) {
//     throw new Error("Unauthorized");
//   }
//
//   const res = await fetch(url.toString(), {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${session.strapiToken}`,
//     },
//     next: { revalidate: 60 }, // Optionally add caching, adjust as needed
//   });
//
//   if (!res.ok) {
//     throw new Error(`Failed to fetch sermon: ${res.status} ${res.statusText}`);
//   }
//
//   const data = await res.json();
//
//   if (!data.data) {
//     throw new Error("Sermon not found");
//   }
//
//   return data.data;
// }

export async function getLatestFourSermons() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/sermons?pagination[limit]=4&sort=date:desc&[populate]=*`,
      {
        next: { revalidate: 60 },
      },
    );
    if (res.status !== 200) {
      throw new Error("Failed to fetch sermons");
    }

    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch sermons");
  }
}

export async function getSermons({ pageIndex = 0, pageSize = 10 }) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/sermons?pagination[page]=${pageIndex + 1}&pagination[pageSize]=${pageSize}&populate=*&sort=date:desc`,
      {
        next: { revalidate: 60 },
      },
    );

    if (res.status !== 200) {
      throw new Error("Failed to fetch sermons");
    }

    const data = await res.json();
    return {
      sermons: data.data,
      pageCount: Math.ceil(data.meta.pagination.total / pageSize),
    };
  } catch (error) {
    console.error("Failed to fetch sermons:", error);
    throw new Error("Failed to fetch sermons");
  }
}

export async function getInfiniteSermons({ page = 1, search = "" }) {
  try {
    let url = `${API_CONFIG.API_URL}/sermons?populate=*&sort=date:desc&pagination[page]=${page}`;

    if (search && search.trim()) {
      url += `&filters[name][$contains]=${encodeURIComponent(search)}`;
    }

    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (res.status !== 200) {
      throw new Error("Failed to fetch sermons");
    }
    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
}
