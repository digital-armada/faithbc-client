// 'use server';
//
// import { auth } from '@/auth';
// import axios from 'axios';
//
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
//
// export async function getLatestEvents() {
//     // const session = await auth();
//     // const accessToken = session?.accessToken;
//     const currentDate = new Date().toISOString().split('T')[0]; // Cutting the time out so events that are 12:00am are not automatically filtered out.
//
//     try {
//         const res = await axios.get(
//             `${process.env.NEXT_PUBLIC_API_URL}/events?populate=*&sort=createdAt:desc&filters[startDate][$gte]=${currentDate}`
//
//             // {
//             //     headers: {
//             //         Authorization: `Bearer ${accessToken}`,
//             //     },
//             // }
//         );
//         if (res.status !== 200) {
//             throw new Error('Failed to fetch users');
//         }
//
//         return res.data;
//     } catch (error) {
//         throw new Error('Failed to fetch users' + error);
//     }
// }
//
// export async function deleteEvent(id: string) {}
// export async function createEvent(event: any) {}
// export async function updateEvent(event: any) {}
