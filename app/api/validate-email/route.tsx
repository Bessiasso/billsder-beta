import { NextRequest, NextResponse } from "next/server";

// List of allowed email domains
const allowedDomains = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "icloud.com",
    "protonmail.com",
    "mail.com",
    // Add more popular domains as needed
];

export async function POST(request: NextRequest) {
    const { email } = await request.json();

    if (!email) {
        return NextResponse.json(
            { error: "Email is required" },
            { status: 400 }
        );
    }

    const domain = email.split("@")[1];

    if (!allowedDomains.includes(domain.toLowerCase())) {
        return NextResponse.json(
            { error: "Email domain not allowed" },
            { status: 403 }
        );
    }

    // If the email domain is allowed, you can proceed with your existing logic
    // For now, we'll just return a success message
    return NextResponse.json({ success: true });
}
