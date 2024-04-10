import HomeEvents from '@/components/HomeEvents';
import HomeHero from '@/components/HomeHero';
import HomeServices from '@/components/HomeServices';
import Image from 'next/image';

export default function Page() {
    return (
        <>
            <HomeHero />
            <HomeEvents />
            <HomeServices />
        </>
    );
}
