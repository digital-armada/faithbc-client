"use client";
import { useAppSelector } from "@/hooks/useRedux";

export default function Main({ children }) {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.sidebar.isCollapsed,
  );
  return (
    <div
      className={` ${
        isSidebarCollapsed
          ? "w-full-minus-240 ml-sideBarPanel"
          : "w-full-minus-64 ml-iconPanel"
      } z-10 min-h-screen flex-grow bg-white transition-all duration-300 ease-in-out`}
    >
      <div className="mx-auto max-w-7xl px-4">{children}</div>
    </div>
  );
}
