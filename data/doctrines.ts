import { strapiRequest } from "@/src/interface-adapters/strapi-client";

export async function getStatement(slug: string) {
  try {
    const response = await strapiRequest("GET", `/doctrines/${slug}`);
    return response;
  } catch (error) {
    throw new Error("Failed to fetch statements");
  }
}

export async function getStatements() {
  try {
    const response = await strapiRequest(
      "GET",
      `/doctrines?pagination[limit]=30`,
    );
    return response;
  } catch (error) {
    throw new Error("Failed to fetch statements");
  }

  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/doctrines?pagination[limit]=30`,
  //     );
  //
  //     if (res.status !== 200) {
  //       throw new Error("Failed to fetch statements");
  //     }
  //
  //     return res.json();
  //   } catch (error) {
  //     throw new Error("Failed to fetch statements");
  //   }
}
