'use client';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import LoadingSpinner from './LoadingSpinner';

export default function InfiniteScroll({ fetchData, renderItem, initialData }) {
    const [data, setData] = useState(initialData);
    const [page, setPage] = useState(1);
    const [ref, inView] = useInView();
    const [loading, setLoading] = useState(false);

    const loadMoreData = async () => {
        const next = page + 1;
        if (loading) return;
        setLoading(true);

        try {
            const newData = await fetchData({ page: next });
            setData(prevData => [...prevData, ...newData]);
            setPage(prevPage => prevPage + 1);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (inView) {
            loadMoreData();
        }
    }, [inView]);

    return (
        <>
            {data.map((item, index) => renderItem(item, index))}
            {loading && <LoadingSpinner />}
            <div ref={ref} />
        </>
    );
}
