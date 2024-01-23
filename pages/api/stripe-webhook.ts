import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { buffer } from "micro";
import prisma from "@/libs/prismadb";  // Importez prisma depuis l'endroit correct

export const config = {
    api: {
        bodyParser: false,
    },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2023-10-16",
});

export default async function Handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    if (!sig) {
        return res.status(400).send("Missing the stripe signature");
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            buf,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err) {
        return res.status(400).send("Webhook error" + err);
    }

    switch (event.type) {
        case "charge.succeeded":
            console.log("charge.succeeded event received");
            const charge: any = event.data.object as Stripe.Charge;
            console.log("Charge details:", charge);
    
            if (typeof charge.payment_intent === "string") {
                console.log("Updating order for payment_intent:", charge.payment_intent);
                await prisma?.order.update({
                    where: { paymentIntentId: charge.payment_intent },
                    data: { status: "complete", address: charge.shipping.adress },
                });
                console.log("Order updated successfully");
            }
            break;
        default:
            console.log("Unhandled event type: " + event.type);
    }
    
    res.json({ received: true });
}
