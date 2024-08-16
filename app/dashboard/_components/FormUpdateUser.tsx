"use client";
import { updateUserAction } from "@/data/actions/auth-actions";
import { z } from "zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const addressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  suburb: z.string().min(1, "Suburb is required"),
  state: z.string().min(1, "State is required"),
  pCode: z
    .string()
    .min(4, "Postcode must be at least 4 characters long")
    .max(10, "Postcode must be between 4 and 10 characters"),
});

const schemaUpdateUser = z.object({
  id: z.number(),
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Please enter a valid email address"),
  password: z.optional(z.string()),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  contactNumber: z.string().min(1, "Contact number is required"),
  dateOfBirth: z.date(),
  address: addressSchema.optional(), // Make the address object optional
});

type FormData = z.infer<typeof schemaUpdateUser>;

export default function FormUpdateUser({ user }) {
  console.log(user);
  const [formData, setFormData] = useState<FormData>({
    id: user?.id,
    username: user?.username || "",
    email: user?.email || "",
    password: "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    contactNumber: user?.contactNumber || "",
    dateOfBirth: new Date(user?.dateOfBirth) || new Date(),
    address: {
      street: user?.address?.street || "",
      suburb: user?.address?.suburb || "",
      state: user?.address?.state || "",
      pCode: user?.address?.pCode || "",
    },
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );

  const [updatedFields, setUpdatedFields] = useState<Set<string>>(new Set());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setUpdatedFields((prev) => new Set(prev).add(name));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      dateOfBirth: new Date(value),
    }));
    setUpdatedFields((prev) => new Set(prev).add(name));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    const addressField = name.split(".")[1];
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [addressField]: value,
      },
    }));
    setUpdatedFields((prev) => new Set(prev).add(`address.${addressField}`));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedData = { id: formData.id } as Partial<FormData>;
    updatedFields.forEach((field) => {
      if (field.startsWith("address.")) {
        const addressField = field.split(".")[1];
        updatedData.address = {
          ...(updatedData.address || {}),
          [addressField]: formData.address[addressField],
        };
      } else {
        updatedData[field] = formData[field];
      }
    });

    // Validate address as a whole if any part of it is being updated
    if (
      updatedFields.has("address.street") ||
      updatedFields.has("address.suburb") ||
      updatedFields.has("address.state") ||
      updatedFields.has("address.pCode")
    ) {
      updatedData.address = formData.address;
    }

    const result = schemaUpdateUser.partial().safeParse(updatedData);
    console.log(result);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path.join(".");
        fieldErrors[path as keyof FormData] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    try {
      await updateUserAction(result.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ form: "An unexpected error occurred. Please try again." });
    }
  };

  return (
    <div className="mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <Label
                  htmlFor="firstName"
                  className="text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </Label>
                <div className="mt-2">
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    // autoComplete="given-name"
                    className="w-full"
                  />
                  {errors.firstName && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.firstName}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <Label
                  htmlFor="lastName"
                  className="text-sm font-medium leading-6 text-gray-900"
                >
                  Last name
                </Label>
                <div className="mt-2">
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    autoComplete="family-name"
                    className="w-full"
                  />
                  {errors.lastName && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </Label>
                <div className="mt-2">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    className="w-full"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <Label
                  htmlFor="dateOfBirth"
                  className="text-sm font-medium leading-6 text-gray-900"
                >
                  Date of Birth
                </Label>
                <div className="mt-2">
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData?.dateOfBirth?.toISOString().split("T")[0]}
                    onChange={handleDateChange}
                    autoComplete="off"
                    className="w-full"
                  />
                  {errors.dateOfBirth && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.dateOfBirth}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium leading-6 text-gray-900"
                >
                  Update your Password
                </Label>
                <div className="mt-2">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    className="w-full"
                  />
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <Label
                  htmlFor="contactNumber"
                  className="text-sm font-medium leading-6 text-gray-900"
                >
                  Contact Number
                </Label>
                <div className="mt-2">
                  <Input
                    id="contactNumber"
                    name="contactNumber"
                    type="tel"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="w-full"
                  />
                  {errors.contactNumber && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.contactNumber}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="address.street"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    name="address.street"
                    id="address.street"
                    type="text"
                    value={formData.address.street}
                    onChange={handleAddressChange}
                    autoComplete="street-address"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors["address.street"] && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors["address.street"]}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="address.suburb"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Suburb
                </label>
                <div className="mt-2">
                  <input
                    name="address.suburb"
                    id="address.suburb"
                    type="text"
                    value={formData.address.suburb}
                    onChange={handleAddressChange}
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors["address.suburb"] && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors["address.suburb"]}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="address.state"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    name="address.state"
                    id="address.state"
                    type="text"
                    value={formData.address.state}
                    onChange={handleAddressChange}
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors["address.state"] && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors["address.state"]}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="address.pCode"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    name="address.pCode"
                    id="address.pCode"
                    type="text"
                    value={formData.address.pCode}
                    onChange={handleAddressChange}
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors["address.pCode"] && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors["address.pCode"]}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
      {errors.form && (
        <div className="mt-4 text-red-600">
          <p>{errors.form}</p>
        </div>
      )}
    </div>
  )
}
