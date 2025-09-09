import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";

/* const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-02-24.acacia",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET; */

export async function POST(request: Request) {
    try {
        /* const body = await request.text();
    const headerList = await headers(); // Await the headers to get the resolved value
    const signature = headerList.get("stripe-signature") || "";

    let event;

    try {
      if (!webhookSecret) {
        throw new Error("Webhook secret is not defined");
      }

      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error(`⚠️ Webhook signature verification failed: ${err.message}`);
      return NextResponse.json(
        { error: "Webhook signature verification failed" },
        { status: 400 }
      );
    }

    // Handle different event types
    switch (event.type) {
      case "customer.subscription.created":
        const subscriptionCreated = event.data.object;
        console.log("Subscription created:", subscriptionCreated.id);
        // Update your database here
        break;
      case "customer.subscription.updated":
        const subscriptionUpdated = event.data.object;
        console.log("Subscription updated:", subscriptionUpdated.id);
        // Update subscription status in your database
        break;
      case "customer.subscription.deleted":
        const subscriptionDeleted = event.data.object;
        console.log("Subscription deleted:", subscriptionDeleted.id);
        // Mark subscription as canceled in your database
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    } */

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("Error handling webhook:", error);
        return NextResponse.json(
            { error: "Error handling webhook" },
            { status: 500 }
        );
    }
}

// Necessary for Stripe webhooks that send raw data
/* export const config = {
  api: {
    bodyParser: false,
  },
};
 */
