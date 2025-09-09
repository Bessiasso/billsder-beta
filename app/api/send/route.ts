import { mailOptions, transporter } from "../emails/client";
import { replaceMergeTags, stripHTMLTags } from "../emails/helpers";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

interface EmailData {
    [key: string]: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const data: EmailData = await request.json();

        // Get HTML template
        const htmlFilePath = path.join(
            process.cwd(),
            "app/api/emails",
            "cta.html"
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
                ...mailOptions,
                subject: `New Contact Form Submission`,
                text: plainTextContent,
                html: htmlContent,
            });

            return NextResponse.json({ success: true });
        } catch (err) {
            console.error("Error sending email: ", err);
            return NextResponse.json(
                { error: "Failed to send email" },
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
