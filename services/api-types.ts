/**
 * API Types for Backend Enterprise Management
 * This file contains TypeScript interfaces for all models used in the API
 */

// Common types
export type ObjectId = string;
export type ISODateString = string;

// ==================== SYSTEM TYPES ====================

/**
 * User model
 */
export interface User {
    _id: ObjectId;
    username: string;
    email: string;
    role: ObjectId | Role;
    company_id?: ObjectId | Company | null;
    terms_accepted: boolean;
    id_state?: ObjectId | null;
    reset_password_token?: string | null;
    reset_password_expires?: ISODateString | null;
    createdAt: ISODateString;
    updatedAt: ISODateString;
    devices?: UserDevice[];
    notificationPreferences?: Record<string, any>;
}

export interface UserDevice {
    token: string;
    type: string;
    name: string;
    registered: ISODateString;
    lastActive: ISODateString;
}

/**
 * Role model
 */
export interface Role {
    _id: ObjectId;
    name: string;
    permissions: string[];
}

/**
 * Log model
 */
export interface Log {
    _id: ObjectId;
    userId: ObjectId | User;
    method: string;
    endpoint: string;
    timestamp: ISODateString;
    body?: Record<string, any>;
    query?: Record<string, any>;
    headers?: Record<string, any>;
}

/**
 * Notification model
 */
export interface Notification {
    _id: ObjectId;
    recipient: ObjectId | User;
    sender?: ObjectId | User;
    content: {
        title: string;
        message: string;
        action_url?: string;
        icon?: string;
    };
    category: "system" | "alert" | "message" | "billing";
    priority: 1 | 2 | 3;
    status: {
        read: boolean;
        archived: boolean;
    };
    expires_at?: ISODateString;
    createdAt: ISODateString;
    updatedAt: ISODateString;
}

/**
 * Webhook Log model
 */
export interface WebhookLog {
    _id: ObjectId;
    eventId: string;
    eventType: string;
    eventData: Record<string, any>;
    processed: boolean;
    processingError?: string | null;
    createdAt: ISODateString;
}

// ==================== SHARED TYPES ====================

/**
 * Address type
 */
export interface Address {
    street: string;
    city: string;
    region?: string;
    postal_code?: string;
    country: string;
    formatted?: string;
    type?: "billing" | "shipping" | "home" | "work" | "other";
}

/**
 * Tax Authority type
 */
export interface TaxAuthority {
    name: string;
    reference_number?: string;
}

/**
 * Tax Settings type
 */
export interface TaxSettings {
    allow_manual_adjustments: boolean;
    round_taxes_to_nearest?: number;
    display_tax_inclusive_prices?: boolean;
    apply_tax_on_shipping?: boolean;
    apply_tax_on_discounts?: boolean;
    cascade_taxes?: boolean;
}

/**
 * Company Contact type
 */
export interface CompanyContact {
    email: string;
    phone?: string;
    address?: Address;
    website?: string;
    social_media?: {
        linkedin?: string;
        twitter?: string;
        facebook?: string;
        instagram?: string;
    };
}

/**
 * Company Legal type
 */
export interface CompanyLegal {
    siret?: string;
    tva_number?: string;
    ape_code?: string;
    registration_date?: ISODateString;
    capital?: number;
    legal_form?: string;
    registration_number?: string;
    jurisdiction?: string;
    legal_representatives?: {
        name: string;
        role: string;
        email?: string;
    }[];
}

/**
 * Company Billing type
 */
export interface CompanyBilling {
    currency?: "EUR" | "USD" | "GBP";
    tax_rate?: number;
    invoice_prefix?: string;
    enabled_currencies?: string[];
    default_payment_terms?: "30d" | "60d" | "90d" | "immediate";
    default_payment_method?: PaymentMethod;
    invoice_notes_template?: string;
    invoice_footer_text?: string;
    invoice_due_days?: number;
    auto_send_invoices?: boolean;
    auto_send_reminders?: boolean;
    reminder_days?: number[];
}

/**
 * Company Settings type
 */
export interface CompanySettings {
    timezone?: string;
    locale?: string;
    date_format?: string;
    number_format?: string;
    fiscal_year_start?: {
        month: number;
        day: number;
    };
    notifications?: {
        email?: boolean;
        sms?: boolean;
        push?: boolean;
        frequency?: "immediate" | "daily" | "weekly";
        types?: {
            invoices?: boolean;
            estimates?: boolean;
            payments?: boolean;
            expenses?: boolean;
            customers?: boolean;
            projects?: boolean;
        };
    };
    branding?: {
        primary_color?: string;
        secondary_color?: string;
        accent_color?: string;
        logo_position?: "left" | "center" | "right";
    };
    privacy?: {
        data_retention_period?: number;
        allow_data_sharing?: boolean;
        gdpr_compliant?: boolean;
    };
}

/**
 * Company Taxation type
 */
export interface CompanyTaxation {
    tax_system: string;
    tax_identification_number?: string;
    tax_registration_number?: string;
    tax_authorities?: TaxAuthority[];
    tax_rates: TaxRate[];
    tax_categories: TaxCategory[];
    tax_rules: TaxRule[];
    tax_exemptions: TaxExemption[];
    tax_settings: TaxSettings;
    vat_registered?: boolean;
    vat_registration_date?: ISODateString;
    tax_filing_frequency?: "monthly" | "quarterly" | "annually";
    tax_filing_method?: "online" | "paper" | "accountant";
    default_tax_codes?: {
        sales?: string;
        purchases?: string;
    };
}

/**
 * Company model
 */
