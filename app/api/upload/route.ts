import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { error: "Aucun fichier n'a été fourni" },
                { status: 400 }
            );
        }

        // Vérifier le type de fichier
        if (!file.type.startsWith("image/")) {
            return NextResponse.json(
                { error: "Le fichier doit être une image" },
                { status: 400 }
            );
        }

        // Générer un nom de fichier unique
        const fileName = `billsder-${Date.now()}-${file.name
            .replace(/\s+/g, "-")
            .toLowerCase()}`;

        // Télécharger le fichier vers Vercel Blob
        const blob = await put(fileName, file, {
            access: "public",
        });

        return NextResponse.json(blob);
    } catch (error) {
        console.error("Erreur lors du téléchargement du fichier:", error);
        return NextResponse.json(
            {
                error: "Une erreur est survenue lors du téléchargement du fichier",
            },
            { status: 500 }
        );
    }
}
