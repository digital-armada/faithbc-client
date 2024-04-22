import axios from 'axios';

export async function getStatement(slug: string) {
    console.log(slug);
    // const session = await auth();
    // const accessToken = session?.accessToken;
    // const parseId = parseInt(id);
    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/doctrines/${slug}`
            // {
            //     headers: {
            //         Authorization: `Bearer ${accessToken}`,
            //     },
            // }
        );
        console.log(res.data);
        if (res.status !== 200) {
            throw new Error('Failed to fetch statements');
        }

        return res.data;
    } catch (error) {
        throw new Error('Failed to fetch statements');
    }
}

export async function getStatements() {
    // const session = await auth();
    // const accessToken = session?.accessToken;
    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/doctrines?pagination[limit]=30`
            // {
            //     headers: {
            //         Authorization: `Bearer ${accessToken}`,
            //     },
            // }
        );
        // console.log(res.data);
        if (res.status !== 200) {
            throw new Error('Failed to fetch statements');
        }

        return res.data;
    } catch (error) {
        throw new Error('Failed to fetch statements');
    }
}
