import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { mailOptionsConfirmation, transporter } from "@/app/api/emails/client";
import { replaceMergeTags, stripHTMLTags } from "@/app/api/emails/helpers";
import { newsletterSchema } from "@/lib/schema";

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Validate the data
        const validatedData = newsletterSchema.parse(data);

        // Read the email template
        const templatePath = path.join(
            process.cwd(),
            "app/api/emails/newsletter_fr.html"
        );
        let template = await fs.readFile(templatePath, "utf-8");

        // Replace placeholders in the template
        const htmlContent = replaceMergeTags(validatedData, template);
        const plainTextContent = stripHTMLTags(htmlContent);

        // Send the email
        await transporter.sendMail({
            ...mailOptionsConfirmation,
            to: "ucodebyus@gmail.com",
            subject: "Nouvelle inscription à la newsletter Billsder",
            html: htmlContent,
            text: plainTextContent,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error sending newsletter email:", error);
        return NextResponse.json(
            { error: "Failed to send newsletter email" },
            { status: 500 }
        );
    }
}
