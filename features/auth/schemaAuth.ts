import { z } from "zod";

const addressSchema = z.object({
  street: z.string().optional(),
  suburb: z.string().optional(),
  state: z.string().optional(),
  pCode: z
    .string()
    .min(4, "Postcode must be at least 4 characters long")
    .max(10, "Postcode must be between 4 and 10 characters")
    .optional(),
});

export const schemaRegister = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  contactNumber: z.string().optional(),
  dateOfBirth: z.date().optional(),
  address: addressSchema.optional(),
  commgroups: z.number().int().min(1, "Commgroup is required"),
});

export type schemaFormData = z.infer<typeof schemaRegister>;
