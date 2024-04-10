import formatDateRange from '@/lib/formatDate';
import { format } from 'date-fns';
import Link from 'next/link';
import { AiOutlineNotification } from 'react-icons/ai';

export default function EventItem({ event }) {
    return (
        <>
            {event?.attributes?.eventType === 'notification' && (
                <li
                    key={event.id}
                    className='flex items-center justify-between bg-[#0E93C0] rounded-md p-1 my-4 text-gray-200 animate-pulse'>
                    <div className='flex items-center w-full space-x-4'>
                        <div className='size-10 flex items-center justify-center rounded-full'>
                            <AiOutlineNotification className='size-8' />
                        </div>

                        <div className='font-body flex flex-col items-start'>
                            <h3 className='text-md'>
                                {event?.attributes?.title}
                            </h3>
                            <p className='text-gray-200 text-xs'>
                                {formatDateRange(
                                    event?.attributes?.startDate,
                                    event?.attributes?.endDate
                                )}
                            </p>
                        </div>
                    </div>
                </li>
            )}

            {(!event?.attributes?.eventType ||
                event?.attributes?.eventType === 'event') && (
                <li
                    key={event.id}
                    className='flex items-center justify-between py-4  '>
                    <div className='flex items-center'>
                        <img
                            src={`${process.env.NEXT_PUBLIC_URL}${event?.attributes?.featuredImage?.data?.attributes?.formats?.thumbnail?.url}`}
                            className='size-16 rounded-md object-cover'
                            alt='A flat white coffee'
                        />

                        <Link href={`/events/${event.id}`}>
                            <div className='ml-6'>
                                <p className='text-3xl'>
                                    {event?.attributes?.title}
                                </p>
                                <p className='font-light text-gray-700 text-xs'>
                                    {formatDateRange(
                                        event?.attributes?.startDate,
                                        event?.attributes?.endDate
                                    )}
                                </p>
                            </div>
                        </Link>
                    </div>
                    {event?.attributes?.startDate && (
                        <div className='text-xl hidden sm:inline-block'>
                            {format(event?.attributes?.startDate, 'd')}
                            &nbsp;
                            <sup>
                                {format(event?.attributes?.startDate, 'MMM yy')}
                            </sup>
                        </div>
                    )}
                </li>
            )}
        </>
    );
}