export interface Company {
    _id: ObjectId;
    id_user: ObjectId | User;
    team_members: TeamMember[];
    code_company: string;
    name: string;
    logo?: {
        url?: string;
        thumbnail_url?: string;
        alt_text?: string;
    };
    contact: CompanyContact;
    legal?: CompanyLegal;
    billing?: CompanyBilling;
    taxation?: CompanyTaxation;
    stripe?: {
        customer_id?: string;
        subscription_id?: string;
        subscription_status?:
            | "active"
            | "past_due"
            | "canceled"
            | "trialing"
            | null;
        billing_email?: string;
        connect_account_id?: string;
    };
    activity_log?: ObjectId[];
    settings?: CompanySettings;
    createdAt: ISODateString;
    updatedAt: ISODateString;
}

export interface TeamMember {
    user: ObjectId | User;
    role: "admin" | "manager" | "member";
    joined_at: ISODateString;
}

export interface TaxRate {
    id: string;
    name: string;
    rate: number;
    type: "percentage" | "fixed";
    description?: string;
    is_default?: boolean;
    is_compound?: boolean;
    priority?: number;
    effective_date?: ISODateString;
    expiration_date?: ISODateString;
    jurisdiction?: {
        country: string;
        region?: string;
        city?: string;
        postal_code?: string;
    };
}

export interface TaxCategory {
    id: string;
    name: string;
    description?: string;
    default_tax_rate_id?: string;
}

export interface TaxRule {
    id: string;
    name: string;
    description?: string;
    conditions: {
        product_categories?: string[];
        customer_groups?: string[];
        minimum_amount?: number;
        maximum_amount?: number;
        countries?: string[];
        regions?: string[];
        postal_codes?: string[];
        effective_date?: ISODateString;
        expiration_date?: ISODateString;
    };
    tax_rate_id: string;
    priority: number;
}

export interface TaxExemption {
    id: string;
    name: string;
    description?: string;
    exemption_type: "full" | "partial" | "reduced_rate";
    reduced_rate?: number;
    customer_ids: string[];
    exemption_number?: string;
    certificate_url?: string;
    valid_from: ISODateString;
    valid_until?: ISODateString;
}

/**
 * History model
 */
export interface History {
    _id: ObjectId;
    company: ObjectId | Company;
    user: ObjectId | User;
    ip_address?: string;
    action: {
        type: "create" | "update" | "delete" | "system" | "login";
        target: {
            model: "Invoice" | "Employee" | "Customer" | "System";
            id: ObjectId;
        };
        metadata?: Record<string, any>;
    };
    context?: {
        app_version?: string;
        device?: "web" | "mobile" | "api" | null;
    };
    createdAt: ISODateString;
    updatedAt: ISODateString;
}

// ==================== HR TYPES ====================

/**
 * Employee model
 */
export interface Employee {
    _id: ObjectId;
    id_company: ObjectId | Company;
    id_user?: ObjectId | User;
    personal_info: {
        first_name: string;
        last_name: string;
        birth_date?: ISODateString;
        gender?: "male" | "female" | "prefer-not-to-say";
    };
    contact: {
        email: string;
        phone?: string;
        emergency_contact?: {
            name?: string;
            relationship?: string;
            phone?: string;
        };
    };
    address: Address;
    employment?: {
        position: "manager" | "developer" | "accountant" | "hr";
        department: string;
        hired_date?: ISODateString;
        contract_type?: "cdi" | "cdd" | "freelance";
    };
    salary?: {
        base: number;
        currency?: string;
        payment_schedule?: "monthly" | "bi-weekly" | "weekly";
    };
    documents?: ObjectId[] | Document[];
    status: "active" | "on-leave" | "terminated";
    createdAt: ISODateString;
    updatedAt: ISODateString;
    full_name?: string; // Virtual field
}

/**
 * Document model
 */
export interface Document {
    _id: ObjectId;
    id_company: ObjectId | Company;
    linked_to: {
        type: "invoice" | "contract" | "employee" | "customer";
        id: ObjectId;
    };
    category: "financial" | "legal" | "hr" | "technical";
    document_type: DocumentType;
    file: {
        url: string;
        name: string;
        size?: number;
        mime_type?: string;
    };
    metadata: {
        uploaded_by: ObjectId | User;
        expiration_date?: ISODateString;
    };
    status: "draft" | "active" | "archived" | "expired";
    createdAt: ISODateString;
    updatedAt: ISODateString;
}

// ==================== CRM TYPES ====================

/**
 * Contact Info type
 */
export interface ContactInfo {
    email?: string;
    phone?: string;
    mobile?: string;
    fax?: string;
    website?: string;
    address?: Address;
    preferred_contact_method?: "email" | "phone" | "mail";
    social_media?: {
        linkedin?: string;
        twitter?: string;
        facebook?: string;
        instagram?: string;
    };
}

/**
 * Customer model
 */
export interface Customer {
    _id: ObjectId;
    id_company: ObjectId | Company;
    name: string;
    contact_info: ContactInfo;
    stripe_customer_id?: string | null;
    connect_account_id: string;
    tax_ids?: string[];
    preferred_locales?: string[];
}

/**
 * Update Customer Request
 */
export interface UpdateCustomerRequest {
    name?: string;
    contact_info?: ContactInfo;
    stripe_customer_id?: string;
    connect_account_id?: string;
    tax_ids?: string[];
    preferred_locales?: string[];
}

/**
 * Supplier model
 */
export interface Supplier {
    _id: ObjectId;
    id_company: ObjectId | Company;
    name: string;
    business_id?: string;
    contact: {
        email?: string;
        phone?: string;
        address?: {
            street?: string;
            city?: string;
            region?: string;
            postal_code?: string;
            country?: string;
        };
        website?: string;
    };
    category?: string;
    payment_terms?: "30d" | "60d" | "90d" | "cash";
    stripe_account_id?: string;
    tax_ids?: string[];
    notes: string;
    is_completed: boolean;
    is_active: boolean;
    createdAt: ISODateString;
    updatedAt: ISODateString;
}

