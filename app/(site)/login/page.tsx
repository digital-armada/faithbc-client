'use client';
import axios from 'axios';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Page() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [values, setValues] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();
        const { email, password } = values;
        if (!email || !password) {
            toast.error('Please enter your email and password.');
            return; // Exit the function if empty
        }
        try {
            // Attempt to sign in the user
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            // Check if sign-in was successful
            if (result?.error) {
                // Display an error toast if sign-in failed
                toast.error('Failed to log in. Please check your credentials.');
            } else {
                // Display a success toast if sign-in was successful
                toast.success('Successfully logged in');
                // Clear values field
                setValues({});

                // Redirect user after login
                router.push('/dashboard');
            }

            // Handle the result of signIn
            console.log(result);
        } catch (error) {
            // Handle any other errors
            console.error('Sign in failed:', error);
            toast.error('An error occurred. Please try again later.');
        }
    };

    const handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        setValues(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <>
            <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <img
                        className='mx-auto h-10 w-auto'
                        src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
                        alt='Your Company'
                    />
                    <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                        Sign in to your account
                    </h2>
                </div>

                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                    <form className='space-y-6' onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor='email'
                                className='block text-sm font-medium leading-6 text-gray-900'>
                                Email address
                            </label>
                            <div className='mt-2'>
                                <input
                                    onChange={handleChange}
                                    id='email'
                                    name='email'
                                    type='email'
                                    autoComplete='email'
                                    required
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                />
                            </div>
                        </div>

                        <div>
                            <div className='flex items-center justify-between'>
                                <label
                                    htmlFor='password'
                                    className='block text-sm font-medium leading-6 text-gray-900'>
                                    Password
                                </label>
                                <div className='text-sm'>
                                    <a
                                        href='#'
                                        className='font-semibold text-indigo-600 hover:text-indigo-500'>
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className='mt-2'>
                                <input
                                    onChange={handleChange}
                                    id='password'
                                    name='password'
                                    type='password'
                                    autoComplete='current-password'
                                    required
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type='submit'
                                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                                Sign in
                            </button>
                        </div>
                    </form>

                    <div className='mt-10 text-center text-sm text-gray-500'>
                        Not a member?{' '}
                        <a
                            href='#'
                            className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'>
                            {session && <p>Welcome, {session.user.name}!</p>}
                        </a>
                        <button onClick={signOut}>Signout</button>
                    </div>
                </div>
            </div>
        </>
    );
}
