import HomeSermonWidget from './HomeSermonWidget';
import More from './ui/more';

export default function HomeHero() {
    return (
        <section>
            <div className='container w-full rounded-md font-display block mt-10 space-y-6 '>
                <div className='text-fbc-dark'>Welcome to</div>
                <div className='text-gray-700 text-7xl font-bold'>
                    <span>Faith Baptist</span>
                    <br />
                    <span>Church</span>
                </div>
                <p className='font-body text-sm'>
                    We are a church that has its foundation built upon the Word
                    of God. We welcome you to come and join us for worship
                    through hymns, preaching, teaching, and ministries for
                    children and teenagers, to young adults and parents. At
                    Faith Baptist Church, we believe that the Bible is the one
                    and only source for seeking truth and wisdom.
                </p>

                <More title='Statement of Faith' link='/statement' />
            </div>
        </section>
    );
}
