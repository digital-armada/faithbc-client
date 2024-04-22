import More from './ui/more';
import { getSermons } from '@/data/sermons';
import HomeSermonCard from './HomeSermonCard';
import HeadingTwo from './ui/headingtwo';

export default async function HomeSermonWidget() {
    const data = await getSermons();
    const sermons = data.data.slice(0, 4);

    return (
        <section>
            <div className='w-full space-y-4 mt-10 text-sm font-body container '>
                <div className='sm:flex w-full justify-between items-center pb-10'>
                    <div>
                        <HeadingTwo heading='Recent Sermons' />
                    </div>
                    <div>
                        <More title='All Sermons' link='/sermons' />
                    </div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
                    {sermons?.map(sermon => {
                        console.log(sermon);
                        return (
                            <HomeSermonCard sermon={sermon} key={sermon.id} />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
