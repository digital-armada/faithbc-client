"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { updateMember } from "@/features/contacts/contacts-actions";
export default function MemberStatus({ getValue, row, column, table }) {
  const blocked = row.getValue("blocked");
  const { toast } = useToast();
  return (
    <Select
      defaultValue={blocked ? "blocked" : "member"}
      onValueChange={async (value) => {
        const isBlocked = value === "blocked";

        toast({
          title: "Updating member status...",
          description: "Please wait while we process your request",
        });

        const result = await updateMember({
          id: row.original.id,
          blocked: isBlocked,
        });

        if (result.success) {
          toast({
            title: "Member status updated",
            description: "Your member status has been updated",
          });
        }
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue
          placeholder={
            blocked ? (
              <span className="text-red-500">Blocked</span>
            ) : (
              <span className="text-green-500">Member</span>
            )
          }
        />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="member">Member</SelectItem>
        <SelectItem value="blocked">Blocked</SelectItem>
      </SelectContent>
    </Select>
  );
}
