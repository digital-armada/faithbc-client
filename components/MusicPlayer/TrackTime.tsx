export default function TrackTime({ children, value, max }) {
    const getTime = time =>
        `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;

    return (
        // <div className='flex justify-center text-sm font-light text-white max-w-7xl mx-auto '>
        <div className='flex items-center justify-center text-sm font-light text-white lg:flex'>
            <p>{value === 0 ? '0:00' : getTime(value)}</p>
            <span>&nbsp;{children}&nbsp;</span>
            <p>{max === 0 ? '0:00' : getTime(max)}</p>
        </div>
    );
}
