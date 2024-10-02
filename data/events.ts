import { auth } from "@/auth";
import { getStrapiURL } from "@/lib/utils";
import qs from "qs";

export async function getEventSlug(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/events/${slug}?populate=*`,
      {
        next: { revalidate: 60 },
      },
    );

    if (res.status !== 200) {
      throw new Error("Failed to fetch event");
    }

    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch event" + error);
  }
}

export async function getEvent(id: string) {
  const query = qs.stringify(
    {
      populate: "*",
    },
    {
      encodeValuesOnly: true, // This is important for Strapi to parse the filters correctly
    },
  );
  const baseUrl = getStrapiURL();
  const url = new URL(`/api/events/${id}`, baseUrl);
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
    const { data } = await response.json();
    console.log(data);

    return { ok: true, data: data.attributes, error: null };
  } catch (error) {
    console.log(error);
    return { ok: false, data: null, error: error };
  }
}

export async function getEvents({
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

export async function getDashEvents({ sort = ["startDate:desc"] } = {}) {
  const query = qs.stringify(
    {
      // filters: {
      //   public: {
      //     $eq: true,
      //   },
      // },
      sort,

      populate: "*",
      pagination: {
        limit: 100,
      },
    },
    {
      encodeValues: true,
    },
  );

  const baseUrl = getStrapiURL();
  const url = new URL("/api/events?", baseUrl);
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

// export async function getDashEvents() {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_STRAPI_URL}/events?populate=*&sort=createdAt:desc`,
//       {
//         next: { revalidate: 60 },
//       },
//     );
//     if (res.status !== 200) {
//       throw new Error("Failed to fetch users");
//     }
//
//     return res.json();
//   } catch (error) {
//     throw new Error("Failed to fetch users");
//   }
// }

export async function getLatestEvents() {
  const currentDate = new Date().toISOString().split("T")[0]; // Cutting the time out so events that are 12:00am are not automatically filtered out.

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/events?populate=*&sort=createdAt:desc&filters[startDate][$gte]=${currentDate}`,
      {
        next: { revalidate: 60 },
      },
    );
    if (res.status !== 200) {
      throw new Error("Failed to fetch users");
    }

    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
}

export async function getInfiniteEvents({
  page = 1,
  // search = ''
}) {
  try {
    let url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/events?populate=*&sort=startDate:desc&pagination[page]=${page}`;

    // if (search && search.trim()) {
    //     url += `&filters[name][$contains]=${encodeURIComponent(search)}`;
    // }

    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (res.status !== 200) {
      throw new Error("Failed to fetch events");
    }

    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch events:" + error);
  }
}

export async function getNotifications() {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_STRAPI_URL +
        "/api/events?filters[eventType][$contains]=notifications&populate=*&sort=createdAt:desc",
      { cache: "no-store" },
    );
    if (!res.ok) {
      throw new Error("Failed to fetch events");
    }
    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch notifications: " + error);
  }
}
