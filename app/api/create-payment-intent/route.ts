import Stripe from "stripe";
import prisma from '@/libs/prismadb'
import { NextResponse } from "next/server";
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { getCurrentUser } from "@/actions/GetCurrentUser";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2023-10-16"
});

const calculateOrderAmount = (items: CartProductType[]) => {
    const totalPrice = items.reduce((acc, item) => {
        const itemTotal = item.price * item.quantity;
        return acc + itemTotal;
    }, 0);
    
    return totalPrice;
};

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        console.log("Unauthorized user");
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { items, payment_intent_id } = body;
    const total = calculateOrderAmount(items) * 100;
    console.log("Total Order Amount:", total);

    const orderData = {
        user: { connect: { id: currentUser.id } },
        amount: total,
        currency: 'eur',
        status: 'pending',
        deliveryStatus: 'pending',
        paymentIntentId: payment_intent_id,
        products: items
    };

    if (payment_intent_id) {
        console.log("Updating payment intent:", payment_intent_id);

        const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id);
        if (current_intent) {
            console.log("Current Payment Intent:", current_intent);

            const updated_intent = await stripe.paymentIntents.update(
                payment_intent_id, { amount: total }
            );
            console.log("Updated Payment Intent:", updated_intent);

            const [existing_order, update_order] = await Promise.all([
                prisma.order.findFirst({
                    where: { paymentIntentId: payment_intent_id }
                }),
                prisma.order.update({
                    where: { paymentIntentId: payment_intent_id },
                    data: {
                        amount: total,
                        products: items
                    }
                })
            ]);

            console.log("Existing Order:", existing_order);
            console.log("Update Order:", update_order);

            if (!existing_order) {
                console.log("Invalid payment Intent");
                return NextResponse.json({ error: 'Invalid payment Intent' }, { status: 400 });
            }

            return NextResponse.json({ paymentIntent: updated_intent });
        }
    } else {
        console.log("Creating new payment intent");

        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: 'eur',
            automatic_payment_methods: { enabled: true }
        });

        console.log("New Payment Intent:", paymentIntent);

        orderData.paymentIntentId = paymentIntent.id;

        await prisma.order.create({
            data: orderData,
        });

        return NextResponse.json({ paymentIntent });
    }
}
