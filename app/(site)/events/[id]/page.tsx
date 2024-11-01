import { getEventSlug } from "@/data/events";
import EventMap from "@/app/(site)/events/_components/EventMap";
import HeadingTwo from "@/components/ui/headingtwo";
import formatDateRange from "@/lib/formatDate";
import getAddressCoordinates from "@/lib/getAddressCoordinates";
import Image from "next/image";
import { Suspense } from "react";
import { IoMdCalendar, IoMdMap } from "react-icons/io";
import Markdown from "react-markdown";
import { redirect } from "next/navigation";
import RenderTipTap from "../_components/RenderTipTap";

export default async function page({ params }: { params: { id: number } }) {
  const id = params?.id;

  const { data } = await getEventSlug(id);
  console.log("data", data);
  const d = data?.attributes;
  const address = d?.venAdd;
  const formats = d?.featuredImage?.data.attributes.url;

  return (
    <section>
      <div className="container min-h-screen">
        <div className="relative mb-10 h-80 w-full">
          {d.featuredImage ? (
            <>
              <Image
                src={formats}
                alt={d?.title}
                fill
                objectFit="cover"
                className="rounded-md blur-lg"
                quality={10}
              />
              <Image
                src={formats}
                alt={d?.title}
                fill
                objectFit="contain"
                className="rounded-md"
              />
            </>
          ) : (
            ""
          )}
        </div>
        <HeadingTwo heading={d?.title} />

        <div className="mt-10 gap-6 sm:flex">
          {address ? (
            <>
              <div className="w-full sm:w-1/2">
                <EventDetails data={data} />
              </div>
              <div className="w-full sm:w-1/2">
                <Suspense fallback={<div>Loading...</div>}>
                  <EventMap address={address} />
                </Suspense>
              </div>
            </>
          ) : (
            <div className="w-full">
              <EventDetails data={data} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const EventDetails = ({ data }: { data: any }) => {
  const d = data?.attributes;

  return (
    <div className="w-full space-y-8 pb-8 text-gray-700">
      <div>
        <h3 className="text-lg font-bold">Date and Time</h3>
        <div className="flex items-center gap-3">
          <IoMdCalendar className="text-2xl" />

          <p className="text-md">{formatDateRange(d?.startDate, d?.endDate)}</p>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold">Location</h3>
        <div className="flex items-start gap-3">
          <IoMdMap className="text-2xl" />
          <div>
            <div className="text-md">{d?.venName}</div>
            <div className="text-xs font-light">{d?.venAdd}</div>
          </div>
        </div>
      </div>
      <h3 className="mt-10 text-lg font-bold text-gray-700">Additional Info</h3>

      <RenderTipTap content={d?.content} />
    </div>
  );
};
