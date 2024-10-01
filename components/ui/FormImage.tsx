// @ts-nocheck

"use client";
import React from "react";
import { useFormState } from "react-dom";
import { cn } from "@/lib/utils";
import { SubmitButton } from "@/components/custom/SubmitButton";
import { ZodErrors } from "@/components/custom/ZodErrors";
import { StrapiErrors } from "@/components/custom/StrapiErrors";
import ImagePicker from "./FormImageInput";

const initialState = {
  message: null,
  data: null,
  strapiErrors: null,
  zodErrors: null,
};

export function ImageUploadForm({
  uploadAction,
  currentImageUrl,
  label,
  submitText,
  className,
}) {
  const [formState, formAction] = useFormState(uploadAction, initialState);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="">
        <ImagePicker
          id="image"
          name="image"
          label={label}
          defaultValue={currentImageUrl || ""}
        />
        <ZodErrors error={formState.zodErrors?.image} />
        <StrapiErrors error={formState.strapiErrors} />
      </div>
      <div className="flex justify-end">
        <SubmitButton text={submitText} loadingText="Saving Image" />
      </div>
    </div>
  );
}

// "use client";
// import React from "react";
// import { useFormState } from "react-dom";
//
// import { cn } from "@/lib/utils";
//
// import { uploadProfileImageAction } from "@/data/actions/profile-actions";
//
// import { SubmitButton } from "@/components/custom/SubmitButton";
// import { ZodErrors } from "@/components/custom/ZodErrors";
// import { StrapiErrors } from "@/components/custom/StrapiErrors";
// import ImagePicker from "./FormImageInput";
//
// interface ProfileImageFormProps {
//   id: string;
//   url: string;
//   alternativeText: string;
// }
//
// const initialState = {
//   message: null,
//   data: null,
//   strapiErrors: null,
//   zodErrors: null,
// };
//
// export function FormImage({
//   data,
//   className,
// }: {
//   data: Readonly<ProfileImageFormProps>;
//   className?: string;
// }) {
//   const uploadProfileImageWithIdAction = uploadProfileImageAction.bind(
//     null,
//     data?.id,
//   );
//
//   const [formState, formAction] = useFormState(
//     uploadProfileImageWithIdAction,
//     initialState,
//   );
//
//   return (
//     <form className={cn("space-y-4", className)} action={formAction}>
//       <div className="">
//         <ImagePicker
//           id="image"
//           name="image"
//           label="Profile Image"
//           defaultValue={data?.url || ""}
//         />
//         <ZodErrors error={formState.zodErrors?.image} />
//         <StrapiErrors error={formState.strapiErrors} />
//       </div>
//       <div className="flex justify-end">
//         <SubmitButton text="Update Image" loadingText="Saving Image" />
//       </div>
//     </form>
//   );
// }
