import { z } from "zod";
import type { E164Number } from "libphonenumber-js/core";

// Schéma principal pour l'entreprise avec tous les sous-schémas intégrés
export const companyFormSchema = z.object({
    name: z.string().min(2, {
        message: "Le nom de l'entreprise doit contenir au moins 2 caractères",
    }),
    logo: z
        .object({
            url: z.string().optional(),
            thumbnail_url: z.string().optional(),
            alt_text: z.string().optional(),
        })
        .optional(),
    contact: z.object({
        email: z.string().email({ message: "Adresse email invalide" }),
        phone: z
            .string()
            .regex(/^\+?[0-9\s\-()]{8,20}$/, {
                message: "Numéro de téléphone invalide",
            })
            .optional(),
        website: z
            .string()
            .url({ message: "URL du site web invalide" })
            .optional()
            .or(z.literal("")),
        address: z
            .object({
                street: z.string().min(1, { message: "L'adresse est requise" }),
                city: z.string().min(1, { message: "La ville est requise" }),
                region: z.string().optional(),
                postal_code: z.string().optional(),
                country: z.string().min(1, { message: "Le pays est requis" }),
                formatted: z.string().optional(),
                type: z
                    .enum(["billing", "shipping", "home", "work", "other"])
                    .optional(),
            })
            .optional(),
        social_media: z
            .object({
                linkedin: z
                    .string()
                    .url({ message: "URL LinkedIn invalide" })
                    .optional()
                    .or(z.literal("")),
                twitter: z
                    .string()
                    .url({ message: "URL Twitter invalide" })
                    .optional()
                    .or(z.literal("")),
                facebook: z
                    .string()
                    .url({ message: "URL Facebook invalide" })
                    .optional()
                    .or(z.literal("")),
                instagram: z
                    .string()
                    .url({ message: "URL Instagram invalide" })
                    .optional()
                    .or(z.literal("")),
            })
            .optional(),
    }),
});

// Type unique inféré à partir du schéma
export type CompanyFormData = z.infer<typeof companyFormSchema>;

export const employeeFormSchema = z.object({
    personal_info: z.object({
        first_name: z.string().min(1, "First name is required"),
        last_name: z.string().min(1, "Last name is required"),
        birth_date: z.string().optional(),
        gender: z.enum(["male", "female", "prefer-not-to-say"]),
    }),
    contact: z.object({
        email: z.string().email("Invalid email address"),
        phone: z.string().optional(),
        emergency_contact: z
            .object({
                name: z.string().optional(),
                relationship: z.string().optional(),
                phone: z.string().optional(),
            })
            .optional(),
    }),
    address: z
        .object({
            street: z.string().min(1, "Street is required"),
            city: z.string().min(1, "City is required"),
            region: z.string().optional(),
            postal_code: z.string().min(1, "Zip code is required"),
            country: z.string().min(1, "Country is required"),
        })
        .optional(),
});

export type EmployeeFormData = z.infer<typeof employeeFormSchema>;

// Product schema
export const productFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Product name must be at least 2 characters." }),
    description: z
        .string()
        .min(10, { message: "Description must be at least 10 characters." }),
    price: z.coerce
        .number()
        .positive({ message: "Price must be a positive number." }),
    cost_price: z.coerce
        .number()
        .positive({ message: "Cost price must be a positive number." }),
    currency_symbol: z
        .string()
        .min(1, { message: "Currency symbol is required." }),
    quantity: z.coerce
        .number()
        .int()
        .nonnegative({ message: "Quantity must be a non-negative integer." }),
    stock_threshold: z.coerce.number().int().nonnegative({
        message: "Stock threshold must be a non-negative integer.",
    }),
    sku: z.string().min(3, { message: "SKU must be at least 3 characters." }),
    barcode: z.string().optional(),
    is_checkStock: z.boolean(),
    attributes: z
        .array(
            z.object({
                name: z
                    .string()
                    .min(1, { message: "Attribute name is required." }),
                value: z
                    .string()
                    .min(1, { message: "Attribute value is required." }),
            })
        )
        .default([]),
    image: z
        .string()
        .url({ message: "Please enter a valid image URL." })
        .or(z.string().length(0)),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]).optional(),
    suppliers: z
        .array(
            z.object({
                id_supplier: z
                    .string()
                    .min(1, { message: "Supplier ID is required." }),
                purchase_price: z.coerce.number().min(0, {
                    message: "Purchase price must be non-negative.",
                }),
                delivery_time: z.coerce
                    .number()
                    .int()
                    .min(0, { message: "Delivery time must be non-negative." })
                    .default(7),
                minimum_order_quantity: z.coerce
                    .number()
                    .int()
                    .min(1, {
                        message: "Minimum order quantity must be at least 1.",
                    })
                    .default(1),
                supplier_reference: z.string().optional(),
            })
        )
        .default([])
        .optional(),
});

