export async function GET() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/sermons?pagination[limit]=4&populate=*&sort=date:desc`,
      {
        next: { revalidate: 10 }, // Revalidate every 60 seconds
      },
    );

    console.log(res);
    if (res.status !== 200) {
      throw new Error("Failed to fetch sermons");
    }

    const data = await res.json();
    console.log(data);

    return Response.json({ data });
  } catch (error) {
    throw new Error("Failed to fetch sermons");
  }
}
