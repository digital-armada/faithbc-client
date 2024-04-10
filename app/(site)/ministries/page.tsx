import HeadingTwo from '@/components/ui/headingtwo';

export default function ministries() {
    const services = {
        days: {
            Wednesday: [
                {
                    // day: 'Wednesday',
                    time: '7pm',
                    name: 'Bible Study',
                    description: '',
                    frequency: 'Weekly',
                    group: 'All',
                },
                {
                    // day: 'Wednesday',
                    time: '7:30pm',
                    name: 'Prayer Group',
                    description: '',
                    frequency: 'Weekly',
                    group: 'All',
                },
            ],
            Friday: [
                {
                    // day: 'Friday',
                    time: '4:30pm to 6:00pm',
                    name: 'Kids Club',
                    description: '',
                    frequency: 'Weekly',
                    group: '6-12 yrs',
                },
                {
                    // day: 'Friday',
                    time: '7:30pm',
                    name: 'Youth Group',
                    description: '',
                    frequency: 'Weekly',
                    group: '13-18 yrs',
                },
            ],
            Sunday: [
                {
                    // day: 'Sunday',
                    time: '10am',
                    name: 'Creche',
                    description: '',
                    frequency: 'Weekly',
                    group: '8 mths - 5 yrs',
                },
                {
                    // day: 'Sunday',
                    time: '10am ',
                    name: 'Sunday School',
                    description: '',
                    frequency: 'Weekly',
                    group: 'TBA',
                },
                {
                    // day: 'Sunday',
                    time: '10am ',
                    name: 'English Morning Service',
                    description: '',
                    frequency: 'Weekly',
                    group: 'TBA',
                },
                {
                    // day: 'Sunday',
                    time: '6pm',
                    name: 'English Evening Service',
                    description: '',
                    frequency: 'Weekly',
                },
                {
                    // day: 'Sunday',
                    time: '7pm',
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
                    time: 'Monthly',
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

    return (
        <section>
            <div className='container'>
                <HeadingTwo heading='Ministries' />
                {Object.entries(services.days).map(([day, services]) => (
                    <div className='mb-12'>
                        <div key={day}>
                            <h2 className='text-2xl text-gray-700 mb-3 font-semibold font-display'>
                                {day}
                            </h2>
                        </div>
                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                            {services.map((service, index) => (
                                <div
                                    key={index}
                                    className='bg-[#bcbcbc] text-gray-700 p-4 mb-4 min-h-48 flex flex-col justify-between '>
                                    <div>
                                        <p className='mt-4 font-display text-lg font-bold'>
                                            {service.name}
                                        </p>
                                    </div>
                                    <div>
                                        {(service.time || service.group) && (
                                            <hr className='border-1 border-gray-700 mb-2' />
                                        )}

                                        <div className='flex gap-8'>
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
