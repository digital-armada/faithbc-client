'use server';
import { auth } from '@/auth';
import axios from 'axios';

export async function getInfiniteSermons({ page = 1, search = '' }) {
    const session = await auth();
    const accessToken = session?.accessToken;

    try {
        let url = `${process.env.NEXT_PUBLIC_API_URL}/sermons?populate=*&sort=date:desc&pagination[page]=${page}`;

        if (search && search.trim()) {
            url += `&filters[name][$contains]=${encodeURIComponent(search)}`;
        }

        const res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        // console.log(res.data);

        if (res.status !== 200) {
            throw new Error('Failed to fetch sermons');
        }

        return res.data;
    } catch (error) {
        throw new Error('Failed to fetch users');
    }
}
