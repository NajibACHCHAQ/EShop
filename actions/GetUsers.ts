// Import necessary modules
import prisma from '@/libs/prismadb';


// Function to get users
export default async function getUsers() {
  try {
    // Fetch users using Prisma
    const users = await prisma?.user.findMany();
    return users;
  } catch (error:any) {
    // Handle errors
    throw new Error(error);
  }
}