/**
 * Contact model
 */
export interface Contact {
    _id: ObjectId;
    id_company: ObjectId | Company;
    first_name: string;
    last_name: string;
    type: "lead" | "prospect" | "partner" | "other";
    contact_info: {
        email?: string;
        phone?: string;
        social_media?: {
            linkedin?: string;
            twitter?: string;
        };
    };
    company_details?: {
        company_name?: string;
        position?: string;
    };
    metadata?: {
        last_contact_date?: ISODateString;
        next_followup?: ISODateString;
    };
    assigned_to?: ObjectId | User;
    createdAt: ISODateString;
    updatedAt: ISODateString;
}

// ==================== COMMERCE TYPES ====================

/**
 * Item model (products and services)
 */
export interface Item {
    _id: ObjectId;
    id_company: ObjectId | Company;
    type: "product" | "service";
    name: string;
    description?: string;
    price: number;
    cost_price?: number;
    currency_symbol?: string;
    quantity?: number;
    stock_threshold?: number;
    sku?: string | null;
    barcode?: string | null;
    is_visible: boolean;
    is_checkStock: boolean;
    stripe_product_id?: string | null;
    stripe_price_id?: string | null;
    connect_account_id: string;
    suppliers?: ItemSupplier[];
    stripe_config?: {
        transfer_data?: {
            destination?: string;
            amount_percent?: number;
        };
        application_fee_percent?: number;
        transfer_group?: string;
    };
    attributes?: [
        {
            name: string;
            value: string;
        }
    ];
    //status?: "active" | "inactive" | "out-of-stock" | "discontinued";
    tags?: string[];
    image?: string | null;
    category?: string;
    estimated_duration?: string;
    execution_location?: string;
    billing_unit?:
        | "hour"
        | "day"
        | "week"
        | "month"
        | "year"
        | "per_job"
        | "flat_rate";
    id_store?: ObjectId | Store;
    createdAt: ISODateString;
    updatedAt: ISODateString;
}

export interface ItemSupplier {
    id_supplier: ObjectId;
    purchase_price: number;
    delivery_time?: number; // in days
    minimum_order_quantity?: number;
    supplier_reference?: string;
    added_date: ISODateString;
}

/**
 * Order model
 */
export interface Order {
    _id: ObjectId;
    orderNumber: string;
    id_company: ObjectId | Company;
    id_supplier: ObjectId | Supplier;
    id_store?: ObjectId | Store;
    items: OrderItem[];
    destination: string;
    delivery_date?: ISODateString;
    payment_method?: "cash" | "card" | "transfer" | "stripe";
    payment_status?: "pending" | "paid" | "failed" | "refunded";
    stripe_payment_id?: string;
    subtotal: number;
    total_tax?: number;
    total_amount: number;
    currency_symbol?: string;
    status: "draft" | "confirmed" | "shipped" | "delivered" | "cancelled";
    notes?: string;
    created_by: ObjectId | User;
    createdAt: ISODateString;
    updatedAt: ISODateString;
}

export interface OrderItem {
    id_item: ObjectId | Item;
    quantity: number;
    price: number;
    tax_rate?: number;
}

/**
 * Store model
 */
export interface Store {
    _id: ObjectId;
    id_company: ObjectId | Company;
    name: string;
    location: string;
    contact?: string;
    opening_hours?: string;
    is_active: boolean;
    createdAt: ISODateString;
    updatedAt: ISODateString;
}

// ==================== BILLING TYPES ====================

/**
 * Estimate model
 */
export interface Estimate {
    _id: ObjectId;
    company: ObjectId | Company;
    customer: ObjectId | Customer;
    created_by: ObjectId | User;
    estimate_number: string;
    items: EstimateItem[];
    valid_until: ISODateString;
    notes?: string;
    subtotal: number;
    total_discount: number;
    total_tax: number;
    total: number;
    status: "draft" | "sent" | "accepted" | "rejected" | "expired";
    history?: EstimateHistory[];
    converted_to_invoice?: ObjectId | Billing | null;
    createdAt: ISODateString;
    updatedAt: ISODateString;
    days_remaining?: number; // Virtual field
}

export interface EstimateItem {
    item: ObjectId | Item;
    quantity: number;
    unit_price: number;
    discount: {
        type: "percentage" | "fixed";
        value: number;
    };
    tax_rate: number;
}

export interface EstimateHistory {
    status: string;
    changed_by?: ObjectId | User;
    changed_at: ISODateString;
    notes?: string;
}

/**
 * Plan model
 */
export interface Plan {
    _id: ObjectId;
    id_stripe: string;
    name: "starter" | "pro" | "enterprise";
    tier: number;
    price: number;
    currency: "eur" | "usd" | "gbp";
    billing_interval: "day" | "week" | "month" | "year";
    trial_period_days?: number;
    features?: Map<string, boolean>;
    is_active: boolean;
    createdAt: ISODateString;
    updatedAt: ISODateString;
}

/**
 * Subscription model
 */
export interface Subscription {
    _id: ObjectId;
    id_company: ObjectId | Company;
    id_plan: ObjectId | Plan;
    id_stripe_sub: string;
    payment_method_id: string;
    status: "active" | "past_due" | "canceled" | "trialing";
    current_period: {
        start: ISODateString;
        end: ISODateString;
    };
    plan_history: PlanHistoryItem[];
    createdAt: ISODateString;
    updatedAt: ISODateString;
}

export interface PlanHistoryItem {
    id_plan: ObjectId | Plan;
    changed_at: ISODateString;
}

/**
 * Billing model (invoices, credit notes, etc.)
 */
