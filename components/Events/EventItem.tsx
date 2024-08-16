import formatDateRange from "@/lib/formatDate";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineNotification } from "react-icons/ai";

export default function EventItem({ event }) {
  return (
    <>
      {event?.attributes?.eventType === "notification" && (
        <li
          key={event.id}
          className="my-4 flex animate-pulse items-center justify-between rounded-md bg-[#0E93C0] p-1 text-gray-200"
        >
          <div className="flex w-full items-center space-x-4">
            <div className="flex size-10 items-center justify-center rounded-full">
              <AiOutlineNotification className="size-8" />
            </div>

            <div className="flex flex-col items-start font-body">
              <h3 className="text-md">{event?.attributes?.title}</h3>
              <p className="text-xs text-gray-200">
                {/* {formatDateRange(
                  event?.attributes?.startDate,
                  event?.attributes?.endDate,
                )} */}
              </p>
            </div>
          </div>
        </li>
      )}

      {(!event?.attributes?.eventType ||
        event?.attributes?.eventType === "event") && (
        <li key={event.id} className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}/${event?.attributes?.featuredImage?.data?.attributes?.formats?.thumbnail?.url}`}
              className="size-16 rounded-md object-cover"
              alt="A flat white coffee"
              width={500}
              height={500}
            />

            <Link href={`/events/${event?.attributes?.slug}`}>
              <div className="ml-6">
                <p className="text-3xl">{event?.attributes?.title}</p>
                <p className="text-xs font-light text-gray-700">
                  {/* {formatDateRange(
                    event?.attributes?.startDate,
                    event?.attributes?.endDate,
                  )} */}
                </p>
              </div>
            </Link>
          </div>
          {event?.attributes?.startDate && (
            <div className="hidden text-xl sm:inline-block">
              {format(event?.attributes?.startDate, "d")}
              &nbsp;
              <sup>{format(event?.attributes?.startDate, "MMM yy")}</sup>
            </div>
          )}
        </li>
      )}
    </>
  );
}
