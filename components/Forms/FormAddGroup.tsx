'use client';
import { createGroup } from '@/actions/dashboard';
import { useFormState, useFormStatus } from 'react-dom';

const initialState = { message: null };

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button type='submit' aria-disabled={pending}>
            Create
        </button>
    );
}

export default function FormAddGroup() {
    const [state, formAction] = useFormState(createGroup, initialState);
    return (
        <form action={formAction}>
            <label htmlFor='group'>Create Group</label>
            <input type='text' id='group' name='group' required />
            <SubmitButton />
            <p aria-live='polite' className='sr-only' role='status'>
                {state?.message}
            </p>
        </form>
    );
}
