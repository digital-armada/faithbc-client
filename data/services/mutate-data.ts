import { auth } from "@/auth";
import { getStrapiURL } from "@/lib/utils";

export async function mutateData(method: string, path: string, payload?: any) {
  const baseUrl = getStrapiURL();
  const session = await auth();
  const url = new URL(path, baseUrl);

  console.log("mutateData payload:", payload);
  console.log("mutateData URL:", url.toString());

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.strapiToken}`,
      },
      body: JSON.stringify(payload),
    });

    // Log the entire response for debugging
    console.log("HTTP response status:", response.status);
    console.log("HTTP response headers:", response.headers);

    const responseBody = await response.text();
    console.log("HTTP response body:", responseBody);

    if (!response.ok) {
      // Log detailed error information
      try {
        const errorData = JSON.parse(responseBody);
        console.error("Error response data:", errorData);
        throw new Error(
          `Request failed with status ${response.status}: ${errorData.message}`,
        );
      } catch (parseError) {
        console.error("Failed to parse error response:", parseError);
        throw new Error(
          `Request failed with status ${response.status} and unparseable error response`,
        );
      }
    }

    const data = JSON.parse(responseBody);
    return data;
  } catch (error) {
    console.error("Network or parsing error:", error);
    throw error;
  }
}

// export async function mutateData(method: string, path: string, payload?: any) {
//   const baseUrl = getStrapiURL();
//   const session = await auth();
//   const url = new URL(path, baseUrl);
//
//   console.log("mutateData payload:", payload);
//
//   try {
//     const response = await fetch(url, {
//       method: method,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${session?.strapiToken}`,
//       },
//       body: JSON.stringify(payload),
//     });
//
//     // Log the entire response for debugging
//     console.log("HTTP response:", response);
//
//     if (!response.ok) {
//       // Log detailed error information
//       const errorData = await response.json();
//       console.error("Error response data:", errorData);
//       throw new Error(
//         `Request failed with status ${response.status}: ${errorData.message}`,
//       );
//     }
//
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Network or parsing error:", error);
//     throw error;
//   }
// }
