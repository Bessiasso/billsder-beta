import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { mailOptionsConfirmation, transporter } from "@/app/api/emails/client";
import { replaceMergeTags, stripHTMLTags } from "@/app/api/emails/helpers";
import { parsePhoneNumber } from "libphonenumber-js";

const currentSituations = [
    { value: "entrepreneur", label: "Entrepreneur" },
    { value: "employee", label: "Salarié" },
    { value: "student", label: "Étudiant" },
    { value: "job_seeker", label: "En recherche d'opportunité" },
];

const experienceDomains = [
    { value: "management_accounting", label: "Gestion / Comptabilité" },
    { value: "sales_affiliation", label: "Vente / Affiliation" },
    { value: "sme_consulting", label: "Conseil aux PME" },
    { value: "digital_software_saas", label: "Digital / Logiciels / SaaS" },
    { value: "other", label: "Autre" },
    { value: "none", label: "Aucun de ces domaines" },
];

const motivationReasons = [
    {
        value: "earn_commissions",
        label: "Pour gagner des commissions sur les abonnements",
    },
    { value: "help_smes", label: "Pour aider les PME à mieux se structurer" },
    {
        value: "add_service",
        label: "Pour ajouter un service à mon activité actuelle",
    },
    {
        value: "develop_career",
        label: "Pour développer un vrai métier autour d'un logiciel utile",
    },
    { value: "other", label: "Autre" },
];

const professionalizationOptions = [
    { value: "recommend_tools", label: "Leur recommander les bons outils" },
    { value: "help_finances", label: "Les aider à structurer leurs finances" },
    {
        value: "train_technology",
        label: "Les former à mieux utiliser la technologie",
    },
    {
        value: "trusted_advisor",
        label: "Être un conseiller de confiance dans leur parcours",
    },
    { value: "other", label: "Autre" },
];

const timeCommitments = [
    { value: "1-3h", label: "1–3h / semaine" },
    { value: "4-6h", label: "4–6h / semaine" },
    { value: "more_than_6h", label: "Plus de 6h / semaine" },
];

const trainingReadiness = [
    { value: "yes", label: "Oui" },
    { value: "willing_to_learn", label: "Non, mais je peux apprendre" },
    { value: "no", label: "Non" },
];

const getLabelFromValue = (
    value: string,
    options: { value: string; label: string }[]
) => {
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : value;
};

const formatPhoneNumber = (phone: string) => {
    try {
        const phoneNumber = parsePhoneNumber(phone);
        if (phoneNumber) {
            return phoneNumber.formatInternational();
        }
        return phone;
    } catch (error) {
        console.error("Error formatting phone number:", error);
        return phone;
    }
};

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Read the email template
        const templatePath = path.join(
            process.cwd(),
            "app/api/emails/BBP_application_fr.html"
        );
        let template = await fs.readFile(templatePath, "utf-8");

        // Prepare data for template with labels instead of values
        const templateData = {
            // 1. Informations personnelles
            full_name: data.personal_info.full_name,
            email: data.personal_info.email,
            phone: data.personal_info.phone,
            country: data.personal_info.country,
            age: data.personal_info.age.toString(),

            // 2. Expérience professionnelle
            current_situation: getLabelFromValue(
                data.current_situation,
                currentSituations
            ),
            experience_domains: data.experience_domains
                .map((value: string) =>
                    getLabelFromValue(value, experienceDomains)
                )
                .join(", "),
            professional_background:
                data.professional_background || "Non spécifié",

            // 3. Motivation & compréhension
            motivation_reasons: data.motivation_reasons
                .map((value: string) =>
                    getLabelFromValue(value, motivationReasons)
                )
                .join(", "),
            motivation_details: data.motivation_details || "Non spécifié",
            professionalization_understanding:
                data.professionalization_understanding
                    .map((value: string) =>
                        getLabelFromValue(value, professionalizationOptions)
                    )
                    .join(", "),
            role_vision: data.role_vision || "Non spécifié",
            previous_affiliation: data.previous_affiliation ? "Oui" : "Non",
            previous_affiliation_details:
                data.previous_affiliation_details || "Non spécifié",

            // 4. Ressources & implication
            has_audience: data.has_audience ? "Oui" : "Non",
            audience_details: data.audience_details || "Non spécifié",
            ready_to_train: getLabelFromValue(
                data.ready_to_train,
                trainingReadiness
            ),
            weekly_time_commitment: getLabelFromValue(
                data.weekly_time_commitment,
                timeCommitments
            ),

            // 5. Bonus
            convincing_message: data.convincing_message || "Non spécifié",
            professional_profiles:
                data.professional_profiles?.join(", ") || "Non spécifié",
        };

        // Replace placeholders in the template
        const htmlContent = replaceMergeTags(templateData, template);
        const plainTextContent = stripHTMLTags(htmlContent);

        // Send the email
        await transporter.sendMail({
            ...mailOptionsConfirmation,
            to: "ucodebyus@gmail.com",
            subject: "Nouvelle candidature Billsder Partenaire",
            html: htmlContent,
            text: plainTextContent,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error sending application email:", error);
        return NextResponse.json(
            { error: "Failed to send application email" },
            { status: 500 }
        );
    }
}
