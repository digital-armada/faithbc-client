import { getLatestEvents } from '@/data/events';
import HeadingTwo from './ui/headingtwo';
import More from './ui/more';
import { format } from 'date-fns';
import formatDateRange from '@/lib/formatDate';
import { AiOutlineNotification } from 'react-icons/ai';
import Link from 'next/link';
import { IoMdMap } from 'react-icons/io';
import Image from 'next/image';

export default async function HomeEvents() {
    const data = await getLatestEvents();
    const events = data.data.slice(0, 4);

    if (events.length === 0) {
        return null;
    }

    return (
        <section>
            <div className='container mt-10'>
                <div className='sm:flex w-full justify-between items-center pb-10 space-y-4 sm:space-y-0'>
                    <div>
                        <HeadingTwo heading='Upcoming Events' />
                    </div>
                    <div>
                        <More title='All Events' link='/events' />
                    </div>
                </div>

                <div>
                    <ul className='divide-y divide-gray-800/10 text-gray-700 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                        {events.map(event => {
                            if (
                                event?.attributes?.eventType === 'notification'
                            ) {
                                return (
                                    <>
                                        {/* <li
                                            key={event.id}
                                            className='flex items-center justify-between bg-[#0E93C0] rounded-md p-1 my-4 text-gray-200 animate-pulse'>
                                            <div className='flex items-center w-full space-x-4'>
                                                <div className='size-10 flex items-center justify-center rounded-full'>
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
                                event?.attributes?.eventType === 'event'
                            ) {
                                console.log(event);
                                return (
                                    <li key={event.id} className='col-span-1'>
                                        <Link
                                            href={`/events/${event?.attributes?.slug}`}>
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_URL}${event?.attributes?.featuredImage?.data?.attributes?.formats?.medium?.url}`}
                                                className='rounded-md object-cover mb-2 w-full'
                                                alt='A flat white coffee'
                                                width={400}
                                                height={300}
                                            />

                                            <div className='space-y-1'>
                                                <p className='text-xl '>
                                                    {event?.attributes?.title}
                                                </p>
                                                <p className='font-light text-gray-700 text-xs'>
                                                    {formatDateRange(
                                                        event?.attributes
                                                            ?.startDate,
                                                        event?.attributes
                                                            ?.endDate
                                                    )}
                                                </p>
                                                <p className='font-light text-gray-700 text-xs flex gap-1'>
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
