"use client";

import { Button } from "@/components/ui/button";
import { checkMemberStatus } from "@/features/contacts/contacts-actions";
import { useToast } from "@/hooks/use-toast";

export default function UpdateMembers() {
  const { toast } = useToast();

  const handleAddBlocked = async () => {
    toast({
      title: "Processing blocked users",
      description: "Adding blocked users to Group 3...",
    });

    const result = await checkMemberStatus();
    console.log(result);
    if (result.success) {
      toast({
        title: "Success",
        description: "Blocked users have been added to Group 3",
      });
    }
  };
  return (
    <div>
      <Button onClick={handleAddBlocked}>Check Members</Button>
      <div>Check Non-members</div>
    </div>
  );
}
