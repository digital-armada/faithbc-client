import { ZodError } from "zod";

const handleError = (error: any) => {
  if (error instanceof ZodError) {
    return {
      error: true,
      inputErrors: error.flatten().fieldErrors,
      message: "Please verify your data.",
    };
  }
  console.error("Error in createNewAnnouncement:", error);
  return { success: false, message: error.message || "An error occurred" };
};

export default handleError;
