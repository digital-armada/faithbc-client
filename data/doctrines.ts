import { strapiRequest } from "@/lib/strapi-service";

export async function getStatement(slug: string) {
  console.log("SLUG", slug);
  try {
    const response = await strapiRequest("GET", `/doctrines/${slug}`);
    return response;
  } catch (error) {
    throw new Error("Failed to fetch statements");
  }
}

export async function getStatements() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/doctrines?pagination[limit]=30`,
    );

    if (res.status !== 200) {
      throw new Error("Failed to fetch statements");
    }

    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch statements");
  }
}
