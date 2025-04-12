"use client";

import { useTransition } from "react";
import { redirect, useRouter } from "next/navigation";
import { deleteCommGroup } from "@/features/comms/comms-actions";
import { Button } from "@/components/ui/button";
import { MdDeleteOutline } from "react-icons/md";

export default function DeleteCommsButton({ groupId }) {
  const router = useRouter();
  console.log(groupId);
  const [isPending, startTransition] = useTransition();
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this communication group?",
    );
    if (!confirmed) return;

    try {
      startTransition(async () => {
        const result = await deleteCommGroup(groupId);
        console.log(result);
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
      <Button
        variant={"destructive"}
        onClick={handleDelete}
        disabled={isPending}
      >
        <MdDeleteOutline />
        {isPending ? "Removing..." : "Delete"}
      </Button>
    </>
  );
}
