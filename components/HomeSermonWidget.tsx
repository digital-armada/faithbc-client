import More from './ui/more';
import { getSermons } from '@/data/sermons';
import HomeSermonCard from './HomeSermonCard';

export default async function HomeSermonWidget() {
    const data = await getSermons();
    const sermons = data.data.slice(0, 4);
    console.log(sermons);
    return (
        <div className='w-full md:w-2/5 space-y-4 mt-8 md:mt-20 text-sm font-body'>
            <h3 className='text-3xl font-display font-bold text-gray-700'>
                Latest Sermons
            </h3>
            {sermons?.map(sermon => {
                return <HomeSermonCard sermon={sermon} />;
            })}
            {/* <pre>{JSON.stringify(sermons.data, null, 4)}</pre> */}
            <More title='All Sermons' link='/sermons' />
        </div>
    );
}
