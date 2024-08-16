"use client";

import { useTransition } from "react";
import { redirect, useRouter } from "next/navigation";
import { deleteCommGroup } from "@/data/actions/comms-actions";

export default function DeleteCommsButton({ groupId }) {
  const router = useRouter();
  console.log(groupId);
  const [isPending, startTransition] = useTransition();
  const handleDelete = async () => {
    try {
      startTransition(async () => {
        const result = await deleteCommGroup(groupId);
        if (!result.error) {
          router.push("/dashboard/contacts/comms");
        } else {
          console.error("Failed to delete communication group:", result.error);
          // Optionally, show an error message to the user
        }
      });
    } catch (error) {
      console.error("Error deleting communication group:", error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <>
      <button onClick={handleDelete} disabled={isPending}>
        {isPending ? "Removing..." : "Remove"}
      </button>
    </>
  );
}
