import Menu from "@/components/blocks/Menu/Menu";
import DesktopAudioWrapper from "@/features/Music/DesktopAudioWrapper";
import Providers from "@/lib/Providers";
import React from "react";

export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="noise min-h-screen pb-20">
      <Providers>
        <Menu />
        <div>
          {children}
          <DesktopAudioWrapper />
        </div>
      </Providers>
    </div>
  );
}
