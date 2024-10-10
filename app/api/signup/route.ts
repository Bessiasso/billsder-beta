import clientPromise from "@/lib/MongodbClient";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const {
            firstName,
            lastName,
            email,
        } = await request.json();

        const client = await clientPromise;
        const db = client.db();

        // Create new beta_tester
        const beta_tester = {
            fisrtName: firstName,
            lastName: lastName,
            email: email,
        };

        // Add the beta_tester to the beta_testers collection
        const addProduct = await db.collection("beta_testers").insertOne(beta_tester);

        return NextResponse.json(
            { success: "beta tester added successfully!" },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
