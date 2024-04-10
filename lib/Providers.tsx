'use client';

import { SessionProvider } from 'next-auth/react';
import { store } from '@/redux/store';
import { Provider } from 'react-redux';

const Providers = ({ children }: { children: React.ReactNode }) => (
    <SessionProvider>
        <Provider store={store}>{children}</Provider>
    </SessionProvider>
);

export default Providers;
