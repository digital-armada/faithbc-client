import HomeHero from "@/app/(site)/_components/HomeHero";
import HomeSermonWidget from "@/features/sermons/components/HomeSermonWidget";
import HomeServices from "@/app/(site)/_components/HomeServices";
import HomeEvents from "@/app/(site)/_components/HomeEvents";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <HomeHero />
      <HomeSermonWidget />
      {/* <HomeEvents /> */}
      <HomeServices />
    </>
  );
}
