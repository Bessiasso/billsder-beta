import Hashids from "hashids";
import type { ObjectId } from "mongodb";

const SALT = process.env.HASHIDS_SALT || "crm-secure-salt-2024";
const MIN_LENGTH = 10;
const ALPHABET =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

// Create separate Hashids instances for each entity type
const invoiceHashids = new Hashids(`${SALT}-invoices`, MIN_LENGTH, ALPHABET);
const productHashids = new Hashids(`${SALT}-products`, MIN_LENGTH, ALPHABET);
const supplierHashids = new Hashids(`${SALT}-suppliers`, MIN_LENGTH, ALPHABET);
const customerHashids = new Hashids(`${SALT}-customers`, MIN_LENGTH, ALPHABET);
const employeeHashids = new Hashids(`${SALT}-employees`, MIN_LENGTH, ALPHABET);
const userHashids = new Hashids(`${SALT}-users`, MIN_LENGTH, ALPHABET);
const companyHashids = new Hashids(`${SALT}-companies`, MIN_LENGTH, ALPHABET);
const estimateHashids = new Hashids(`${SALT}-estimates`, MIN_LENGTH, ALPHABET);

// Better approach: Convert ObjectId hex string to array of numbers
function objectIdToNumbers(objectId: string | ObjectId): number[] {
    const idString = objectId.toString();

    // Validate ObjectId format (24 hex characters)
    if (!/^[0-9a-fA-F]{24}$/.test(idString)) {
        throw new Error(`Invalid ObjectId format: ${idString}`);
    }

    // Split into chunks of 8 characters (4 bytes each) and convert to numbers
    const numbers: number[] = [];
    for (let i = 0; i < 24; i += 8) {
        const chunk = idString.substring(i, i + 8);
        const number = Number.parseInt(chunk, 16);
        numbers.push(number);
    }

    return numbers;
}

// Convert array of numbers back to ObjectId
function numbersToObjectId(numbers: number[]): string {
    if (numbers.length !== 3) {
        throw new Error(`Expected 3 numbers, got ${numbers.length}`);
    }

    // Convert each number back to 8-character hex string
    const hexParts = numbers.map((num) => {
        const hex = num.toString(16).padStart(8, "0");
        return hex;
    });

    const objectId = hexParts.join("");
    return objectId;
}

// === PRODUCTS ===
export function encodeProductId(objectId: string | ObjectId): string {
    try {
        const numbers = objectIdToNumbers(objectId);
        const hash = productHashids.encode(numbers);

        return `prd_${hash}`;
    } catch (error) {
        console.error("Error encoding product ObjectId:", error);
        throw new Error("Invalid product ID");
    }
}

export function decodeProductId(hashId: string): string | null {
    try {
        const hash = hashId.replace("prd_", "");
        const decoded = productHashids.decode(hash);

        if (decoded.length !== 3) {
            console.error(
                `Expected 3 numbers, got ${decoded.length}:`,
                decoded
            );
            return null;
        }

        const objectId = numbersToObjectId(decoded as number[]);
        return objectId;
    } catch (error) {
        console.error("Error decoding product hashId:", error);
        return null;
    }
}

// === CUSTOMERS ===
export function encodeCustomerId(objectId: string | ObjectId): string {
    try {
        const numbers = objectIdToNumbers(objectId);
        const hash = customerHashids.encode(numbers);
        return `cus_${hash}`;
    } catch (error) {
        console.error("Error encoding customer ObjectId:", error);
        throw new Error("Invalid customer ID");
    }
}

export function decodeCustomerId(hashId: string): string | null {
    try {
        const hash = hashId.replace("cus_", "");
        const decoded = customerHashids.decode(hash);
        if (decoded.length !== 3) return null;
        return numbersToObjectId(decoded as number[]);
    } catch (error) {
        console.error("Error decoding customer hashId:", error);
        return null;
    }
}

// === INVOICES ===
export function encodeInvoiceId(objectId: string | ObjectId): string {
    try {
        const numbers = objectIdToNumbers(objectId);
        const hash = invoiceHashids.encode(numbers);
        return `inv_${hash}`;
    } catch (error) {
        console.error("Error encoding invoice ObjectId:", error);
        throw new Error("Invalid invoice ID");
    }
}

export function decodeInvoiceId(hashId: string): string | null {
    try {
        const hash = hashId.replace("inv_", "");
        const decoded = invoiceHashids.decode(hash);
        if (decoded.length !== 3) return null;
        return numbersToObjectId(decoded as number[]);
    } catch (error) {
        console.error("Error decoding invoice hashId:", error);
        return null;
    }
}