export interface Billing {
    _id: ObjectId;
    company: ObjectId | Company;
    customer: ObjectId | Customer;
    estimate?: ObjectId | Estimate;
    billing_number: string;
    type: "invoice" | "credit_note" | "proforma";
    status: "draft" | "sent" | "paid" | "overdue" | "canceled";
    date: ISODateString;
    due_date: ISODateString;
    items: BillingItem[];
    subtotal: number;
    total_tax: number;
    total_discount: number;
    total: number;
    payments: Payment[];
    balance_due: number;
    notes?: string;
    terms?: string;
    history?: BillingHistory[];
    stripe_data?: {
        invoice_id?: string;
        payment_intent?: string;
        charge_id?: string;
    };
    document?: {
        url?: string;
        generated_at?: ISODateString;
    };
    createdAt: ISODateString;
    updatedAt: ISODateString;
    is_overdue?: boolean; // Virtual field
    payment_status?: "paid" | "partially_paid" | "unpaid"; // Virtual field
}

export interface BillingItem {
    item: ObjectId | Item;
    type: "product" | "service" | "subscription";
    quantity: number;
    unit_price: number;
    tax_rate?: number;
    discount?: {
        amount: number;
        description?: string;
    };
}

export interface Payment {
    method: "stripe" | "transfer" | "cash" | "check";
    transaction_id?: string;
    amount: number;
    date: ISODateString;
    status: "pending" | "completed" | "failed" | "refunded";
    metadata?: Record<string, any>;
}

export interface BillingHistory {
    event: string;
    user?: ObjectId | User;
    timestamp: ISODateString;
}

// ==================== ACCOUNTING TYPES ====================

/**
 * Transaction model
 */
export interface Transaction {
    _id: ObjectId;
    id_company: ObjectId | Company;
    id_financial_record?: ObjectId | FinancialRecord;
    stripe_id: string;
    amount: number;
    currency: "EUR" | "USD" | "GBP";
    type: "payment" | "refund" | "payout" | "transfer" | "fee";
    status: "pending" | "succeeded" | "failed";
    description?: string;
    metadata?: Record<string, any>;
    createdAt: ISODateString;
    updatedAt: ISODateString;
}

/**
 * Financial Record model
 */
export interface FinancialRecord {
    _id: ObjectId;
    id_company: ObjectId | Company;
    id_transaction?: ObjectId | Transaction;
    amount: number;
    net_amount?: number;
    currency: "EUR" | "USD" | "GBP";
    record_type: "income" | "expense";
    category:
        | "subscription"
        | "one_time"
        | "refund"
        | "adjustment"
        | "stripe_fee"
        | "chargeback"
        | "tax"
        | "payout";
    effective_date: ISODateString;
    period_start?: ISODateString;
    period_end?: ISODateString;
    description?: string;
    is_tax_deductible?: boolean;
    tax_rate?: number;
    stripe_data?: Record<string, any>;
    createdAt: ISODateString;
    updatedAt: ISODateString;
}

// ==================== CALENDAR TYPES ====================

/**
 * Calendar Event model
 */
export interface CalendarEvent {
    _id: ObjectId;
    id_company: ObjectId | Company;
    id_user: ObjectId | User;
    title: string;
    description?: string;
    location?: string;
    start_date: ISODateString;
    end_date: ISODateString;
    all_day: boolean;
    event_type: "meeting" | "call" | "task" | "appointment" | "other";
    status: "scheduled" | "in_progress" | "completed" | "cancelled";
    linked_customer?: ObjectId | Customer;
    linked_supplier?: ObjectId | Supplier;
    participants: CalendarParticipant[];
    reminders: CalendarReminder[];
    recurrence?: CalendarRecurrence;
    metadata: {
        color?: string;
        priority?: number;
        visibility?: "public" | "private" | "confidential";
        custom_fields?: Map<string, any>;
    };
    parent_event?: ObjectId | CalendarEvent;
    external_id?: string;
    external_calendar?: string;
    createdAt: ISODateString;
    updatedAt: ISODateString;
    duration?: number; // Virtual field
}

export interface CalendarParticipant {
    user: ObjectId | User;
    status: "pending" | "accepted" | "declined" | "tentative";
    notification_sent: boolean;
}

export interface CalendarReminder {
    time: number; // Minutes avant l'événement
    type: "email" | "notification" | "sms";
    sent: boolean;
}

export interface CalendarRecurrence {
    frequency: "daily" | "weekly" | "monthly" | "yearly";
    interval?: number;
    days_of_week?: number[];
    end_date?: ISODateString;
    count?: number;
    exceptions?: ISODateString[];
}

// ==================== API RESPONSE TYPES ====================

/**
 * Standard API response format
 */
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: {
        message: string;
        status: number;
        details?: Record<string, any>;
    };
}

/**
 * Pagination response
 */
export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    pagination: {
        total: number;
        page: number;
        pages: number;
        limit: number;
    };
}

// ==================== API REQUEST TYPES ====================

/**
 * Login request
 */
export interface LoginRequest {
    email: string;
    password: string;
}

/**
 * OTP verification request
 */
export interface OtpVerificationRequest {
    email: string;
    otp: string;
}

/**
 * Create company request
 */
export interface CreateCompanyRequest {
    id_user: string;
    userId: string;
    name: string;
    contact: {
        email: string;
        phone?: string;
        address?: {
            street?: string;
            city?: string;
            postal_code?: string;
            country?: string;
        };
    };
    legal?: {
        siret?: string;
        tva_number?: string;
        ape_code?: string;
        registration_date?: string;
        capital?: number;
    };
}

/**
 * Update Company Request type
 */
