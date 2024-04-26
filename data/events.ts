import { auth } from '@/auth';
import axios from 'axios';

export async function getEventSlug(slug: string) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/events/${slug}?populate=*`,
            {
                next: { revalidate: 60 },
            }
        );

        if (res.status !== 200) {
            throw new Error('Failed to fetch event');
        }

        return res.json();
    } catch (error) {
        throw new Error('Failed to fetch event' + error);
    }
}

// export async function getEvent(id: string) {
//     const session = await auth();
//     const accessToken = session?.accessToken;
//     console.log(id);
//     try {
//         const res = await axios.get(
//             `${process.env.NEXT_PUBLIC_API_URL}/events/${id}?populate=*`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             }
//         );
//
//         console.log(res.data);
//         if (res.status !== 200) {
//             throw new Error('Failed to fetch event');
//         }
//
//         return res.data;
//     } catch (error) {
//         throw new Error('Failed to fetch event');
//     }
// }

export async function getEvents() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/events?populate=*&sort=createdAt:desc`,
            {
                next: { revalidate: 60 },
            }
        );
        if (res.status !== 200) {
            throw new Error('Failed to fetch users');
        }

        return res.json();
    } catch (error) {
        throw new Error('Failed to fetch users');
    }
}

export async function getLatestEvents() {
    const currentDate = new Date().toISOString().split('T')[0]; // Cutting the time out so events that are 12:00am are not automatically filtered out.

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/events?populate=*&sort=createdAt:desc&filters[startDate][$gte]=${currentDate}`,
            {
                next: { revalidate: 60 },
            }
        );
        if (res.status !== 200) {
            throw new Error('Failed to fetch users');
        }

        return res.json();
    } catch (error) {
        throw new Error('Failed to fetch users');
    }
}

export async function getInfiniteEvents({
    page = 1,
    // search = ''
}) {
    try {
        let url = `${process.env.NEXT_PUBLIC_API_URL}/events?populate=*&sort=createdAt:desc&pagination[page]=${page}`;

        // if (search && search.trim()) {
        //     url += `&filters[name][$contains]=${encodeURIComponent(search)}`;
        // }

        const res = await fetch(url, {
            next: { revalidate: 60 },
        });

        if (res.status !== 200) {
            throw new Error('Failed to fetch events');
        }

        return res.json();
    } catch (error) {
        throw new Error('Failed to fetch events:' + error);
    }
}
