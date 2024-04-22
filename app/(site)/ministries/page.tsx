import PageHeader from '@/components/ui/PageHeader';
import HeadingTwo from '@/components/ui/headingtwo';
import NottyDot from '@/components/ui/NottyDot';

export default function ministries() {
    const services = {
        days: {
            Wednesday: [
                {
                    // day: 'Wednesday',
                    time: '7:00 pm',
                    name: 'Bible Study',
                    description: '',
                    frequency: 'Weekly',
                    group: 'All',
                },
                {
                    // day: 'Wednesday',
                    time: '7:30 pm',
                    name: 'Prayer Group',
                    description: '',
                    frequency: 'Weekly',
                    group: 'All',
                },
            ],
            Friday: [
                {
                    // day: 'Friday',
                    time: '4:30pm',
                    name: 'Kids Club',
                    description: '',
                    frequency: 'Weekly',
                    group: '6-12 yrs',
                },
                {
                    // day: 'Friday',
                    time: '7:30 pm',
                    name: 'Youth Group',
                    description: '',
                    frequency: 'Weekly',
                    group: '13-18 yrs',
                },
            ],
            Sunday: [
                {
                    // day: 'Sunday',
                    time: '10:00 am',
                    name: 'Creche',
                    description: '',
                    frequency: 'Weekly',
                    group: '8 mths - 5 yrs',
                },
                {
                    // day: 'Sunday',
                    time: '10:00 am ',
                    name: 'Sunday School',
                    description: '',
                    frequency: 'Weekly',
                    group: 'TBA',
                },
                {
                    // day: 'Sunday',
                    time: '10:00 am ',
                    name: 'English Morning Service',
                    description: '',
                    frequency: 'Weekly',
                    group: 'TBA',
                },
                {
                    // day: 'Sunday',
                    time: '3:00 pm',
                    name: 'English Evening Service',
                    description: '',
                    frequency: 'Weekly',
                },
                {
                    // day: 'Sunday',
                    time: '7:00 pm',
                    name: 'Weekly Fellowship Dinner',
                    description: '',
                    frequency: 'Weekly',
                    group: '',
                },
            ],
            Fortnightly: [
                {
                    // day: '',
                    time: '',
                    name: 'Outreach Ministry',
                    description: '',
                    frequency: 'Fortnightly',
                    group: '',
                },
            ],
            Monthly: [
                {
                    // day: '',
                    time: '',
                    name: 'Visitation Ministry',
                    description: '',
                    frequency: 'Monthly',
                    group: '',
                },
                {
                    // day: '',
                    time: '',
                    name: "Men's Fellowship",
                    description: '',
                    frequency: 'Monthly',
                    group: 'Men Youth and Above',
                },
                {
                    // day: '',
                    time: '',
                    name: "Women's Fellowship",
                    description: '',
                    frequency: 'Monthly',
                    group: 'Women Youth and Above',
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
        console.log(currentHour);
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
            <div className='container'>
                <PageHeader heading='Ministries' />
                {Object.entries(services.days).map(([day, services]) => (
                    <div key={day} className='mb-12'>
                        <div>
                            <h2 className='text-2xl text-gray-700 mb-3 font-semibold font-display'>
                                {day}
                            </h2>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 '>
                            {services.map((service, index) => (
                                <div
                                    key={index}
                                    className='bg-[#bcbcbc] text-gray-700 p-4 mb-4 flex flex-col justify-between rounded-md shadow-md relative'>
                                    {compareDates(service.time, day) ? (
                                        <NottyDot />
                                    ) : (
                                        ''
                                    )}

                                    <div>
                                        <p className=' font-display text-lg font-bold'>
                                            {service.name}
                                        </p>
                                        {(service.time || service.group) && (
                                            <hr className='border-1 border-gray-700 mb-2' />
                                        )}
                                    </div>
                                    <div>
                                        <div className='flex gap-4 '>
                                            {service.time && (
                                                <div className='font-body'>
                                                    <p className='text-[10px] font-bold'>
                                                        When
                                                    </p>
                                                    <p className='text-[10px] font-thin'>
                                                        {service.time}
                                                    </p>
                                                </div>
                                            )}
                                            {service.group && (
                                                <div className='font-body'>
                                                    <p className='text-[10px] font-bold'>
                                                        Who
                                                    </p>
                                                    <p className='text-[10px] font-thin'>
                                                        {service.group}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
