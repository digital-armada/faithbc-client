"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { checkSlug } from "../services/event-service";
import { strapiRequest } from "@/src/interface-adapters/strapi-client";

export async function createEvent(formData) {
  // console.log(typeof formData);
  // const data = Object.fromEntries(formData.entries());
  // console.log("data", formData);
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
  } = formData;
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
        featuredImage,
        content,
        slug: validatedSlug,
        startDate,
        endDate,
        startTime,
        endTime,
        organiser,
        venName,
        venAdd,
        internal,
      },
    };

    if (featuredImage) {
      const featuredImageId = parseInt(featuredImage, 10);
      payload.data.featuredImage = featuredImageId;
    }

    if (!endDate) {
      payload.data.endDate = startDate;
    }

    const response = await strapiRequest("POST", "/events", {
      data: payload,
      requireAuth: true,
    });

    if (response.data) {
      revalidatePath("/dashboard/events");
      revalidatePath("/events");
      return { data: response.data };
    } else if (response.error) {
      return { error: response.error || "An error occurred" };
    }

    return { error: "Unexpected response from server" };
  } catch (error) {
    console.error("Error in createEvent:", error);
    return { success: false, message: error || "An error occurred" };
  }
}

export async function updateEvent(eventID, formData) {
  console.log("updateEvent", eventID, formData);
  const {
    title,
    content,
    eventStartDate,
    eventEndDate,
    organiser,
    venName,
    venAdd,
    internal,
    featuredImage,
  } = formData;

  try {
    const session = await auth();
    if (!session?.strapiToken) throw new Error("No auth token found");

    const newSlug = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    const payload = {
      data: {
        ...formData,
        id: eventID,
        // title,
        slug: newSlug,
        // content,
        // startDate,
        // endDate,
        // organiser,
        // venName,
        // venAdd,
        // internal,
        featuredImage: parseInt(featuredImage, 10),
      },
    };
    console.log("payload", payload);
    // if (!endDate) {
    //   payload.data.endDate = startDate;
    // }

    const response = await strapiRequest("PUT", `/events/${eventID}`, {
      data: payload,
      requireAuth: true,
    });

    if (response.data) {
      revalidatePath("/dashboard/events");
      revalidatePath("/events");

      return { response };
    }

    return { error: response.error || "Unexpected response from server" };
  } catch (error) {
    console.error("Error in updateEvent:", error);
    return { success: false, message: error || "An error occurred" };
  }
}

export async function deleteEvent(id: string) {
  try {
    const session = await auth();
    if (!session?.strapiToken) throw new Error("No auth token found");

    const response = await strapiRequest("DELETE", `/events/${id}`, {
      requireAuth: true,
    });

    if (response.data) {
      revalidatePath("/dashboard/events");
      return { data: response.data };
    } else if (response.error) {
      return { error: response.error || "An error occurred" };
    }

    return { error: "Unexpected response from server" };
  } catch (error) {
    console.error("Error in deleteEvent:", error);
    return { success: false, message: error || "An error occurred" };
  }
}
