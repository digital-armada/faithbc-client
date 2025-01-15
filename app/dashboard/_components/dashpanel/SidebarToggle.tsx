import { ChevronLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toggleSidebar } from "@/store/features/sidebarSlice";
import { useDispatch } from "react-redux";

interface SidebarToggleProps {
  isOpen: boolean | undefined;
}

export function SidebarToggle({ isOpen }: SidebarToggleProps) {
  const dispatch = useDispatch();
  return (
    <div className="invisible absolute -right-[16px] top-[12px] z-20 lg:visible">
      <Button
        onClick={() => dispatch(toggleSidebar())}
        className="h-8 w-8 rounded-md"
        variant="outline"
        size="icon"
      >
        <ChevronLeft
          className={cn(
            "h-4 w-4 transition-transform duration-700 ease-in-out",
            isOpen === false ? "rotate-180" : "rotate-0",
          )}
        />
      </Button>
    </div>
  );
}
