"use client";
import { deleteEvent } from "@/data/actions/event-action";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { TiTrash } from "react-icons/ti";

export default function EventDelete({ id }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      queryClient.invalidateQueries({
        queryKey: ["events"],
        exact: true,
      });
      toast({
        title: "Event Deleted",
        description: "Event has been deleted.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <button onClick={() => handleDelete(id)}>
      <TiTrash />
    </button>
  );
}
