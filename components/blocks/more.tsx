import Link from 'next/link';
import { GrLinkNext } from 'react-icons/gr';

export default function More({ title, link }) {
    return (
        <Link href={link} className='flex items-center gap-4 w-full'>
            <GrLinkNext /> {title}
        </Link>
    );
}