// === SUPPLIERS ===
export function encodeSupplierId(objectId: string | ObjectId): string {
    try {
        const numbers = objectIdToNumbers(objectId);
        const hash = supplierHashids.encode(numbers);
        return `sup_${hash}`;
    } catch (error) {
        console.error("Error encoding supplier ObjectId:", error);
        throw new Error("Invalid supplier ID");
    }
}

export function decodeSupplierId(hashId: string): string | null {
    try {
        const hash = hashId.replace("sup_", "");
        const decoded = supplierHashids.decode(hash);
        if (decoded.length !== 3) return null;
        return numbersToObjectId(decoded as number[]);
    } catch (error) {
        console.error("Error decoding supplier hashId:", error);
        return null;
    }
}

// === EMPLOYEES ===
export function encodeEmployeeId(objectId: string | ObjectId): string {
    try {
        const numbers = objectIdToNumbers(objectId);
        const hash = employeeHashids.encode(numbers);
        return `emp_${hash}`;
    } catch (error) {
        console.error("Error encoding employee ObjectId:", error);
        throw new Error("Invalid employee ID");
    }
}

export function decodeEmployeeId(hashId: string): string | null {
    try {
        const hash = hashId.replace("emp_", "");
        const decoded = employeeHashids.decode(hash);
        if (decoded.length !== 3) return null;
        return numbersToObjectId(decoded as number[]);
    } catch (error) {
        console.error("Error decoding employee hashId:", error);
        return null;
    }
}

// === USERS ===
export function encodeUserId(objectId: string | ObjectId): string {
    try {
        const numbers = objectIdToNumbers(objectId);
        const hash = userHashids.encode(numbers);
        return `usr_${hash}`;
    } catch (error) {
        console.error("Error encoding user ObjectId:", error);
        throw new Error("Invalid user ID");
    }
}

export function decodeUserId(hashId: string): string | null {
    try {
        const hash = hashId.replace("usr_", "");
        const decoded = userHashids.decode(hash);
        if (decoded.length !== 3) return null;
        return numbersToObjectId(decoded as number[]);
    } catch (error) {
        console.error("Error decoding user hashId:", error);
        return null;
    }
}

// === COMPANIES ===
export function encodeCompanyId(objectId: string | ObjectId): string {
    try {
        const numbers = objectIdToNumbers(objectId);
        const hash = companyHashids.encode(numbers);
        return `com_${hash}`;
    } catch (error) {
        console.error("Error encoding company ObjectId:", error);
        throw new Error("Invalid company ID");
    }
}

export function decodeCompanyId(hashId: string): string | null {
    try {
        const hash = hashId.replace("com_", "");
        const decoded = companyHashids.decode(hash);
        if (decoded.length !== 3) return null;
        return numbersToObjectId(decoded as number[]);
    } catch (error) {
        console.error("Error decoding company hashId:", error);
        return null;
    }
}

// === ESTIMATES ===
export function encodeEstimateId(objectId: string | ObjectId): string {
    try {
        const numbers = objectIdToNumbers(objectId);
        const hash = estimateHashids.encode(numbers);
        return `est_${hash}`;
    } catch (error) {
        console.error("Error encoding estimate ObjectId:", error);
        throw new Error("Invalid estimate ID");
    }
}

export function decodeEstimateId(hashId: string): string | null {
    try {
        const hash = hashId.replace("est_", "");
        const decoded = estimateHashids.decode(hash);
        if (decoded.length !== 3) return null;
        return numbersToObjectId(decoded as number[]);
    } catch (error) {
        console.error("Error decoding estimate hashId:", error);
        return null;
    }
}

// === VALIDATION FUNCTIONS ===
export function isValidProductHash(hashId: string): boolean {
    return (
        /^prd_[a-zA-Z0-9]{10,}$/.test(hashId) &&
        decodeProductId(hashId) !== null
    );
}

export function isValidCustomerHash(hashId: string): boolean {
    return (
        /^cus_[a-zA-Z0-9]{10,}$/.test(hashId) &&
        decodeCustomerId(hashId) !== null
    );
}

export function isValidInvoiceHash(hashId: string): boolean {
    return (
        /^inv_[a-zA-Z0-9]{10,}$/.test(hashId) &&
        decodeInvoiceId(hashId) !== null
    );
}

export function isValidSupplierHash(hashId: string): boolean {
    return (
        /^sup_[a-zA-Z0-9]{10,}$/.test(hashId) &&
        decodeSupplierId(hashId) !== null
    );
}

