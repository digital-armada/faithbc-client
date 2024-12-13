import HomeHero from "@/app/(site)/_components/HomeHero";
import HomeSermonWidget from "@/features/sermons/components/HomeSermonWidget";
import HomeServices from "@/app/(site)/_components/HomeServices";

export default function Page() {
  return (
    <>
      <HomeHero />
      <HomeSermonWidget />
      <HomeServices />
    </>
  );
}
