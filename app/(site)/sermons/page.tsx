import { getInfiniteSermons } from '@/data/sermons';
import WrapperSermons from '@/components/Sermons/WrapperSermons';

export default async function page({ searchParams }) {
    const { data } = await getInfiniteSermons({ searchParams, page: 1 });
    const initialSermons = data;

    return <WrapperSermons initialSermons={initialSermons} />;
}
