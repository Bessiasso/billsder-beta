import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialiser Stripe avec votre clé secrète
/* const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-02-24.acacia",
});
 */
export async function POST(request: Request) {
    try {
        /*const body = await request.json();
    const { priceId, mode = "subscription" } = body;

    if (!priceId) {
      return NextResponse.json(
        { error: "Price ID is required", message: "ID de prix manquant" },
        { status: 400 }
      );
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("Clé secrète Stripe manquante");
      return NextResponse.json(
        {
          error: "Stripe configuration error",
          message: "Erreur de configuration Stripe",
        },
        { status: 500 }
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-02-24.acacia",
    });

    // Créer une session Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      billing_address_collection: "auto",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: mode as Stripe.Checkout.SessionCreateParams.Mode,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
    });

    if (!session?.url) {
      throw new Error("Failed to create checkout session URL");
    } */

        /* return NextResponse.json({ url: session.url }); */
        return NextResponse.json({ url: "https://www.google.com" });
    } catch (error: any) {
        console.error("Error creating checkout session:", error);
        return NextResponse.json(
            {
                error: "Error creating checkout session",
                message: error?.message || "Une erreur s'est produite",
            },
            { status: 500 }
        );
    }
}
