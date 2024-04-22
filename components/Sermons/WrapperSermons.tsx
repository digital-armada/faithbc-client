'use client';
import InfiniteScroll from '@/components/ui/InfiniteScroll';
import SermonItem from './SermonItem';
import { getInfiniteSermons } from '@/data/sermons';
import HeadingTwo from '@/components/ui/headingtwo';
import PageHeader from '../ui/PageHeader';

export default function WrapperSermons({ initialSermons }) {
    const fetchData = async ({ page }) => {
        console.log(page);

        const { data } = await getInfiniteSermons({ page });
        return data;
    };

    const renderItem = (sermon, index) => (
        <SermonItem key={index} sermon={sermon} />
    );

    return (
        <section>
            <div className=' text-gray-700 container'>
                <PageHeader heading='Sermons' />{' '}
                <InfiniteScroll
                    initialData={initialSermons}
                    fetchData={fetchData}
                    renderItem={renderItem}
                />
            </div>
        </section>
    );
}
