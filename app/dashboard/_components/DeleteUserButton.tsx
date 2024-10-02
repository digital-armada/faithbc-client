"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteUserCommGroup } from "@/data/actions/comms-actions";

export default function DeleteUserButton({ userId, groupId }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  // Function to handle the delete button click
  const handleDelete = async () => {
    // const formData = new FormData();
    // formData.append("userId", userId);
    // formData.append("groupId", groupId);
    const payload = {
      userId,
      groupId,
    };
    console.log(payload);
    startTransition(async () => {
      const result = await deleteUserCommGroup(payload);
      if (result.error) {
        console.error("Failed to delete user from group:", result.error);
        // Optionally, show an error message to the user
      } else {
        router.refresh(); // This will refresh the current route
      }
    });
  };

  return (
    <button onClick={handleDelete} disabled={isPending}>
      {isPending ? "Removing..." : "Remove"}
    </button>
  );
}
