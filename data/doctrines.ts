import axios from 'axios';

export async function getStatement(slug: string) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/doctrines/${slug}`,
            {
                next: { revalidate: 60 },
            }
        );
        if (res.status !== 200) {
            throw new Error('Failed to fetch statements');
        }

        return res.json();
    } catch (error) {
        throw new Error('Failed to fetch statements');
    }
}

export async function getStatements() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/doctrines?pagination[limit]=30`,
            {
                next: { revalidate: 60 },
            }
        );

        if (res.status !== 200) {
            throw new Error('Failed to fetch statements');
        }

        return res.json();
    } catch (error) {
        throw new Error('Failed to fetch statements');
    }
}
