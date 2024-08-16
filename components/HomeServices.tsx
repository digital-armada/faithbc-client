'use client';
import HeadingTwo from './ui/headingtwo';
import More from './ui/more';
import NottyDot from './ui/NottyDot';

export default function HomeServices() {
    const services = {
        days: {
            Wednesday: [
                {
                    time: '7:00 pm',
                    name: 'Bible Study',
                    description: '',
                },
                {
                    time: '7:30 pm',
                    name: 'Prayer Group',
                    description: '',
                },
            ],
            Friday: [
                {
                    time: '4:30 pm',
                    name: 'Kids Club (During School Term)',
                    description: '',
                },
                {
                    time: '7:30 pm',
                    name: 'Youth Group',
                    description: '',
                },
                {
                    time: '7:30 pm',
                    name: 'Friday Night Arabic Service',
                    description: '',
                    language: 'arabic',
                },
            ],
            Sunday: [
                {
                    time: '10:00 am',
                    name: 'Creche',
                    description: '',
                },
                {
                    time: '10:00 am ',
                    name: 'Sunday School',
                    description: '',
                },
                {
                    time: '10:00 am ',
                    name: 'Morning Service English',
                    description: '',
                },
                {
                    time: '10:00 am ',
                    name: 'Morning Service Arabic',
                    description: '',
                    language: 'arabic',
                },
                {
                    time: '6:00 pm',
                    name: 'Evening Service',
                    description: '',
                },
                {
                    time: '7:00 pm',
                    name: 'Weekly Fellowship Dinner',
                    description: '',
                },
            ],
        },
    };

    const compareDates = (date, day) => {
        const getCurrentDay = () => {
            const days = [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
            ];
            const currentDate = new Date();
            const currentDayIndex = currentDate.getDay();
            const currentDay = days[currentDayIndex];
            return currentDay;
        };

        const currentDay = getCurrentDay();
        const currentHour = new Date().getHours();

        const serviceDate = date.toString();
        if (
            serviceDate === '' ||
            serviceDate === null ||
            serviceDate === undefined
        ) {
            return false;
        }

        let checkTime;
        if (serviceDate.includes('pm')) {
            checkTime = parseInt(serviceDate.split(':')[0]) + 12;
        }

        if (checkTime == currentHour && currentDay == day) return true;
    };

    return (
        <section>
            <div className='container mt-10'>
                <div className='sm:flex w-full justify-between items-center pb-10'>
                    <div>
                        <HeadingTwo heading='Weekly Services' />
                    </div>
                    <div>
                        <More title='All Ministries' link='/ministries' />
                    </div>
                </div>

                <div className='flex-col lg:flex-row flex justify-between mt-10'>
                    {Object.entries(services.days).map(([day, sessions]) => (
                        <div key={day}>
                            <h2 className='text-2xl text-gray-700 mb-3 font-semibold font-display'>
                                {day}
                            </h2>

                            <ul>
                                {sessions.map((session, index, sessions) => (
                                    <li
                                        key={index}
                                        className='relative flex items-center pb-3 '>
                                        <div
                                            className={`before:absolute before:top-3 before:left-[3.5px] before:h-full ml-8 ${
                                                index !== sessions.length - 1
                                                    ? 'before:w-[0.7px] before:bg-gray-500'
                                                    : 'before:w-0'
                                            }`}>
                                            {compareDates(session.time, day) ? (
                                                <NottyDot />
                                            ) : (
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    width='8'
                                                    height='8'
                                                    className='absolute top-[5px] left-0  bi bi-circle-fill fill-gray-500'
                                                    viewBox='0 0 16 16'>
                                                    <circle
                                                        cx='8'
                                                        cy='8'
                                                        r='8'
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                        <div className='flex gap-2 text-sm items-center'>
                                            <p className='font-light  text-gray-600 font-body'>
                                                {session.time}
                                            </p>
                                            <p className=' text-gray-600 text-sm font-body'>
                                                {session.name}
                                            </p>
                                            {session.description && (
                                                <p className='mt-2 text-gray-900 text-lg'>
                                                    {session.description}
                                                </p>
                                            )}
                                            {session.language === 'arabic' ? (
                                                <span className='border-black border-[1px] rounded px-1 py-0 text-sm font-light'>
                                                    العربية
                                                </span>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
