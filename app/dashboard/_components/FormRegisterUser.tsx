"use client";

import React, { useState } from "react";
import { registerUserAction } from "@/features/auth/auth-actions";
import { useFormState } from "react-dom";
import { schemaFormData, schemaRegister } from "@/features/auth/schemaAuth";

type FormErrors = Partial<Record<keyof schemaFormData, string>>;

const initialState: ApiResponse<UserData> = {
  success: false,
  error: undefined,
  data: undefined,
};

export default function FormRegisterUser() {
  const [state, formAction] = useFormState(registerUserAction, initialState);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const firstName = formData.get("firstName")?.toString() || "";
    const lastName = formData.get("lastName")?.toString() || "";

    function generateUsername(firstName: string, lastName: string): string {
      const firstInitial = firstName.charAt(0).toLowerCase();
      const lastNameLower = lastName.toLowerCase();
      const randomSuffix = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0");
      return `${firstInitial}${lastNameLower}${randomSuffix}`;
    }

    const data: schemaFormData = {
      username: generateUsername(firstName, lastName),
      email: formData.get("email")?.toString() || "",
      password: formData.get("password")?.toString() || "",
      firstName: formData.get("firstName")?.toString() || "",
      lastName: formData.get("lastName")?.toString() || "",
      contactNumber: formData.get("contactNumber")?.toString() || "",
      dateOfBirth: formData.get("dateOfBirth")
        ? new Date(formData.get("dateOfBirth")?.toString() || "")
        : undefined,
      address: {
        street: formData.get("street")?.toString() || "",
        suburb: formData.get("suburb")?.toString() || "",
        state: formData.get("state")?.toString() || "",
        pCode: formData.get("pCode")?.toString() || "",
      },
      commgroups: 1,
    };

    // Validate the data using Zod schema
    const result = schemaRegister.safeParse(data);

    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path.join(".");
        fieldErrors[path as keyof schemaFormData] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    await formAction(result.data);
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
                  htmlFor="contactNumber"
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
                  htmlFor="street"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    name="street"
                    id="street"
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
                  htmlFor="suburb"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Suburb
                </label>
                <div className="mt-2">
                  <input
                    name="suburb"
                    id="suburb"
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
                  htmlFor="state"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <select name="state" id="state">
                    <option value="">Select State</option>
                    <option value="NSW">NSW</option>
                    <option value="VIC">VIC</option>
                    <option value="ACT">ACT</option>
                    <option value="QLD">QLD</option>
                    <option value="NT">NT</option>
                    <option value="WA">WA</option>
                    <option value="SA">SA</option>
                    <option value="TAS">TAS</option>
                  </select>
                  {errors["address.state"] && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors["address.state"]}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="pCode"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    name="pCode"
                    id="pCode"
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
      {/* {state.error && (
        <div className="mt-4 text-red-600">
          <p>{state.message}</p>
          {state.inputErrors && (
            <ul>
              {Object.entries(state.inputErrors).map(([field, errors]) => (
                <li key={field}>
                  {field}:{" "}
                  {Array.isArray(errors) ? errors.join(", ") : String(errors)}
                </li>
              ))}
            </ul>
          )}
        </div>
      )} */}
    </div>
  );
}
