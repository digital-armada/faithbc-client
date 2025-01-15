export default function NottyDot() {
    return (
        <span className='absolute -translate-x-1/2 -translate-y-1/2 top-0 left-0 flex h-3 w-3'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-fbc-dark opacity-75'></span>
            <span className='relative inline-flex rounded-full h-3 w-3 bg-fbc-dark'></span>
        </span>
    );
}
