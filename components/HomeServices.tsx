import HeadingTwo from './ui/headingtwo';
import More from './ui/more';

export default function HomeServices() {
    const services = {
        days: {
            Wednesday: [
                {
                    time: '7pm',
                    name: 'Bible Study',
                    description: '',
                },
                {
                    time: '7:30pm',
                    name: 'Prayer Group',
                    description: '',
                },
            ],
            Friday: [
                {
                    time: '4:30pm to 6:00pm',
                    name: 'Kids Club',
                    description: '',
                },
                {
                    time: '7:30pm',
                    name: 'Youth Group',
                    description: '',
                },
            ],
            Sunday: [
                {
                    time: '10am',
                    name: 'Creche',
                    description: '',
                },
                {
                    time: '10am ',
                    name: 'Sunday School',
                    description: '',
                },
                {
                    time: '10am ',
                    name: 'Morning Service',
                    description: '',
                },
                {
                    time: '6pm',
                    name: 'Evening Service',
                    description: '',
                },
                {
                    time: '7pm',
                    name: 'Weekly Fellowship Dinner',
                    description: '',
                },
            ],
        },
    };

    return (
        <section>
            <div className='container'>
                <HeadingTwo heading='Weekly Services' />
                <div className=' md:flex gap-8 md:justify-between'>
                    {Object.entries(services.days).map(([day, sessions]) => (
                        <div key={day}>
                            <h2 className='text-2xl text-gray-700 mb-3 font-semibold font-display'>
                                {day}
                            </h2>

                            <ul>
                                {sessions.map((session, index, sessions) => (
                                    <li
                                        key={index}
                                        className='relative flex items-baseline gap-6 pb-3 '>
                                        <div
                                            className={`before:absolute before:left-[3.5px] before:h-full ${
                                                index !== sessions.length - 1
                                                    ? 'before:w-[1px] before:bg-gray-500'
                                                    : 'before:w-0'
                                            }`}>
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='8'
                                                height='8'
                                                className='bi bi-circle-fill fill-gray-500'
                                                viewBox='0 0 16 16'>
                                                <circle cx='8' cy='8' r='8' />
                                            </svg>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <p className='font-light text-xs text-gray-600 font-display'>
                                                {session.time}
                                            </p>
                                            <p className=' text-gray-600 text-md font-body'>
                                                {session.name}
                                            </p>
                                            {session.description && (
                                                <p className='mt-2 text-gray-900 text-lg'>
                                                    {session.description}
                                                </p>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <More title='All Ministries' link='/ministries' />
            </div>
        </section>
    );
}
