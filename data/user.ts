// import { db } from "@/lib/db";
import axios from "axios";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