export function isValidEmployeeHash(hashId: string): boolean {
    return (
        /^emp_[a-zA-Z0-9]{10,}$/.test(hashId) &&
        decodeEmployeeId(hashId) !== null
    );
}

export function isValidUserHash(hashId: string): boolean {
    return (
        /^usr_[a-zA-Z0-9]{10,}$/.test(hashId) && decodeUserId(hashId) !== null
    );
}

export function isValidCompanyHash(hashId: string): boolean {
    return (
        /^com_[a-zA-Z0-9]{10,}$/.test(hashId) &&
        decodeCompanyId(hashId) !== null
    );
}

export function isValidEstimateHash(hashId: string): boolean {
    return (
        /^est_[a-zA-Z0-9]{10,}$/.test(hashId) &&
        decodeEstimateId(hashId) !== null
    );
}

// === UTILITY FUNCTIONS ===
export type EntityType =
    | "invoice"
    | "product"
    | "supplier"
    | "customer"
    | "employee"
    | "user"
    | "company"
    | "estimate";

export function encodeEntityId(
    objectId: string | ObjectId,
    entityType: EntityType
): string {
    switch (entityType) {
        case "invoice":
            return encodeInvoiceId(objectId);
        case "product":
            return encodeProductId(objectId);
        case "supplier":
            return encodeSupplierId(objectId);
        case "customer":
            return encodeCustomerId(objectId);
        case "employee":
            return encodeEmployeeId(objectId);
        case "user":
            return encodeUserId(objectId);
        case "company":
            return encodeCompanyId(objectId);
        case "estimate":
            return encodeEstimateId(objectId);
        default:
            throw new Error(`Unknown entity type: ${entityType}`);
    }
}

export function decodeEntityId(hashId: string): {
    objectId: string | null;
    entityType: EntityType | null;
} {
    if (hashId.startsWith("inv_")) {
        return { objectId: decodeInvoiceId(hashId), entityType: "invoice" };
    }
    if (hashId.startsWith("prd_")) {
        return { objectId: decodeProductId(hashId), entityType: "product" };
    }
    if (hashId.startsWith("sup_")) {
        return { objectId: decodeSupplierId(hashId), entityType: "supplier" };
    }
    if (hashId.startsWith("cus_")) {
        return { objectId: decodeCustomerId(hashId), entityType: "customer" };
    }
    if (hashId.startsWith("emp_")) {
        return { objectId: decodeEmployeeId(hashId), entityType: "employee" };
    }
    if (hashId.startsWith("usr_")) {
        return { objectId: decodeUserId(hashId), entityType: "user" };
    }
    if (hashId.startsWith("com_")) {
        return { objectId: decodeCompanyId(hashId), entityType: "company" };
    }
    if (hashId.startsWith("est_")) {
        return { objectId: decodeEstimateId(hashId), entityType: "estimate" };
    }

    return { objectId: null, entityType: null };
}

// Debug function for testing conversions
export function debugEntityConversion(
    objectId: string,
    entityType: EntityType = "product"
) {
    console.log("=== DEBUG ENTITY CONVERSION ===");
    console.log("ObjectId original:", objectId);
    console.log("Entity type:", entityType);

    try {
        const encoded = encodeEntityId(objectId, entityType);
        console.log("Hashid encoded:", encoded);

        const { objectId: decoded, entityType: detectedType } =
            decodeEntityId(encoded);
        console.log("ObjectId decoded:", decoded);
        console.log("Entity type detected:", detectedType);

        const isSuccess = objectId.toLowerCase() === decoded?.toLowerCase();
        console.log("Conversion successful:", isSuccess);
        console.log("Type detection correct:", entityType === detectedType);

        if (!isSuccess) {
            console.error("❌ CONVERSION FAILED!");
            console.error("Expected:", objectId);
            console.error("Got:", decoded);
        } else {
            console.log("✅ CONVERSION SUCCESSFUL!");
        }

        console.log("===============================");

        return {
            original: objectId,
            encoded,
            decoded,
            detectedType,
            success: isSuccess,
        };
    } catch (error) {
        console.error("❌ ERROR during conversion:", error);
        return {
            original: objectId,
            encoded: null,
            decoded: null,
            detectedType: null,
            success: false,
        };
    }
}

// Test function you can call in your component
export function testProductConversion(objectId: string) {
    console.log("🧪 Testing Product ID Conversion");
    return debugEntityConversion(objectId, "product");
}
