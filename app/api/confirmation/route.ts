import { mailOptionsConfirmation, transporter } from "../emails/client";
import { replaceMergeTags, stripHTMLTags } from "../emails/helpers";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

interface ConfirmationData {
    firstName: string;
    lastName: string;
    email: string;
    [key: string]: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const data: ConfirmationData = await request.json();

        if (!data.firstName || !data.lastName || !data.email) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Get HTML template
        const htmlFilePath = path.join(
            process.cwd(),
            "app/api/emails",
            "confirm.html"
        );
        let htmlContent: string;

        try {
            htmlContent = await fs.readFile(htmlFilePath, "utf8");
        } catch (err) {
            console.error("Error reading HTML file: ", err);
            return NextResponse.json(
                { error: "Error reading email template" },
                { status: 500 }
            );
        }

        // Replace merge tags with values
        htmlContent = replaceMergeTags(data, htmlContent);
        const plainTextContent = stripHTMLTags(htmlContent);

        try {
            await transporter.sendMail({
                ...mailOptionsConfirmation,
                to: data.email,
                subject: `Welcome to Billsder Beta!`,
                text: plainTextContent,
                html: htmlContent,
            });

            return NextResponse.json({ success: true });
        } catch (err) {
            console.error("Error sending confirmation email: ", err);
            return NextResponse.json(
                { error: "Failed to send confirmation email" },
                { status: 500 }
            );
        }
    } catch (err) {
        console.error("Unexpected error: ", err);
        return NextResponse.json(
            { error: "An unexpected error occurred" },
            { status: 500 }
        );
    }
}