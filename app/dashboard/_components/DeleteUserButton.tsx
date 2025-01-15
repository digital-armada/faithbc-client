"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteUserCommGroup } from "@/components/features/comms/comms-actions";
import { toast } from "@/hooks/use-toast";

interface DeleteUserButtonProps {
  userId: string;
  groupId: string;
}

export default function DeleteUserButton({
  userId,
  groupId,
}: DeleteUserButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this user?",
    );
    if (!confirmed) return;

    startTransition(async () => {
      try {
        const result = await deleteUserCommGroup({ userId, groupId });
        if (result.error) {
          toast({
            title: "Error",
            description: "Failed to remove user from group",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success",
            description: "User removed successfully",
          });
          router.refresh();
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="hover:text-red- text-red-500 disabled:opacity-50"
    >
      {isPending ? "Removing..." : "Remove"}
    </button>
  );
}