export interface UpdateCompanyRequest {
    name?: string;
    code_company?: string;
    logo?: {
        url?: string;
        thumbnail_url?: string;
        alt_text?: string;
    };
    contact?: Partial<CompanyContact>;
    legal?: Partial<CompanyLegal>;
    billing?: Partial<CompanyBilling>;
    taxation?: Partial<CompanyTaxation>;
    settings?: Partial<CompanySettings>;
    stripe?: {
        customer_id?: string;
        subscription_id?: string;
        subscription_status?:
            | "active"
            | "past_due"
            | "canceled"
            | "trialing"
            | null;
        billing_email?: string;
        connect_account_id?: string;
    };
}

/**
 * Create customer request
 */
export interface CreateCustomerRequest {
    id_company: string;
    name: string;
    contact_info: ContactInfo;
    connect_account_id?: string;
}

/**
 * Create invoice request
 */
export interface CreateInvoiceRequest {
    company: string;
    customer: string;
    billing_number?: string;
    date?: string;
    due_date: string;
    items: {
        item: string;
        quantity: number;
        unit_price: number;
        tax_rate?: number;
    }[];
    notes?: string;
    terms?: string;
}

/**
 * Create subscription request
 */
export interface CreateSubscriptionRequest {
    id_company: string;
    id_plan: string;
    id_stripe_sub: string;
    payment_method_id: string;
    status?: "active" | "past_due" | "canceled" | "trialing";
    current_period: {
        start: string;
        end: string;
    };
}

/**
 * Create checkout session request
 */
export interface CreateCheckoutSessionRequest {
    priceId: string;
    mode?: "subscription" | "payment";
    billingCycle?: "monthly" | "annual";
    companyId: string;
}

/**
 * Create financial record request
 */
export interface CreateFinancialRecordRequest {
    id_company: string;
    id_transaction?: string;
    amount: number;
    net_amount?: number;
    currency?: "EUR" | "USD" | "GBP";
    record_type: "income" | "expense";
    category:
        | "subscription"
        | "one_time"
        | "refund"
        | "adjustment"
        | "stripe_fee"
        | "chargeback"
        | "tax"
        | "payout";
    effective_date: string;
    period_start?: string;
    period_end?: string;
    description?: string;
    is_tax_deductible?: boolean;
    tax_rate?: number;
    stripe_data?: Record<string, any>;
}

// Ajout des types pour les requêtes API du calendrier

/**
 * Create calendar event request
 */
export interface CreateCalendarEventRequest {
    id_company: string;
    title: string;
    description?: string;
    location?: string;
    start_date: string;
    end_date: string;
    all_day?: boolean;
    event_type?: "meeting" | "call" | "task" | "appointment" | "other";
    status?: "scheduled" | "in_progress" | "completed" | "cancelled";
    linked_customer?: string;
    linked_supplier?: string;
    participants?: {
        user: string;
        status?: "pending" | "accepted" | "declined" | "tentative";
    }[];
    reminders?: {
        time: number;
        type?: "email" | "notification" | "sms";
    }[];
    metadata?: {
        color?: string;
        priority?: number;
        visibility?: "public" | "private" | "confidential";
        custom_fields?: Record<string, any>;
    };
}

/**
 * Create recurring calendar event request
 */
export interface CreateRecurringCalendarEventRequest
    extends CreateCalendarEventRequest {
    recurrence: {
        frequency: "daily" | "weekly" | "monthly" | "yearly";
        interval?: number;
        days_of_week?: number[];
        end_date?: string;
        count?: number;
        exceptions?: string[];
    };
}

/**
 * Respond to event invitation request
 */
export interface RespondToEventInvitationRequest {
    status: "accepted" | "declined" | "tentative";
}

// ==================== ENUM TYPES ====================

/**
 * Common enums used throughout the application
 */
export enum UserRole {
    SUPER_ADMIN = "Super Admin",
    ADMIN = "Admin",
    EMPLOYEE = "Employee",
}

export enum SubscriptionStatus {
    ACTIVE = "active",
    PAST_DUE = "past_due",
    CANCELED = "canceled",
    TRIALING = "trialing",
}

export enum InvoiceStatus {
    DRAFT = "draft",
    SENT = "sent",
    PAID = "paid",
    OVERDUE = "overdue",
    CANCELED = "canceled",
}

export enum PaymentMethod {
    STRIPE = "stripe",
    TRANSFER = "transfer",
    CASH = "cash",
    CHECK = "check",
}

export enum PaymentStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    FAILED = "failed",
    REFUNDED = "refunded",
}

export enum RecordType {
    INCOME = "income",
    EXPENSE = "expense",
}

export enum NotificationCategory {
    SYSTEM = "system",
    ALERT = "alert",
    MESSAGE = "message",
    BILLING = "billing",
}

export enum NotificationPriority {
    HIGH = 1,
    MEDIUM = 2,
    LOW = 3,
}

export enum DocumentCategory {
    FINANCIAL = "financial",
    LEGAL = "legal",
    HR = "hr",
    TECHNICAL = "technical",
}

export enum DocumentStatus {
    DRAFT = "draft",
    ACTIVE = "active",
    ARCHIVED = "archived",
    EXPIRED = "expired",
}

export enum DocumentType {
    CONTRACT = "contract",
    INVOICE = "invoice",
    RECEIPT = "receipt",
    PROPOSAL = "proposal",
    AGREEMENT = "agreement",
    CERTIFICATE = "certificate",
    REPORT = "report",
    FORM = "form",
    LETTER = "letter",
    MEMO = "memo",
    POLICY = "policy",
    PROCEDURE = "procedure",
    MANUAL = "manual",
    PRESENTATION = "presentation",
    SPREADSHEET = "spreadsheet",
    IMAGE = "image",
    OTHER = "other",
}

export enum EmployeeStatus {
    ACTIVE = "active",
    ON_LEAVE = "on-leave",
    TERMINATED = "terminated",
}

