import { getInfiniteEvents } from '@/actions/events';

import WrapperEvent from '@/components/Events/WrapperEvent';

export default async function page() {
    const { data } = await getInfiniteEvents({ page: 1 });
    // console.log(data);
    const initialEvents = data;

    return <WrapperEvent initialEvents={initialEvents} />;
}
