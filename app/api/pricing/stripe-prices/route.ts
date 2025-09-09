import { NextResponse } from "next/server";

export async function GET() {
    try {
        /* // Récupérer les IDs de prix depuis les variables d'environnement
        const prices = {
            basic: {
                monthly: process.env.STRIPE_MONTHLY_BASIC_PRICE_ID,
                annual: process.env.STRIPE_ANNUAL_BASIC_PRICE_ID,
            },
            pro: {
                monthly: process.env.STRIPE_MONTHLY_PRO_PRICE_ID,
                annual: process.env.STRIPE_ANNUAL_PRO_PRICE_ID,
            },
            enterprise: {
                monthly: process.env.STRIPE_MONTHLY_ENTERPRISE_PRICE_ID,
                annual: process.env.STRIPE_ANNUAL_ENTERPRISE_PRICE_ID,
            },
        };

        // Vérifier si toutes les variables sont définies
        const missingPrices = [];

        if (!prices.basic.monthly)
            missingPrices.push("STRIPE_MONTHLY_BASIC_PRICE_ID");
        if (!prices.basic.annual)
            missingPrices.push("STRIPE_ANNUAL_BASIC_PRICE_ID");
        if (!prices.pro.monthly)
            missingPrices.push("STRIPE_MONTHLY_PRO_PRICE_ID");
        if (!prices.pro.annual)
            missingPrices.push("STRIPE_ANNUAL_PRO_PRICE_ID");
        if (!prices.enterprise.monthly)
            missingPrices.push("STRIPE_MONTHLY_ENTERPRISE_PRICE_ID");
        if (!prices.enterprise.annual)
            missingPrices.push("STRIPE_ANNUAL_ENTERPRISE_PRICE_ID");

        if (missingPrices.length > 0) {
            console.error(
                "Variables d'environnement manquantes:",
                missingPrices
            );
            return NextResponse.json(
                { error: "Configuration incomplète", missingPrices },
                { status: 500 }
            );
        }

        return NextResponse.json({ prices }); */
        const prices = {
            basic: {
                monthly: "price_1QZ002FZ0000000000000000",
                annual: "price_1QZ002FZ0000000000000000",
            },
        };
        return NextResponse.json({ prices: prices });
    } catch (error) {
        console.error("Erreur lors de la récupération des prix:", error);
        return NextResponse.json(
            { error: "Erreur lors de la récupération des prix" },
            { status: 500 }
        );
    }
}
