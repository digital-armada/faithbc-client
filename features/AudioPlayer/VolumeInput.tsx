import { setVolume } from "@/store/features/playerSlice";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "./IconButton";
import { MdVolumeOff, MdVolumeUp } from "react-icons/md";
import { useAppSelector } from "@/hooks/useRedux";

export default function VolumeInput() {
  const { volume } = useAppSelector((state) => state.player);
  const dispatch = useDispatch();

  const handleMuteUnmute = () => {
    dispatch(setVolume(volume === 0 ? 1 : 0));
  };

  return (
    <div className="flex items-center gap-3 justify-self-end">
      <IconButton
        intent="secondary"
        size="sm"
        onClick={handleMuteUnmute}
        aria-label={volume === 0 ? "unmute" : "mute"}
      >
        {volume === 0 ? <MdVolumeOff size={20} /> : <MdVolumeUp size={20} />}
      </IconButton>
      <input
        aria-label="volume"
        name="volume"
        type="range"
        min={0}
        step={0.05}
        max={1}
        value={volume}
        className="m-0 h-2 w-[80px] cursor-pointer appearance-none rounded-full bg-gray-700 accent-sky-600"
        onChange={(e) => {
          dispatch(setVolume(e.currentTarget.valueAsNumber));
        }}
      />
    </div>
  );
}
