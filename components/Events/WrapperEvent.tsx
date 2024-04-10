'use client';
import InfiniteScroll from '@/components/ui/InfiniteScroll';
import { getInfiniteEvents } from '@/actions/events';
import EventItem from './EventItem';
import { format, isAfter, isBefore, isSameDay, isSameMonth } from 'date-fns';

export default function WrapperEvent({ initialEvents }) {
    console.log(initialEvents);
    const fetchData = async ({ page }) => {
        console.log(page);
        const { data } = await getInfiniteEvents({ page });
        return data;
    };

    const renderItem = (event, index) => (
        <EventItem key={index} event={event} />
    );

    const today = new Date();
    const currentMonth = format(today, 'MMMM');

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const upcomingEvents = initialEvents
        .filter(event => {
            const eventDate = new Date(event.attributes.startDate);
            return (
                isAfter(eventDate, today) &&
                eventDate.getMonth() > today.getMonth()
            );
        })
        .sort(
            (a, b) =>
                new Date(b.attributes.startDate) -
                new Date(a.attributes.startDate)
        );

    const thisMonthEvents = initialEvents.filter(event => {
        const eventDate = new Date(event.attributes.startDate);
        return (
            isSameMonth(eventDate, today) &&
            (isSameDay(eventDate, today) || isAfter(eventDate, today))
        );
    });

    const pastEvents = initialEvents.filter(event => {
        const eventDate = new Date(event.attributes.startDate);
        return isBefore(eventDate, tomorrow) && !isSameDay(eventDate, today);
    });

    return (
        <section>
            <ul className=' text-gray-700 container'>
                {upcomingEvents.length > 0 && (
                    <div className='mb-20'>
                        <h2 className='text-4xl font-bold mb-4'>
                            Future Events
                        </h2>
                        <div className='divide-y divide-gray-800/10 opacity-50'>
                            {upcomingEvents.map(renderItem)}
                        </div>
                    </div>
                )}
                {thisMonthEvents.length > 0 && (
                    <div className='mb-20'>
                        <h2 className='text-4xl font-bold mb-4'>
                            Events This {currentMonth}
                        </h2>
                        <div className='divide-y divide-gray-800/10'>
                            {thisMonthEvents.map(renderItem)}
                        </div>
                    </div>
                )}

                <h2 className='text-4xl font-bold mb-4'>Past Events</h2>
                <div className='divide-y divide-gray-800/10 opacity-50'>
                    <InfiniteScroll
                        initialData={pastEvents}
                        fetchData={fetchData}
                        renderItem={renderItem}
                    />
                </div>
            </ul>
        </section>
    );
}
