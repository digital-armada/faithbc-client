import { getAllGroups } from '@/actions/dashboard';
import FormAddGroup from '@/components/Forms/FormAddGroup';
import Sms from '@/components/Sms';

export default async function Page() {
    const { data } = await getAllGroups();
    return (
        <form>
            <div className='space-y-12'>
                <div className='border-b border-gray-900/10 pb-12'>
                    <h2 className='text-base font-semibold leading-7 text-gray-900'>
                        Profile
                    </h2>
                    <p className='mt-1 text-sm leading-6 text-gray-600'>
                        This information will be displayed publicly so be
                        careful what you share.
                    </p>
                    {/* <FormAddGroup /> */}

                    {/* <Sms data={data} /> */}
                    <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                        <div className='col-span-full'>
                            <label
                                htmlFor='about'
                                className='block text-sm font-medium leading-6 text-gray-900'>
                                About
                            </label>
                            <div className='mt-2'>
                                <textarea
                                    id='about'
                                    name='about'
                                    rows={3}
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                    defaultValue={''}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-6 flex items-center justify-end gap-x-6'>
                <button
                    type='button'
                    className='text-sm font-semibold leading-6 text-gray-900'>
                    Cancel
                </button>
                <button
                    type='submit'
                    className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                    Broadcast
                </button>
            </div>
        </form>
    );
}
