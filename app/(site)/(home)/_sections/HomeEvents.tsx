import { getLatestEvents } from "@/data/events";
import HeadingTwo from "../../../../components/blocks/headingtwo";
import More from "../../../../components/blocks/more";
import formatDateRange from "@/lib/formatDate";
import Link from "next/link";
import Image from "next/image";

export default async function HomeEvents() {
  const data = await getLatestEvents();
  const events: Event[] = data.data.slice(0, 4);
  console.log("events", events.length);

  // const notifications = events.filter(
  //     event => event.attributes.eventType === 'notification'
  // );

  // console.log('notifications', notifications);
  // console.log('events', notifications);
  if (events.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="container mt-10">
        <div className="w-full items-center justify-between space-y-4 pb-10 sm:flex sm:space-y-0">
          <div>
            <HeadingTwo heading="Upcoming Events" />
          </div>
          <div>
            <More title="All Events" link="/events" />
          </div>
        </div>

        <div>
          <ul className="grid grid-cols-1 gap-4 divide-y divide-gray-800/10 text-gray-700 sm:grid-cols-2 lg:grid-cols-4">
            {events.map((event) => {
              if (event?.attributes?.eventType === "notification") {
                return (
                  <>
                    <div>ok</div>
                    {/* <li
                                            key={event.id}
                                            className='flex items-center justify-between bg-[#0E93C0] rounded-md p-1 my-4 text-gray-200 '>
                                            <div className='flex items-center w-full space-x-4'>
                                                <div className='animate-pulse size-10 flex items-center justify-center rounded-full'>
                                                    <AiOutlineNotification className='size-8 ' />
                                                </div>

                                                <div className='font-body flex flex-col items-start'>
                                                    <h3 className='text-md'>
                                                        {
                                                            event?.attributes
                                                                ?.title
                                                        }
                                                    </h3>
                                                    <p className='  text-gray-200 text-xs'>
                                                        {formatDateRange(
                                                            event?.attributes
                                                                ?.startDate,
                                                            event?.attributes
                                                                ?.endDate
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </li> */}
                  </>
                );
              } else if (
                event?.attributes?.eventType == null ||
                event?.attributes?.eventType === "event"
              ) {
                return (
                  <li key={event.id} className="col-span-1">
                    <Link href={`/events/${event?.attributes?.slug}`}>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${event?.attributes?.featuredImage?.data?.attributes?.formats?.medium?.url}`}
                        className="mb-2 w-full rounded-md object-cover"
                        alt="A flat white coffee"
                        width={400}
                        height={300}
                      />

                      <div className="space-y-1">
                        <p className="text-xl">{event?.attributes?.title}</p>
                        <p className="text-xs font-light text-gray-700">
                          {formatDateRange(
                            event?.attributes?.startDate,
                            event?.attributes?.endDate,
                          )}
                        </p>
                        <p className="flex gap-1 text-xs font-light text-gray-700">
                          {event?.attributes?.venName}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              } else {
                // Default case
                return null; // or any other fallback UI
              }
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

interface Event {
  id: string;
  attributes: {
    eventType?: "notification" | "event" | null;
    title: string;
    startDate: string;
    endDate: string;
    slug?: string;
    featuredImage?: {
      data?: {
        attributes?: {
          formats?: {
            medium?: {
              url: string;
            };
          };
        };
      };
    };
    venName?: string;
  };
}
