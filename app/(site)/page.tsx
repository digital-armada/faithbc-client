import HomeEvents from "@/components/HomeEvents";
import HomeHero from "@/components/HomeHero";
import HomeSermonWidget from "@/components/HomeSermonWidget";
import HomeServices from "@/components/HomeServices";
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
