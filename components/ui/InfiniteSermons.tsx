"use client";

import { getInfiniteSermons } from "@/actions/sermons";
import { formatDistance } from "date-fns";
import { useEffect, useState } from "react";
import { FaYoutube } from "react-icons/fa";
import { IoMdBook, IoMdDownload, IoMdMicrophone } from "react-icons/io";
import { useInView } from "react-intersection-observer";
import { MusicItem } from "../Music/MusicItem";
import { useSelector } from "react-redux";
import { IoTodayOutline } from "react-icons/io5";
import LoadingSpinner from "./LoadingSpinner";
import Image from "next/image";

export default function InfiniteScrollSermons({ search, initialSermons }) {
  const { activeSermon, isPlaying } = useSelector((state) => state.player);

  const [sermons, setSermons] = useState(initialSermons);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();

  const hasMoreSermons =
    sermons?.meta?.pagination?.total > sermons?.data?.length;

  useEffect(() => {
    const loadMoreSermons = async () => {
      const nextPage = page + 1;

      const newSermons = await getInfiniteSermons({
        search,
        page: nextPage,
      });

      if (newSermons?.data?.length) {
        setPage(nextPage);

        setSermons((prevSermons) => {
          const prevData = Array.isArray(prevSermons)
            ? prevSermons
            : prevSermons.data;

          return {
            ...prevSermons,
            data: [...prevData, ...newSermons.data],
          };
        });
      }
    };

    if (inView && hasMoreSermons) {
      loadMoreSermons();
    }
  }, [inView, hasMoreSermons, page, search]);

  const handleDownload = (audioUrl) => {
    window.open(audioUrl, "_blank");
  };

  return (
    <div className=" ">
      {sermons?.data?.map((sermon) => {
        console.log(sermon);
        return (
          // CONTAINER
          <div key={sermon.id} className="py-8 text-gray-700 sm:flex">
            {/* IMAGE */}

            {sermon?.attributes?.imageUrl ? (
              <Image
                src={sermon?.attributes?.imageUrl}
                className="w-full object-contain pb-4 sm:w-48 sm:pb-0"
                width={200}
                height={200}
                alt="Sermon image"
              />
            ) : (
              <Image
                src={`https://i.ytimg.com/vi/${sermon?.attributes?.youtube?.slice(
                  32,
                )}/0.jpg`}
                className="w-full object-contain pb-4 sm:w-48 sm:pb-0"
                width={1920}
                height={1080}
                alt="Sermon image"
              />
            )}

            {/* CONTENT */}
            <div className="flex w-full flex-col justify-between px-0 sm:px-4">
              {/* TOP PART */}
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="font-body text-2xl font-semibold">
                    {sermon?.attributes?.name}
                  </div>
                  <MusicItem
                    key={sermon.id}
                    sermon={sermon}
                    isPlaying={isPlaying}
                    activeSermon={activeSermon}
                    data={sermon}
                  />
                </div>
                <div className="flex flex-col gap-2 text-[11px] sm:flex-row">
                  {sermon?.attributes?.speaker?.data?.attributes?.speaker && (
                    <div className="flex items-center gap-1">
                      <IoMdMicrophone />

                      {sermon?.attributes?.speaker?.data?.attributes?.speaker}
                    </div>
                  )}
                  {sermon?.attributes?.service_type && (
                    <>
                      <span className="hidden sm:inline-block">&bull;</span>
                      <div className="flex items-center gap-1">
                        <IoTodayOutline />
                        {sermon?.attributes?.service_type}
                      </div>
                    </>
                  )}
                  {sermon?.attributes?.verse && (
                    <>
                      <span className="hidden sm:inline-block">&bull;</span>
                      <div className="flex items-center gap-1">
                        <IoMdBook />
                        {sermon?.attributes?.verse}
                      </div>
                    </>
                  )}
                </div>{" "}
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
                          {/* <RiExternalLinkLine /> */}
                        </a>
                      </div>
                    )}
                    <button
                      onClick={() =>
                        handleDownload(
                          process.env.NEXT_PUBLIC_STRAPI_URL +
                            sermon?.attributes?.audio?.data?.attributes?.url,
                        )
                      }
                      className="flex items-center gap-2"
                    >
                      <IoMdDownload /> Download
                    </button>
                  </div>
                  <div>
                    {formatDistance(
                      new Date(sermon?.attributes?.date),
                      new Date(),
                      { addSuffix: true },
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {hasMoreSermons && <LoadingSpinner />}
    </div>
  );
}
