import { getEventSlug } from '@/data/events';
import EventMap from '@/components/EventMap';
import HeadingTwo from '@/components/ui/headingtwo';
import formatDateRange from '@/lib/formatDate';
import getAddressCoordinates from '@/lib/getAddressCoordinates';
import Image from 'next/image';
import { Suspense } from 'react';
import { IoMdCalendar, IoMdMap } from 'react-icons/io';
import Markdown from 'react-markdown';
import { redirect } from 'next/navigation';

export default async function page({ params }) {
    const id = params?.id;
    const slug = params?.slug;

    const data = await getEventSlug(slug);
    const address = data?.venAdd;
    const rid = id - 1;

    if (data?.eventType === 'notification') {
        redirect(`/events/${rid}`); // Navigate to the new events page
    }
    const formats = data?.featuredImage?.formats;

    const sizes = ['medium', 'small', 'thumbnail'];
    sizes.reverse();

    const imgSrc = sizes.reduce((url, size) => {
        if (formats[size]) {
            url = `${process.env.NEXT_PUBLIC_URL}${formats[size].url}`;
        }
        return url;
    }, '');

    return (
        <section>
            <div className='container min-h-screen'>
                <div className='relative w-full h-80 mb-10'>
                    {data?.featuredImage ? (
                        <>
                            <Image
                                src={imgSrc}
                                alt={data?.title}
                                fill
                                objectFit='cover'
                                className='rounded-md blur-lg'
                                quality={10}
                            />
                            <Image
                                src={imgSrc}
                                alt={data?.title}
                                fill
                                objectFit='contain'
                                className='rounded-md'
                            />
                        </>
                    ) : (
                        ''
                    )}
                </div>
                <HeadingTwo heading={data?.title} />

                <div className='sm:flex gap-6 mt-10'>
                    {address ? (
                        <>
                            <div className='w-full sm:w-1/2'>
                                <EventDetails data={data} />
                            </div>
                            <div className='w-full sm:w-1/2'>
                                <Suspense fallback={<div>Loading...</div>}>
                                    <EventMap address={address} />
                                </Suspense>
                            </div>
                        </>
                    ) : (
                        <div className='w-full'>
                            <EventDetails data={data} />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

const EventDetails = ({ data }) => {
    return (
        <div className='w-full text-gray-700 space-y-8 pb-8'>
            <div>
                <h3 className='text-lg font-bold'>Date and Time</h3>
                <div className='flex gap-3 items-center '>
                    <IoMdCalendar className='text-2xl' />

                    <p className='text-md'>
                        {formatDateRange(data?.startDate, data?.endDate)}
                    </p>
                </div>
            </div>
            <div>
                <h3 className='text-lg font-bold'>Location</h3>
                <div className='flex items-start gap-3 '>
                    <IoMdMap className='text-2xl' />
                    <div>
                        <div className='text-md'>{data?.venName}</div>
                        <div className='font-light text-xs'>{data?.venAdd}</div>
                    </div>
                </div>
            </div>
            <h3 className='text-lg font-bold text-gray-700 mt-10'>
                Additional Info
            </h3>
            <Markdown>{data?.content}</Markdown>
        </div>
    );
};
