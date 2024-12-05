import { IoIosArrowDown } from "react-icons/io";
import AudioProgressBar from "../AudioPlayer/AudioProgressBar";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentProgress } from "@/redux/features/playerSlice";
import { MusicItem } from "./MusicItem";
import PlayAndPause from "../AudioPlayer/PlayAndPause";
import VolumeInput from "../AudioPlayer/VolumeInput";
import Image from "next/image";
import { useAppSelector } from "@/hooks/useRedux";

export default function MobilePlayer({ toggleMiniPlayer, activeSermon }) {
  const { duration, currentProgress } = useAppSelector((state) => state.player);

  function formatDurationDisplay(duration: number) {
    const min = Math.floor(duration / 60);
    const sec = Math.floor(duration - min * 60);

    const formatted = [min, sec].map((n) => (n < 10 ? "0" + n : n)).join(":");

    return formatted;
  }

  const durationDisplay = formatDurationDisplay(duration);
  const elapsedDisplay = formatDurationDisplay(currentProgress);
  return (
    <div className="relative h-screen w-full bg-gray-800">
      <div className="absolute inset-0 flex flex-col p-4 text-white">
        <div className="h-10 flex-none text-center">
          <IoIosArrowDown
            className="cursor-pointer text-2xl text-white"
            onClick={toggleMiniPlayer}
          />
        </div>

        {/* CONTROLS */}
        <div className="flex flex-col text-center">
          {activeSermon?.attributes?.imageUrl && (
            <Image
              src={activeSermon?.attributes?.imageUrl}
              className="w-full rounded-md"
              // layout="responsive"
              width={1920}
              height={1080}
              alt="image"
            />
          )}

          <h1 className="mt-4 text-2xl font-bold">
            {activeSermon?.attributes?.name}
          </h1>
          <h2 className="font-light">
            {activeSermon?.attributes?.speaker?.data?.attributes?.speaker}
          </h2>
          <div className="space-between flex h-full w-full flex-col gap-4">
            <div className="relative mt-10">
              <AudioProgressBar />
              <div className="mt-2 flex items-center justify-between text-sm font-thin">
                <span> {elapsedDisplay}</span>
                <span> {durationDisplay}</span>
              </div>
            </div>
            <div className="mt-4 flex w-full flex-col items-center gap-4 space-y-2">
              <PlayAndPause />
              <VolumeInput />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
