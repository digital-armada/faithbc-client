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
                <div className='font-body text-sm flex flex-col gap-4'>
                    <p>
                        We are an Independent Baptist church built upon the firm
                        foundation of God's inerrant Word and believe the KJV is
                        the most faithful English translation, and it is our
                        sole source for truth and wisdom.
                    </p>
                    <p>
                        At our church, we worship the Lord through biblical
                        preaching, teaching, hymns, and vibrant ministries for
                        all ages - children, teens, and adults. Our services,
                        available in both English and Arabic, are reverent and
                        God-honoring as we seek to glorify Him in all we do.
                    </p>
                    <p>
                        Whether you are a lifelong believer or simply seeking
                        answers about the Christian faith, we invite you to join
                        us for worship and bible study. Our church family is
                        committed to proclaiming the truth of Scripture and
                        sharing the life-changing gospel of Jesus Christ.
                    </p>
                    <p>We look forward to welcoming you in person soon!</p>
                </div>
                <More title='Statement of Faith' link='/statement' />
            </div>
        </section>
    );
}
