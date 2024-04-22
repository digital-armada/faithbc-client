import Menu from '@/components/Menu/Menu';
import Providers from '@/lib/Providers';

export default function Layout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='noise min-h-screen pb-20'>
            <Providers>
                <Menu />
                {children}
            </Providers>
        </div>
    );
}