export enum OrderStatus {
    DRAFT = "draft",
    CONFIRMED = "confirmed",
    SHIPPED = "shipped",
    DELIVERED = "delivered",
    CANCELLED = "cancelled",
}

export enum EstimateStatus {
    DRAFT = "draft",
    SENT = "sent",
    ACCEPTED = "accepted",
    REJECTED = "rejected",
    EXPIRED = "expired",
}

export enum PlanName {
    STARTER = "Basic",
    PRO = "Pro",
    ENTERPRISE = "Enterprise",
}

export enum Currency {
    AED = "AED", // United Arab Emirates Dirham
    AFN = "AFN", // Afghan Afghani
    ALL = "ALL", // Albanian Lek
    AMD = "AMD", // Armenian Dram
    ANG = "ANG", // Netherlands Antillean Guilder
    AOA = "AOA", // Angolan Kwanza
    ARS = "ARS", // Argentine Peso
    AUD = "AUD", // Australian Dollar
    AWG = "AWG", // Aruban Florin
    AZN = "AZN", // Azerbaijani Manat
    BAM = "BAM", // Bosnia-Herzegovina Convertible Mark
    BBD = "BBD", // Barbadian Dollar
    BDT = "BDT", // Bangladeshi Taka
    BGN = "BGN", // Bulgarian Lev
    BIF = "BIF", // Burundian Franc
    BMD = "BMD", // Bermudan Dollar
    BND = "BND", // Brunei Dollar
    BOB = "BOB", // Bolivian Boliviano
    BRL = "BRL", // Brazilian Real
    BSD = "BSD", // Bahamian Dollar
    BWP = "BWP", // Botswanan Pula
    BYN = "BYN", // Belarusian Ruble
    BZD = "BZD", // Belize Dollar
    CAD = "CAD", // Canadian Dollar
    CDF = "CDF", // Congolese Franc
    CHF = "CHF", // Swiss Franc
    CLP = "CLP", // Chilean Peso
    CNY = "CNY", // Chinese Yuan
    COP = "COP", // Colombian Peso
    CRC = "CRC", // Costa Rican Colón
    CVE = "CVE", // Cape Verdean Escudo
    CZK = "CZK", // Czech Koruna
    DJF = "DJF", // Djiboutian Franc
    DKK = "DKK", // Danish Krone
    DOP = "DOP", // Dominican Peso
    DZD = "DZD", // Algerian Dinar
    EGP = "EGP", // Egyptian Pound
    ETB = "ETB", // Ethiopian Birr
    EUR = "EUR", // Euro
    FJD = "FJD", // Fijian Dollar
    FKP = "FKP", // Falkland Islands Pound
    GBP = "GBP", // British Pound
    GEL = "GEL", // Georgian Lari
    GHS = "GHS", // Ghanaian Cedi
    GIP = "GIP", // Gibraltar Pound
    GMD = "GMD", // Gambian Dalasi
    GNF = "GNF", // Guinean Franc
    GTQ = "GTQ", // Guatemalan Quetzal
    GYD = "GYD", // Guyanaese Dollar
    HKD = "HKD", // Hong Kong Dollar
    HNL = "HNL", // Honduran Lempira
    HRK = "HRK", // Croatian Kuna
    HTG = "HTG", // Haitian Gourde
    HUF = "HUF", // Hungarian Forint
    IDR = "IDR", // Indonesian Rupiah
    ILS = "ILS", // Israeli New Shekel
    INR = "INR", // Indian Rupee
    ISK = "ISK", // Icelandic Króna
    JMD = "JMD", // Jamaican Dollar
    JPY = "JPY", // Japanese Yen
    KES = "KES", // Kenyan Shilling
    KGS = "KGS", // Kyrgystani Som
    KHR = "KHR", // Cambodian Riel
    KMF = "KMF", // Comorian Franc
    KRW = "KRW", // South Korean Won
    KYD = "KYD", // Cayman Islands Dollar
    KZT = "KZT", // Kazakhstani Tenge
    LAK = "LAK", // Laotian Kip
    LBP = "LBP", // Lebanese Pound
    LKR = "LKR", // Sri Lankan Rupee
    LRD = "LRD", // Liberian Dollar
    LSL = "LSL", // Lesotho Loti
    MAD = "MAD", // Moroccan Dirham
    MDL = "MDL", // Moldovan Leu
    MGA = "MGA", // Malagasy Ariary
    MKD = "MKD", // Macedonian Denar
    MMK = "MMK", // Myanmar Kyat
    MNT = "MNT", // Mongolian Tugrik
    MOP = "MOP", // Macanese Pataca
    MRO = "MRO", // Mauritanian Ouguiya (pre-2018)
    MRU = "MRU", // Mauritanian Ouguiya
    MUR = "MUR", // Mauritian Rupee
    MVR = "MVR", // Maldivian Rufiyaa
    MWK = "MWK", // Malawian Kwacha
    MXN = "MXN", // Mexican Peso
    MYR = "MYR", // Malaysian Ringgit
    MZN = "MZN", // Mozambican Metical
    NAD = "NAD", // Namibian Dollar
    NGN = "NGN", // Nigerian Naira
    NIO = "NIO", // Nicaraguan Córdoba
    NOK = "NOK", // Norwegian Krone
    NPR = "NPR", // Nepalese Rupee
    NZD = "NZD", // New Zealand Dollar
    PAB = "PAB", // Panamanian Balboa
    PEN = "PEN", // Peruvian Nuevo Sol
    PGK = "PGK", // Papua New Guinean Kina
    PHP = "PHP", // Philippine Peso
    PKR = "PKR", // Pakistani Rupee
    PLN = "PLN", // Polish Złoty
    PYG = "PYG", // Paraguayan Guaraní
    QAR = "QAR", // Qatari Rial
    RON = "RON", // Romanian Leu
    RSD = "RSD", // Serbian Dinar
    RUB = "RUB", // Russian Ruble
    RWF = "RWF", // Rwandan Franc
    SAR = "SAR", // Saudi Riyal
    SBD = "SBD", // Solomon Islands Dollar
    SCR = "SCR", // Seychellois Rupee
    SEK = "SEK", // Swedish Krona
    SGD = "SGD", // Singapore Dollar
    SHP = "SHP", // Saint Helena Pound
    SLL = "SLL", // Sierra Leonean Leone
    SOS = "SOS", // Somali Shilling
    SRD = "SRD", // Surinamese Dollar
    STD = "STD", // São Tomé and Príncipe Dobra (pre-2018)
    STN = "STN", // São Tomé and Príncipe Dobra
    SVC = "SVC", // Salvadoran Colón
    SZL = "SZL", // Swazi Lilangeni
    THB = "THB", // Thai Baht
    TJS = "TJS", // Tajikistani Somoni
    TOP = "TOP", // Tongan Paʻanga
    TRY = "TRY", // Turkish Lira
    TTD = "TTD", // Trinidad and Tobago Dollar
    TWD = "TWD", // New Taiwan Dollar
    TZS = "TZS", // Tanzanian Shilling
    UAH = "UAH", // Ukrainian Hryvnia
    UGX = "UGX", // Ugandan Shilling
    USD = "USD", // United States Dollar
    UYU = "UYU", // Uruguayan Peso
    UZS = "UZS", // Uzbekistan Som
    VES = "VES", // Venezuelan Bolívar Soberano
    VND = "VND", // Vietnamese Đồng
    VUV = "VUV", // Vanuatu Vatu
    WST = "WST", // Samoan Tala
    XAF = "XAF", // CFA Franc BEAC
    XCD = "XCD", // East Caribbean Dollar
    XOF = "XOF", // CFA Franc BCEAO
    XPF = "XPF", // CFP Franc
    YER = "YER", // Yemeni Rial
    ZAR = "ZAR", // South African Rand
    ZMW = "ZMW", // Zambian Kwacha
}

