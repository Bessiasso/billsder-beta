import nodemailer from "nodemailer";

const ucbu_email = process.env.NEXT_PRIVATE_UCBU_EMAIL;
const ucbu_email_full = process.env.NEXT_PRIVATE_EMAIL_FULL;
const ucbu_password = process.env.NEXT_PRIVATE_UCBU_EMAIL_PASSWORD;

export const transporter = nodemailer.createTransport({
    host: process.env.NEXT_PRIVATE_EMAIL_HOST,
    port: parseInt(process.env.NEXT_PRIVATE_EMAIL_PORT || "587", 10),
    auth: {
        user: ucbu_email,
        pass: ucbu_password,
    },
    secure: true,
});

export const mailOptions = {
    from: ucbu_email_full,
    to: ucbu_email_full,
};

export const mailOptionsConfirmation = {
    from: ucbu_email_full,
};
