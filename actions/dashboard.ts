// 'use server';
// import { auth } from '@/auth';
//
// import axios from 'axios';
// import { revalidatePath } from 'next/cache';

// export async function createGroup(prevState: any, formData: FormData) {
//     const session = await auth();
//     const accessToken = session?.accessToken;
//     const group = formData.get('group');
//
//     try {
//         const res = await axios.post(
//             `${process.env.NEXT_PUBLIC_API_URL}/commgroups`,
//             { data: { groupName: group } },
//             {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             }
//         );
//         // console.log(res.data);
//         if (res.status !== 200) {
//             throw new Error('Failed to fetch users');
//         }
//
//         revalidatePath('/dashboard/groups');
//
//         return { message: `Added ${res.data}` };
//         // return res.data;
//     } catch (error) {
//         return { message: 'Failed to create group' };
//         // throw new Error('Failed to fetch users');
//     }
// }

// export async function deleteGroup(id: string) {
//     const session = await auth();
//     const accessToken = session?.accessToken;
//     try {
//         const res = await axios.delete(
//             `${process.env.NEXT_PUBLIC_API_URL}/commgroups/${id}`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             }
//         );
//         // console.log(res.data);
//         if (res.status !== 200) {
//             throw new Error('Failed to fetch users');
//         }
//
//         revalidatePath('/dashboard/groups');
//
//         return { message: `Deleted ${res.data}` };
//         // return res.data;
//     } catch (error) {
//         return { message: 'Failed to delete group' };
//         // throw new Error('Failed to fetch users');
//     }
// }

// export async function createNewUser(formData: FormData) {
//   const session = await auth();
//   const accessToken = session?.accessToken;
//
//   // Get form data
//   const email = formData.get("email");
//   const username = formData.get("username");
//   const password = formData.get("password");
//   const firstName = formData.get("firstName");
//   const lastName = formData.get("lastName");
//   const contactNumber = formData.get("contactNumber");
//   const dateOfBirth = formData.get("dateOfBirth");
//
//   try {
//     const res = await axios.post(
//       `${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`,
//       {
//         email,
//         username,
//         password,
//         firstName,
//         lastName,
//         contactNumber,
//         dateOfBirth,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       },
//     );
//
//     if (res.status !== 200) {
//       throw new Error("Failed to create user");
//     }
//
//     // Optionally, revalidate cache for a specific path
//     revalidatePath("/dashboard/contacts");
//
//     return {
//       message: `User ${res.data.user.username} created successfully`,
//     };
//   } catch (error) {
//     return { message: "Failed to create user" };
//   }
// }

// export async function deleteUser(id) {
//     const session = await auth();
//     const accessToken = session?.accessToken;
//     try {
//         const res = await axios.delete(
//             `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             }
//         );
//
//         if (res.status !== 200) {
//             throw new Error('Failed to fetch users');
//         }
//
//         revalidatePath('/dashboard/contacts');
//
//         return { message: `Deleted ${res.data}` };
//         // return res.data;
//     } catch (error) {
//         return { message: 'Failed to delete contact' };
//         // throw new Error('Failed to fetch users');
//     }
// }

// export async function getAllMembers() {
//     const session = await auth();
//     const accessToken = session?.accessToken;
//     try {
//         const res = await axios.get(
//             `${process.env.NEXT_PUBLIC_API_URL}/users?populate=*`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             }
//         );
//         // console.log(res.data);
//         if (res.status !== 200) {
//             throw new Error('Failed to fetch users');
//         }
//
//         return res.data;
//     } catch (error) {
//         throw new Error('Failed to fetch users');
//     }
// }

// export async function getMe() {
//     const session = await auth();
//     const accessToken = session?.accessToken;
//     console.log(accessToken);
//     try {
//         const res = await axios.get(
//             `${process.env.NEXT_PUBLIC_API_URL}/users/me?populate=*`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             }
//         );
//
//         if (res.status !== 200) {
//             throw new Error('Failed to fetch user');
//         }
//
//         return res.data;
//     } catch (error) {
//         throw new Error('Failed to fetch user');
//     }
// }

// export async function getAllGroups() {
//     const session = await auth();
//     const accessToken = session?.accessToken;
//     try {
//         const res = await axios.get(
//             `${process.env.NEXT_PUBLIC_API_URL}/commgroups`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             }
//         );
//
//         if (res.status !== 200) {
//             throw new Error('Failed to fetch groups');
//         }
//
//         return res.data;
//     } catch (error) {
//         throw new Error('Failed to fetch groups');
//     }
// }
