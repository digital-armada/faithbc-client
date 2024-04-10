'use client';

import { createNewUser } from '@/actions/dashboard';

export default function UserForm() {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        try {
            const result = await createNewUser(formData);
            console.log(result.message);
            // Optionally, reset the form or perform additional actions
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Form fields */}
            <input type='email' name='email' placeholder='Email' required />
            <input
                type='text'
                name='username'
                placeholder='Username'
                required
            />
            <input
                type='password'
                name='password'
                placeholder='Password'
                required
            />
            <input
                type='text'
                name='firstName'
                placeholder='firstName'
                required
            />
            <input
                type='text'
                name='lastName'
                placeholder='lastName'
                required
            />
            <input
                type='text'
                name='contactNumber'
                placeholder='Contact'
                required
            />
            <input
                type='date'
                name='dateOfBirth'
                placeholder='dateOfBirth'
                required
            />
            <button type='submit'>Create User</button>
        </form>
    );
}