// ==================== ANALYTICS TYPES ====================

/**
 * Report model
 */
export interface Report {
    _id: ObjectId;
    id_company: ObjectId | Company;
    created_by: ObjectId | User;
    report_type: "sales" | "inventory" | "customers" | "financial" | "custom";
    title: string;
    description?: string;
    parameters: {
        start_date?: ISODateString;
        end_date?: ISODateString;
        filters?: Record<string, any>;
        groupBy?: string[];
        metrics?: string[];
    };
    schedule?: {
        frequency: "daily" | "weekly" | "monthly";
        day_of_week?: number; // 0-6 (dimanche-samedi)
        day_of_month?: number; // 1-31
        time?: string; // Format HH:MM
        recipients?: string[]; // Emails
    };
    last_generated?: ISODateString;
    status: "active" | "paused" | "error";
    createdAt: ISODateString;
    updatedAt: ISODateString;
}

/**
 * Create report request
 */
export interface CreateReportRequest {
    company_id: string;
    report_type: "sales" | "inventory" | "customers" | "financial" | "custom";
    title: string;
    description?: string;
    parameters: {
        start_date?: string; // Format ISO
        end_date?: string; // Format ISO
        filters?: Record<string, any>;
        groupBy?: string[];
        metrics?: string[];
    };
    schedule?: {
        frequency: "daily" | "weekly" | "monthly";
        day_of_week?: number; // 0-6 (dimanche-samedi)
        day_of_month?: number; // 1-31
        time?: string; // Format HH:MM
        recipients?: string[]; // Emails
    };
}

/**
 * Sales report parameters
 */
export interface SalesReportParams {
    startDate?: string; // Format ISO
    endDate?: string; // Format ISO
    groupBy?: "day" | "week" | "month" | "product" | "category" | "customer";
    includeRefunds?: boolean;
    includeTaxes?: boolean;
}

/**
 * Customer report parameters
 */
export interface CustomerReportParams {
    startDate?: string; // Format ISO
    endDate?: string; // Format ISO
    segmentBy?: "activity" | "value" | "location" | "acquisition";
    includeInactive?: boolean;
}

/**
 * Advanced report model
 */
export interface AdvancedReport {
    _id: ObjectId;
    id_company: ObjectId | Company;
    title: string;
    description?: string;
    data_sources: {
        type: "sales" | "inventory" | "customers" | "financial" | "custom";
        filters?: Record<string, any>;
        metrics: string[];
    }[];
    visualizations: {
        type: "table" | "line" | "bar" | "pie" | "scatter" | "heatmap";
        title: string;
        data_source_index: number;
        config: Record<string, any>;
    }[];
    schedule?: {
        frequency: "daily" | "weekly" | "monthly";
        day_of_week?: number;
        day_of_month?: number;
        time?: string;
        recipients?: string[];
    };
    last_generated?: ISODateString;
    status: "active" | "paused" | "error";
    createdAt: ISODateString;
    updatedAt: ISODateString;
}

/**
 * Create advanced report request
 */
export interface CreateAdvancedReportRequest {
    company_id: string;
    title: string;
    description?: string;
    data_sources: {
        type: "sales" | "inventory" | "customers" | "financial" | "custom";
        filters?: Record<string, any>;
        metrics: string[];
    }[];
    visualizations: {
        type: "table" | "line" | "bar" | "pie" | "scatter" | "heatmap";
        title: string;
        data_source_index: number;
        config: Record<string, any>;
    }[];
    schedule?: {
        frequency: "daily" | "weekly" | "monthly";
        day_of_week?: number;
        day_of_month?: number;
        time?: string;
        recipients?: string[];
    };
}