export type ProductFormData = z.infer<typeof productFormSchema>;

// Product schema
export const serviceFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Product name must be at least 2 characters." }),
    description: z
        .string()
        .min(10, { message: "Description must be at least 10 characters." }),
    price: z.coerce
        .number()
        .positive({ message: "Price must be a positive number." }),
    currency_symbol: z
        .string()
        .min(1, { message: "Currency symbol is required." }),
    attributes: z
        .array(
            z.object({
                name: z
                    .string()
                    .min(1, { message: "Attribute name is required." }),
                value: z
                    .string()
                    .min(1, { message: "Attribute value is required." }),
            })
        )
        .default([]),
    image: z
        .string()
        .url({ message: "Please enter a valid image URL." })
        .or(z.string().length(0)),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]).optional(),
    execution_location: z.string().optional(),
    billing_unit: z.string().min(1, {
        message: "Billing unit is required.",
    }),
    estimated_duration: z.string().optional(),
});

export type ServiceFormData = z.infer<typeof serviceFormSchema>;

export const supplierFormSchema = z.object({
    name: z.string().min(2, {
        message: "Le nom du fournisseur doit contenir au moins 2 caractères",
    }),
    business_id: z.string().optional(),
    notes: z.string().optional(),
    category: z.string().optional(),
    contact: z.object({
        email: z.string().email({ message: "Adresse email invalide" }),
        phone: z.string().optional(),
        address: z
            .object({
                street: z.string().min(1, { message: "L'adresse est requise" }),
                city: z.string().min(1, { message: "La ville est requise" }),
                region: z.string().optional(),
                postal_code: z.string().optional(),
                country: z.string().min(1, { message: "Le pays est requis" }),
            })
            .optional(),
    }),
    payment_terms: z.enum(["30d", "60d", "90d", "cash"]),
    tax_ids: z.array(z.string()).optional(),
    is_active: z.boolean().default(true),
});

export type SupplierFormData = z.infer<typeof supplierFormSchema>;

export const partnerApplicationSchema = z.object({
    // 1. Personal Information
    personal_info: z.object({
        full_name: z.string().min(2, { message: "Le nom complet est requis" }),
        email: z.string().email({ message: "Email professionnel invalide" }),
        phone: z.string().min(1, { message: "Numéro de téléphone requis" }),
        country: z.string().min(1, { message: "Pays requis" }),
        age: z.coerce
            .number()
            .min(18, { message: "Vous devez avoir au moins 18 ans" }),
    }),

    // 2. Professional Experience
    current_situation: z.enum(
        ["entrepreneur", "employee", "student", "job_seeker"],
        {
            required_error: "Veuillez sélectionner votre situation actuelle",
        }
    ),
    experience_domains: z.array(
        z.enum([
            "management_accounting",
            "sales_affiliation",
            "sme_consulting",
            "digital_software_saas",
            "none",
        ])
    ),
    professional_background: z.string().min(10, {
        message: "Veuillez décrire votre parcours professionnel (3-5 lignes)",
    }),

    // 3. Motivation & Program Understanding
    motivation_reasons: z.array(
        z.enum([
            "earn_commissions",
            "help_smes",
            "add_service",
            "develop_career",
            "other",
        ])
    ),
    motivation_details: z.string().optional(),
    professionalization_understanding: z.array(
        z.enum([
            "recommend_tools",
            "help_finances",
            "train_technology",
            "trusted_advisor",
            "other",
        ])
    ),
    role_vision: z.string().optional(),
    previous_affiliation: z.boolean(),
    previous_affiliation_details: z.string().optional(),

    // 4. Resources & Commitment
    has_audience: z.boolean(),
    audience_details: z.string().optional(),
    ready_to_train: z.enum(["yes", "willing_to_learn", "no"]),
    weekly_time_commitment: z.enum(["1-3h", "4-6h", "more_than_6h"]),

    // 5. Bonus
    convincing_message: z.string().optional(),
    professional_profiles: z
        .array(z.string().url({ message: "URL invalide" }))
        .optional(),
});

export type PartnerApplicationData = z.infer<typeof partnerApplicationSchema>;

export const newsletterSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
    email: z.string().email({ message: "Adresse email invalide" }),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
