import { getLatestEvents } from '@/data/events';
import HeadingTwo from './ui/headingtwo';
import More from './ui/more';
import { format } from 'date-fns';
import formatDateRange from '@/lib/formatDate';
import { AiOutlineNotification } from 'react-icons/ai';
import Link from 'next/link';

export default async function HomeEvents() {
    const data = await getLatestEvents();
    const events = data.data.slice(0, 4);

    if (events.length === 0) {
        return null;
    }
    console.log(data);
    return (
        <section>
            <div className='container mt-16'>
                <div className='flex w-full justify-between items-center'>
                    <HeadingTwo heading='Upcoming Events' />
                </div>

                <div>
                    <ul className='divide-y divide-gray-800/10 text-gray-700'>
                        {events.map(event => {
                            if (
                                event?.attributes?.eventType === 'notification'
                            ) {
                                return (
                                    <li
                                        key={event.id}
                                        className='flex items-center justify-between bg-[#0E93C0] rounded-md p-1 my-4 text-gray-200 animate-pulse'>
                                        <div className='flex items-center w-full space-x-4'>
                                            <div className='size-10 flex items-center justify-center rounded-full'>
                                                <AiOutlineNotification className='size-8 ' />
                                            </div>

                                            <div className='font-body flex flex-col items-start'>
                                                <h3 className='text-md'>
                                                    {event?.attributes?.title}
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
                                        {/* {event?.attributes?.startDate && (
                                            <div className='text-xl hidden sm:inline-block'>
                                                {format(
                                                    event?.attributes
                                                        ?.startDate,
                                                    'd'
                                                )}
                                                &nbsp;
                                                <sup>
                                                    {format(
                                                        event?.attributes
                                                            ?.startDate,
                                                        'MMM'
                                                    )}
                                                </sup>
                                            </div>
                                        )} */}
                                    </li>
                                );
                            } else if (
                                event?.attributes?.eventType == null ||
                                event?.attributes?.eventType === 'event'
                            ) {
                                return (
                                    <li
                                        key={event.id}
                                        className='flex items-center justify-between py-4'>
                                        <div className='flex items-center'>
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_URL}${event?.attributes?.featuredImage?.data?.attributes?.formats?.thumbnail?.url}`}
                                                className='size-16 rounded-md object-cover'
                                                alt='A flat white coffee'
                                            />

                                            <Link href={`/events/${event.id}`}>
                                                <div className='ml-6'>
                                                    <p className='text-3xl '>
                                                        {
                                                            event?.attributes
                                                                ?.title
                                                        }
                                                    </p>
                                                    <p className='font-light text-gray-700 text-xs'>
                                                        {formatDateRange(
                                                            event?.attributes
                                                                ?.startDate,
                                                            event?.attributes
                                                                ?.endDate
                                                        )}
                                                    </p>
                                                </div>
                                            </Link>
                                        </div>
                                        {event?.attributes?.startDate && (
                                            <div className='text-xl hidden sm:inline-block'>
                                                {format(
                                                    event?.attributes
                                                        ?.startDate,
                                                    'd'
                                                )}
                                                &nbsp;
                                                <sup>
                                                    {format(
                                                        event?.attributes
                                                            ?.startDate,
                                                        'MMM'
                                                    )}
                                                </sup>
                                            </div>
                                        )}
                                    </li>
                                );
                            } else {
                                // Default case
                                return null; // or any other fallback UI
                            }
                        })}
                    </ul>
                </div>
                <More title='All Events' link='/events' />
            </div>
        </section>
    );
}