/**
 * Custom report configuration
 */
export interface CustomReportConfig {
    metrics: string[];
    dimensions: string[];
    filters: {
        field: string;
        operator:
            | "eq"
            | "neq"
            | "gt"
            | "gte"
            | "lt"
            | "lte"
            | "in"
            | "nin"
            | "contains";
        value: any;
    }[];
    sort: {
        field: string;
        direction: "asc" | "desc";
    }[];
    limit?: number;
    format?: "json" | "csv" | "pdf";
}

/**
 * Predictive analytics types
 */

/**
 * Sales forecast parameters
 */
export interface SalesForecastParams {
    months: number; // Nombre de mois à prévoir
    includeHistorical?: boolean; // Inclure les données historiques
    confidenceInterval?: number; // Intervalle de confiance (0-1)
    seasonalityAdjustment?: boolean; // Ajuster pour la saisonnalité
}

/**
 * Inventory forecast parameters
 */
export interface InventoryForecastParams {
    itemId?: string; // ID de l'article spécifique ou tous les articles
    forecastPeriod?: number; // Période de prévision en jours
    reorderPointCalculation?: boolean; // Calculer les points de réapprovisionnement
    safetyStockLevel?: number; // Niveau de stock de sécurité
}

/**
 * Churn prediction parameters
 */
export interface ChurnPredictionParams {
    lookbackPeriod?: number; // Période d'analyse en jours
    riskThreshold?: number; // Seuil de risque (0-1)
    includeFactors?: boolean; // Inclure les facteurs de risque
}

/**
 * Customer segmentation parameters
 */
export interface CustomerSegmentationParams {
    segments: number; // Nombre de segments à créer
    dimensions?: string[]; // Dimensions à utiliser pour la segmentation
    algorithm?: "kmeans" | "hierarchical" | "dbscan"; // Algorithme de segmentation
    includeProfiles?: boolean; // Inclure les profils de segment
}

/**
 * Financial record filters
 */
export interface FinancialRecordFilters {
    company_id?: string;
    record_type?: "income" | "expense";
    category?: string;
    start_date?: string; // Format ISO
    end_date?: string; // Format ISO
    min_amount?: number;
    max_amount?: number;
    currency?: "EUR" | "USD" | "GBP";
    is_tax_deductible?: boolean;
}

/**
 * Financial record totals parameters
 */
export interface FinancialRecordTotalsParams {
    start_date?: string; // Format ISO
    end_date?: string; // Format ISO
    currency?: "EUR" | "USD" | "GBP";
    record_type?: "income" | "expense";
    period?: "day" | "week" | "month" | "quarter" | "year";
    include_categories?: boolean;
    include_periods?: boolean;
}

/**
 * Update financial record request
 */
export interface UpdateFinancialRecordRequest {
    amount?: number;
    net_amount?: number;
    currency?: "EUR" | "USD" | "GBP";
    record_type?: "income" | "expense";
    category?:
        | "subscription"
        | "one_time"
        | "refund"
        | "adjustment"
        | "stripe_fee"
        | "chargeback"
        | "tax"
        | "payout";
    effective_date?: string;
    period_start?: string;
    period_end?: string;
    description?: string;
    is_tax_deductible?: boolean;
    tax_rate?: number;
    stripe_data?: Record<string, any>;
}

/**
 * Transaction date range parameters
 */
export interface TransactionDateRangeParams {
    startDate: string; // Format ISO
    endDate: string; // Format ISO
}

/**
 * Create transaction request
 */
export interface CreateTransactionRequest {
    id_company: string;
    id_financial_record?: string;
    stripe_id: string;
    amount: number;
    currency: "EUR" | "USD" | "GBP";
    type: "payment" | "refund" | "payout" | "transfer" | "fee";
    status: "pending" | "succeeded" | "failed";
    description?: string;
    metadata?: Record<string, any>;
}

/**
 * Update transaction request
 */
export interface UpdateTransactionRequest {
    amount?: number;
    currency?: "EUR" | "USD" | "GBP";
    type?: "payment" | "refund" | "payout" | "transfer" | "fee";
    status?: "pending" | "succeeded" | "failed";
    description?: string;
    metadata?: Record<string, any>;
}

// Adding the missing taxation types to api-types.ts
// This is a partial update, assuming the rest of the file is already correct

// Taxation Types
export interface TaxationSettings {
    tax_system: string;
    country: string;
    tax_rates: TaxRate[];
    taxCategories?: TaxCategory[];
    taxRules?: TaxRule[];
    taxExemptions?: TaxExemption[];
    tax_settings?: {
        display_tax_inclusive_prices: boolean;
        apply_tax_on_shipping: boolean;
        round_taxes_to_nearest: number;
    };
}

export interface TaxRate {
    _id: string;
    name: string;
    rate: number;
    description?: string;
    isDefault: boolean;
    country?: string;
    region?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface TaxCategory {
    _id: string;
    name: string;
    description?: string;
    defaultTaxRateId?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface TaxExemption {
    _id: string;
    name: string;
    description?: string;
    customerId: string;
    certificateNumber?: string;
    expiryDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface TaxCalculationRequest {
    items: Array<{
        price: number;
        quantity: number;
        taxCategoryId?: string;
    }>;
    customerId?: string;
    shippingAddress?: Address;
    billingAddress?: Address;
}

export interface TaxCalculationResult {
    subtotal: number;
    taxableAmount: number;
    taxAmount: number;
    total: number;
    taxDetails: Array<{
        name: string;
        rate: number;
        amount: number;
    }>;
    isExempt: boolean;
    exemptionDetails?: {
        id: string;
        name: string;
        certificateNumber?: string;
    };
}
