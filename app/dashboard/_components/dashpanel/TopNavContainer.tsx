// import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { TopNavSheetMenu } from "./TopNavSheetMenu";
import { UserNav } from "./user-nav";

interface NavbarProps {
  title: string;
}

export function TopNavContainer({ title }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 flex h-14 items-center sm:mx-8">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SidebarTrigger />
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* <ModeToggle /> */}
          {/* <UserNav /> */}
        </div>
      </div>
    </header>
  );
}
