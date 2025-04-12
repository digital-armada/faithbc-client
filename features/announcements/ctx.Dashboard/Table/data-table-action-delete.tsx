"use client";
import { TiTrash } from "react-icons/ti";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteAnnouncement from "@/features/announcements/actions";
import { Button } from "@/components/ui/button";
import { Announcement } from "@/src/domain/entities/models/Announcement";

// FIX: should only delete if successful

export default function AnnouncementDelete({ id }: { id: number }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteAnnouncement(id),
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({
        queryKey: ["announcements"],
      });

      // Snapshot the previous value
      const previousData = queryClient.getQueryData<any>(["announcements"]);

      // Optimistically update to the new value
      queryClient.setQueryData<any>(["announcements"], (old) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.filter(
            (announcement: Announcement) => announcement.id !== deletedId,
          ),
        };
      });
      // Return a context object with the snapshotted value
      return { previousData };
    },
    onError: (context: any) => {
      queryClient.setQueryData(["announcements"], context.previousData);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete announcement. Please try again.",
      });
    },
    onSuccess: (response) => {
      if (response?.queryKey)
        queryClient.invalidateQueries({ queryKey: response.queryKey });
      toast({
        variant: "success",
        title: "Success",
        description: "Announcement has been successfully deleted.",
      });
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(id);
  };

  return (
    <div className="flex justify-end">
      <Button onClick={handleDelete} disabled={deleteMutation.isPending}>
        <TiTrash className="mr-2 h-4 w-4" />
        {deleteMutation.isPending ? "Deleting..." : "Delete"}
      </Button>
    </div>
  );
}
