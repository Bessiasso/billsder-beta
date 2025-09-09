import { NextResponse } from "next/server";
import Stripe from "stripe";

/* const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2025-02-24.acacia",
}); */

export async function POST(request: Request) {
    try {
        /* const body = await request.json();
        const { session_id } = body;

        if (!session_id) {
            return NextResponse.json(
                { error: "Session ID is required" },
                { status: 400 }
            );
        }

        // Récupérer la session Checkout pour obtenir l'ID du client
        const checkoutSession = await stripe.checkout.sessions.retrieve(
            session_id
        );

        if (!checkoutSession.customer) {
            return NextResponse.json(
                { error: "No customer found in the session" },
                { status: 400 }
            );
        }

        // Créer une session de portail client
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: checkoutSession.customer as string,
            return_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
        });

        return NextResponse.json({ url: portalSession.url }); */
        return NextResponse.json({ url: "https://www.google.com" });
    } catch (error) {
        console.error("Error creating portal session:", error);
        return NextResponse.json(
            { error: "Error creating portal session" },
            { status: 500 }
        );
    }
}
