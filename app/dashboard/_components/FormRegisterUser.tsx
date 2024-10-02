// @ts-nocheck
"use client";

import { registerUserAction } from "@/data/actions/auth-actions";
import { useFormState } from "react-dom";
import { z } from "zod";
import React, { useState } from "react";

const addressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  suburb: z.string().min(1, "Suburb is required"),
  state: z.string().min(1, "State is required"),
  pCode: z
    .string()
    .min(4, "Postcode must be at least 4 characters long")
    .max(10, "Postcode must be between 4 and 10 characters"),
});

const schemaRegister = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  contactNumber: z.string().min(1, "Contact number is required"),
  dateOfBirth: z.date(),
  address: addressSchema,
});

type FormData = z.infer<typeof schemaRegister>;

type SignUpFormInitialStateT = {
  error: false;
};

type SignUpFormErrorStateT = {
  error: true;
  message: string;
  inputErrors?: Record<string, string[]>;
};

export type SignUpFormStateT = SignUpFormInitialStateT | SignUpFormErrorStateT;

const initialState: SignUpFormInitialStateT = {
  error: false,
};

export default function FormRegisterUser() {
  const [state, formAction] = useFormState<SignUpFormStateT, FormData>(
    registerUserAction,
    initialState,
  );
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const firstName = formData.get("firstName")?.toString() || "";
    const lastName = formData.get("lastName")?.toString() || "";

    function generateUsername(firstName: string, lastName: string): string {
      const firstInitial = firstName.charAt(0).toLowerCase();
      const lastNameLower = lastName.toLowerCase();
      return `${firstInitial}${lastNameLower}`;
    }

    const data: FormData = {
      username: generateUsername(firstName, lastName),
      email: formData.get("email")?.toString() || "",
      password: formData.get("password")?.toString() || "",
      firstName: formData.get("firstName")?.toString() || "",
      lastName: formData.get("lastName")?.toString() || "",
      contactNumber: formData.get("contactNumber")?.toString() || "",
      dateOfBirth: new Date(formData.get("dateOfBirth")?.toString() || ""),
      address: {
        street: formData.get("street")?.toString() || "",
        suburb: formData.get("suburb")?.toString() || "",
        state: formData.get("state")?.toString() || "",
        pCode: formData.get("pCode")?.toString() || "",
      },
    };

    // Validate the data using Zod schema
    const result = schemaRegister.safeParse(data);

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
    setFormError(null); // Clear form error on success

    try {
      await formAction(result.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormError("An unexpected error occurred. Please try again.");
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
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    name="firstName"
                    id="firstName"
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.firstName && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.firstName}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    name="lastName"
                    id="lastName"
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.lastName && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    name="email"
                    id="email"
                    type="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    name="username"
                    id="username"
                    type="text"
                    autoComplete="username"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.username && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.username}
                    </p>
                  )}
                </div>
              </div> */}

              <div className="sm:col-span-4">
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Date of Birth
                </label>
                <div className="mt-2">
                  <input
                    name="dateOfBirth"
                    id="dateOfBirth"
                    type="date"
                    autoComplete="off"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.dateOfBirth && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.dateOfBirth}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    name="password"
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Contact Number
                </label>
                <div className="mt-2">
                  <input
                    name="contactNumber"
                    id="contactNumber"
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  suburb
                </label>
                <div className="mt-2">
                  <input
                    name="address.suburb"
                    id="address.suburb"
                    type="text"
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
                  htmlFor="address.postcode"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    name="address.pCode"
                    id="address.pCode"
                    type="text"
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
      {state.error && (
        <div className="mt-4 text-red-600">
          <p>{state.message}</p>
          {state.inputErrors && (
            <ul>
              {Object.entries(state.inputErrors).map(([field, errors]) => (
                <li key={field}>
                  {field}: {errors.join(", ")}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
