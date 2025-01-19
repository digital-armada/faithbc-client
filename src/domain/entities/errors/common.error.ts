import { ZodError } from "zod";

export class DatabaseOperationError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export class NotFoundError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export class InputParseError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export class ErrorHandler {
  static handleError(error: any) {
    if (error instanceof ZodError) {
      return {
        error: true,
        inputErrors: error.flatten().fieldErrors,
        message: "Please verify your data.",
      };
    }
    console.error("Error:", error);
    return { success: false, message: error.message || "An error occurred" };
  }
}
