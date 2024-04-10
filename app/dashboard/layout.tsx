import Header from '@/components/Dash/header';
import HeaderMobile from '@/components/Dash/header-mobile';
import MarginWidthWrapper from '@/components/Dash/margin-width-wrapper';
import PageWrapper from '@/components/Dash/page-wrapper';
import SideNav from '@/components/Dash/side-nav';
import DashMenu from '@/components/Menu/DashMenu';

export default function Layout({ children }) {
    return (
        <>
            <div className='flex'>
                <SideNav />

                <main className='flex-1'>
                    <MarginWidthWrapper>
                        <Header />
                        <HeaderMobile />
                        <PageWrapper>{children}</PageWrapper>
                    </MarginWidthWrapper>
                </main>
            </div>
            {/* <div className='min-h-full'>
                <DashMenu />
                <DashSidebar />
                <header className='bg-white shadow'>
                    <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
                        <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
                            Dashboard
                        </h1>
                    </div>
                </header>
                <main>
                    <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
                        {children}
                    </div>
                </main>
            </div> */}
        </>
    );
}
