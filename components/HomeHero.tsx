import HomeSermonWidget from './HomeSermonWidget';

export default function HomeHero() {
    return (
        <section>
            <div className='container  rounded-md font-display block md:flex gap-12'>
                <div className='w-full md:w-3/5'>
                    <div className='text-fbc-dark mb-4'>Welcome to</div>
                    <div className='text-gray-700 text-7xl font-bold'>
                        <span>Faith Baptist</span>
                        <br />
                        <span>Church</span>
                    </div>
                    <p className='font-body text-sm mt-10'>
                        We are a church that has it's foundation built upon the
                        Word of God. We welcome you to come and join us for
                        worship through hymns, preaching, teaching, and
                        ministries for children and teenagers, to young adults
                        and parents. At Faith Baptist Church, we believe that
                        the Bible is the one and only source for seeking truth
                        and wisdom.
                    </p>
                </div>
                <HomeSermonWidget />
            </div>
        </section>
    );
}
