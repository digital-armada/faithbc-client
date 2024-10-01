"use client";
import { formatDistance, parseISO } from "date-fns";
import { MusicItem } from "@/components/Music/MusicItem";
import Image from "next/image";
import { useAppSelector } from "@/hooks/useRedux";
import { Sermon } from "@/types/types";

export default function HomeSermonCard({ sermon }: { sermon: Sermon }) {
  const { activeSermon, isPlaying } = useAppSelector((state) => state.player);

  return (
    <div className="col-span-1 py-2">
      {sermon?.attributes?.imageUrl ? (
        <Image
          src={sermon?.attributes?.imageUrl}
          width={400}
          height={130}
          className="w-full rounded-sm object-cover md:h-[130.5px]"
          alt=""
        />
      ) : (
        <Image
          src={`https://i.ytimg.com/vi/${sermon?.attributes?.youtube?.slice(
            32,
          )}/0.jpg`}
          width={112}
          height={63}
          className="w-28 rounded-sm"
          alt=""
        />
      )}
      {/* <hr className='border-gray-600' /> */}

      <div className="mt-2">
        <p className="truncate">{sermon?.attributes?.name}</p>
        <div className="flex items-center gap-2">
          <MusicItem
            key={sermon.id}
            sermon={sermon}
            isPlaying={isPlaying}
            activeSermon={activeSermon as Sermon}
            data={sermon}
            // isActive={isActive}
          />
          <div className="flex items-center gap-4 text-[10px]">
            <p className="italic">
              {formatDistance(new Date(sermon?.attributes?.date), new Date(), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
