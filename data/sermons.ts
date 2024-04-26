export async function getSermons() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/sermons?pagination[limit]=4&populate=*&sort=date:desc`,
            {
                next: { revalidate: 60 },
            }
        );

        if (res.status !== 200) {
            throw new Error('Failed to fetch sermons');
        }

        return res.json();
    } catch (error) {
        throw new Error('Failed to fetch sermons');
    }
}

export async function getInfiniteSermons({ page = 1, search = '' }) {
    try {
        let url = `${process.env.NEXT_PUBLIC_API_URL}/sermons?populate=*&sort=date:desc&pagination[page]=${page}`;

        if (search && search.trim()) {
            url += `&filters[name][$contains]=${encodeURIComponent(search)}`;
        }

        const res = await fetch(url, {
            next: { revalidate: 60 },
        });

        if (res.status !== 200) {
            throw new Error('Failed to fetch sermons');
        }

        return res.json();
    } catch (error) {
        throw new Error('Failed to fetch users');
    }
}

// export async function getSermons() {
//     // const session = await auth();
//     // const accessToken = session?.accessToken;
//     try {
//         const res = await axios.get(
//             `${process.env.NEXT_PUBLIC_API_URL}/sermons?pagination[limit]=4&populate=*&sort=date:desc`
//             // {
//             //     headers: {
//             //         Authorization: `Bearer ${accessToken}`,
//             //     },
//             // }
//         );
//         console.log(res.data);
//         if (res.status !== 200) {
//             throw new Error('Failed to fetch sermons');
//         }
//
//         return res.data;
//     } catch (error) {
//         throw new Error('Failed to fetch sermons');
//     }
// }
