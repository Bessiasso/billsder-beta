import { del } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { url } = await request.json();

        if (!url) {
            return NextResponse.json(
                { error: "URL de l'image non fournie" },
                { status: 400 }
            );
        }

        // Extraire le nom du fichier de l'URL
        const urlObj = new URL(url);
        const pathname = urlObj.pathname;
        const fileName = pathname.substring(pathname.lastIndexOf("/") + 1);

        // Supprimer le fichier de Vercel Blob
        await del(fileName);

        return NextResponse.json({
            success: true,
            message: "Image supprimée avec succès",
        });
    } catch (error) {
        console.error("Erreur lors de la suppression de l'image:", error);
        return NextResponse.json(
            {
                error: "Une erreur est survenue lors de la suppression de l'image",
            },
            { status: 500 }
        );
    }
}
