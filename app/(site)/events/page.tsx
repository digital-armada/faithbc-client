import { getInfiniteEvents, getNotifications } from '@/data/events';

import WrapperEvent from '@/components/Events/WrapperEvent';

export default async function page() {
    const { data } = await getInfiniteEvents({ page: 1 });

    const initialEvents = data;

    return <WrapperEvent initialEvents={initialEvents} />;
}
