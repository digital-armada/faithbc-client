"use client";

import { formatDistance } from "date-fns";
import { FaYoutube } from "react-icons/fa";
import { IoMdBook, IoMdDownload, IoMdMicrophone } from "react-icons/io";
import { MusicItem } from "../../Music/MusicItem";
import { IoTodayOutline } from "react-icons/io5";
import Image from "next/image";
import Placeholder from "@/public/image.png";
import { useAppSelector } from "@/hooks/useRedux";
import { Sermon } from "@/components/features/sermons/types";
// import { Sermon } from "@/types/types";

export default function SermonItem({ sermon }: { sermon: Sermon }) {
  const { activeSermon, isPlaying } = useAppSelector((state) => state.player);

  if (!sermon) {
    return null; // or render a fallback UI here
  }

  return (
    // CONTAINER
    <div key={sermon.id} className="py-8 text-gray-700 sm:flex">
      {/* IMAGE */}
      <div>
        {sermon?.attributes?.imageUrl ? (
          <Image
            src={sermon?.attributes?.imageUrl}
            className="min-w-[192px] object-contain pb-4 sm:w-48 sm:pb-0"
            width={1000}
            height={1000}
            alt=""
          />
        ) : (
          <Image
            src={Placeholder}
            className="max-h-[320px] min-w-[192px] object-cover pb-4 sm:h-[108px] sm:w-48 sm:pb-0"
            width={1000}
            height={1000}
            alt=""
          />
        )}
      </div>

      {/* CONTENT */}
      <div className="flex w-full flex-col justify-between px-0 sm:px-4">
        {/* TOP PART */}
        <div>
          <div className="flex items-center justify-between gap-2">
            <div className="font-body text-2xl font-semibold">
              {sermon?.attributes?.name}
            </div>
            {sermon?.attributes?.audio?.data?.attributes?.url && (
              <MusicItem
                key={sermon.id}
                sermon={sermon}
                isPlaying={isPlaying}
                activeSermon={activeSermon as Sermon}
                data={sermon}
              />
            )}
          </div>
          <div className="flex flex-col flex-wrap gap-2 text-[11px] sm:flex-row">
            {sermon?.attributes?.speaker?.data?.attributes?.speaker && (
              <div className="flex items-center gap-1">
                <IoMdMicrophone />

                {sermon?.attributes?.speaker?.data?.attributes?.speaker}
              </div>
            )}
            {sermon?.attributes?.service_type && (
              <>
                <span className="hidden sm:inline-block">•</span>
                <div className="flex items-center gap-1">
                  <IoTodayOutline />
                  {sermon?.attributes?.service_type}
                </div>
              </>
            )}
            {sermon?.attributes?.verse && (
              <>
                <span className="hidden sm:inline-block">•</span>
                <div className="flex items-center gap-1">
                  <IoMdBook />
                  {sermon?.attributes?.verse}
                </div>
              </>
            )}
          </div>
        </div>
        {/* BOTTOM PART */}
        <div>
          <hr className="my-2 border-t-[1px] border-gray-500/20" />
          <div className="flex items-center justify-between text-[12px]">
            <div className="flex items-center space-x-6">
              {sermon?.attributes?.youtube && (
                <div>
                  <a
                    className="flex items-center gap-2"
                    target="_blank"
                    href={sermon?.attributes?.youtube}
                  >
                    <FaYoutube className="text-red-700" />
                    <span>Watch</span>
                  </a>
                </div>
              )}
            </div>
            <div>
              {formatDistance(new Date(sermon?.attributes?.date), new Date(), {
                addSuffix: true,
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
