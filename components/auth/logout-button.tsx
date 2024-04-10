'use client';

import { logout } from '@/actions/logout';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
interface LogoutButtonProps {
    children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
    const router = useRouter();

    const onClick = () => {
        logout();
        router.push('/');
        toast.success('Logged out successfully');
    };

    return (
        <span onClick={onClick} className='cursor-pointer'>
            {children}
        </span>
    );
};
