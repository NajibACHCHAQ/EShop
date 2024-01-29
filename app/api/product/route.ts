import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/actions/GetCurrentUser';
import prisma from '@/libs/prismadb';

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser || currentUser.role !== 'ADMIN') {
            return NextResponse.error();
        }

        const body = await request.json();
        const { name, description, price, brand, category, inStock, stockQty, images } = body;

        // Ajoutez ici une logique de validation des données si nécessaire.

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                brand,
                category,
                inStock,
                stockQty,
                images,
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error("Error processing POST request:", error);
        return NextResponse.error();
    }
}
