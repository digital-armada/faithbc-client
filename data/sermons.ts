import { auth } from '@/auth';
import axios from 'axios';

export async function getSermons() {
    // const session = await auth();
    // const accessToken = session?.accessToken;
    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/sermons?populate=*&sort=date:desc`
            // {
            //     headers: {
            //         Authorization: `Bearer ${accessToken}`,
            //     },
            // }
        );
        // console.log(res.data);
        if (res.status !== 200) {
            throw new Error('Failed to fetch users');
        }

        return res.data;
    } catch (error) {
        throw new Error('Failed to fetch users');
    }
}
