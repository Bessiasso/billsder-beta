import fs from "fs/promises";
import path from "path";
import api from "@/services";
import { mailOptionsConfirmation, transporter } from "@/app/api/emails/client";
import { replaceMergeTags, stripHTMLTags } from "@/app/api/emails/helpers";
import { NextRequest, NextResponse } from "next/server";
import { generateOTP } from "@/hooks/GenerateOTP";
import { ApiResponse } from "@/services/api-types";

interface EmailData {
    email: string;
    locale: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const data: EmailData = await request.json();
        const { email, locale } = data;

        if (!data.email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        // Generate OTP
        const otp = generateOTP();
        console.log("Generated OTP: ", otp);

        // Register OTP in the database if the user exists
        const registerOtpResponse: ApiResponse<any> =
            await api.system.users.registerOtp(email, otp);

        if (!registerOtpResponse.success) {
            if (registerOtpResponse.error) {
                return NextResponse.json(
                    { error: "User OTP registration failed" },
                    { status: 400 }
                );
            }
        }

        // Send email with OTP

        const subject =
            locale === "en" ? "Your OTP" : "Votre Code de Connexion";

        // Get HTML template
        const htmlTemplatePath = path.join(
            process.cwd(),
            "app/api/emails",
            `OTP_${locale}.html`
        );
        let htmlContent: string;

        try {
            htmlContent = await fs.readFile(htmlTemplatePath, "utf-8");
        } catch (error) {
            console.error("Error reading email template", error);
            return NextResponse.json(
                { error: "Error reading email template" },
                { status: 400 }
            );
        }

        // Replace placeholders in the email template: OTP
        htmlContent = replaceMergeTags({ OTP: otp, email }, htmlContent);
        const plainTextContent = stripHTMLTags(htmlContent);

        try {
            await transporter.sendMail({
                ...mailOptionsConfirmation,
                to: email,
                subject: subject,
                html: htmlContent,
                text: plainTextContent,
            });

            return NextResponse.json({ success: true });
        } catch (error) {
            console.error("Error sending OTP email", error);
            return NextResponse.json(
                { error: "Failed to send OTP email" },
                { status: 500 }
            );
        }
    } catch (error) {
        //console.error("An error occurred", error);
        return NextResponse.json(
            { error: "An error occurred" },
            { status: 500 }
        );
    }
}
