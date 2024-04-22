import Breadcrumbs from '@/components/ui/Breadcrumbs';
import HeadingTwo from '@/components/ui/headingtwo';
import { getStatement } from '@/data/doctrines';
import Link from 'next/link';
import Markdown from 'react-markdown';

export default async function Page({ params }) {
    const data = await getStatement(params.slug);

    return (
        <section>
            <div className='markdown container' key={data.id}>
                <HeadingTwo heading={data?.title} />

                <Breadcrumbs
                    labelsToUppercase={false}
                    listClassName='flex gap-4'
                    containerClassName='pt-4 pb-6 capitalize text-sm'
                    separator='/'
                />

                <Markdown>{data?.content}</Markdown>
                <Link href={`/statement`}>
                    <div className='bg-fbc-dark text-white px-4 py-1 rounded-md w-fit cursor-pointer mt-10'>
                        &lt;&nbsp;back
                    </div>
                </Link>
            </div>
        </section>
    );
}
