import Breadcrumbs from './Breadcrumbs';
import HeadingTwo from './headingtwo';

export default function PageHeader({ heading }) {
    return (
        <div className='mb-10'>
            <HeadingTwo heading={heading} />
            <Breadcrumbs
                labelsToUppercase={false}
                listClassName='flex gap-4'
                containerClassName='pt-4 pb-6 capitalize'
                separator='/'
            />
        </div>
    );
}
