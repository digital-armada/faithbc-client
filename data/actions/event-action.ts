// @ts-nocheck
"use server";

import { auth } from "@/auth";
import { mutateData } from "@/data/services/mutate-data";
import { revalidatePath } from "next/cache";
import { checkSlug } from "../services/event-service";

export async function createEvent(formData) {
  const {
    title,
    startDate,
    endDate,
    startTime,
    endTime,
    organiser,
    venName,
    venAdd,
    internal,
    content,
    featuredImage,
  } = Object.fromEntries(formData.entries());
  console.log(formData);
  try {
    const session = await auth();
    if (!session?.strapiToken) throw new Error("No auth token found");

    const slug = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    const { message, slug: validatedSlug } = await checkSlug({ slug });

    if (message) {
      return { error: message };
    }

    const payload = {
      data: {
        title,
        content,
        slug: validatedSlug,
        startDate,
        endDate,
        startTime,
        endTime,
        organiser,
        venName,
        venAdd,
        internal: internal === "on" || internal === true,
      },
    };

    if (featuredImage) {
      const featuredImageId = parseInt(featuredImage, 10);
      payload.data.featuredImage = featuredImageId;
    }

    if (!endDate) {
      payload.data.endDate = startDate;
    }

    const response = await mutateData("POST", "/api/events", payload);

    if (response.data) {
      revalidatePath("/dashboard/events");
      return { data: response.data };
    } else if (response.error) {
      return { error: response.error.message || "An error occurred" };
    }

    return { error: "Unexpected response from server" };
  } catch (error) {
    console.error("Error in createEvent:", error);
    return { error: error.message || "An error occurred" };
  }
}

export async function updateEvent(formData) {
  const {
    id,
    slug,
    title,
    startDate,
    endDate,
    organiser,
    venName,
    venAdd,
    internal,
    content,
    featuredImage,
  } = Object.fromEntries(formData.entries());
  console.log(formData);
  try {
    const session = await auth();
    if (!session?.strapiToken) throw new Error("No auth token found");

    const newSlug = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    const payload = {
      data: {
        title,
        slug: newSlug,
        content,
        startDate,
        endDate,
        organiser,
        venName,
        venAdd,
        internal: internal === "on" || internal === true,
      },
    };

    if (featuredImage && featuredImage !== "{ data: null }") {
      const featuredImageId = parseInt(featuredImage, 10);
      if (!isNaN(featuredImageId)) {
        payload.data.featuredImage = featuredImageId;
      }
    }

    if (!endDate) {
      payload.data.endDate = startDate;
    }

    const eventId = id;

    const response = await mutateData("PUT", `/api/events/${eventId}`, payload);

    if (response.data) {
      revalidatePath("/dashboard/events");
      return { data: response.data };
    } else if (response.error) {
      return { error: response.error.message || "An error occurred" };
    }

    return { error: "Unexpected response from server" };
  } catch (error) {
    console.error("Error in updateEvent:", error);
    return { error: error.message || "An error occurred" };
  }
}

export async function deleteEvent(id: string) {
  try {
    const session = await auth();
    if (!session?.strapiToken) throw new Error("No auth token found");

    const response = await mutateData("DELETE", `/api/events/${id}`);

    if (response.data) {
      revalidatePath("/dashboard/events");
      return { data: response.data };
    } else if (response.error) {
      return { error: response.error.message || "An error occurred" };
    }

    return { error: "Unexpected response from server" };
  } catch (error) {
    console.error("Error in deleteEvent:", error);
    return { error: error.message || "An error occurred" };
  }
}
