import { TiArrowSortedDown } from "react-icons/ti";

export default function Avatar() {
  return (
    <div className="my-4 flex w-full items-center justify-between">
      <div className="w-iconPanel flex flex-shrink-0 items-center">
        <div className="bg-fbc-default mx-2 flex h-[48px] w-full items-center justify-center rounded-md text-sm text-white">
          S K
        </div>
      </div>
      <div className="mx-2 flex min-w-0 flex-grow flex-col overflow-hidden">
        <span className="truncate text-sm">Sasxaaateven Khoshabasddcss</span>
        <span className="truncate text-xs">khoshaba04@gmail.com</span>
      </div>
      {/* <TiArrowSortedDown className="flex-shrink-0" /> */}
    </div>
  );
}
