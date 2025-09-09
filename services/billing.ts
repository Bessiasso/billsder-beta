/**
 * Billing API Client
 * Handles plans
 */

// Import types
import {
    Plan,
    Subscription,
    PaymentMethod,
    SubscriptionStatus,
    PaymentStatus,
    ApiResponse,
} from "./api-types";

// Base API configuration
const API_BASE_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000/api";

// Helper function to get auth token
const getAuthToken = () => {
    // Check if we're in a browser environment before accessing localStorage
    if (typeof window !== "undefined") {
        return localStorage.getItem("token");
    }
    return null; // Return null on server-side
};

// Helper function to create request headers
const createHeaders = (contentType = "application/json") => {
    const headers: Record<string, string> = {
        "Content-Type": contentType,
    };

    const token = getAuthToken();
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
};

// Helper function to handle API responses\
const handleResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
        // Handle specific error cases
        if (response.status === 411 && typeof window !== "undefined") {
            // Unauthorized - redirect to login
            localStorage.removeItem("token");
            window.location.href = "/auth/login";
        }

        // Try to parse error response
        const errorData = await response.json().catch(() => null);
        throw errorData || new Error(`HTTP error! Status: ${response.status}`);
    }

    // For blob responses, return the blob directly
    if (
        response.headers
            .get("content-type")
            ?.includes("application/octet-stream") ||
        response.headers.get("content-type")?.includes("application/pdf") ||
        response.headers.get("content-type")?.includes("image/")
    ) {
        return response.blob() as unknown as T;
    }

    return response.json();
};

// Helper function to handle API errors
const handleError = (error: any): never => {
    if (error instanceof Response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("API Error:", error);
        throw error;
    } else if (error instanceof Error) {
        // Something happened in setting up the request that triggered an Error
        console.error("API Error:", error.message);
        throw error;
    } else {
        // Unknown error
        console.error("API Error:", error);
        throw new Error("Unknown error occurred");
    }
};

// Helper function to make API requests
const apiRequest = async <T>(
    endpoint: string,
    method: string = "GET",
    data?: any,
    customHeaders?: HeadersInit,
    isFormData: boolean = false
): Promise<T> => {
    try {
        const url = `${API_BASE_URL}${endpoint}`;
        const headers = {
            ...createHeaders(isFormData ? undefined : "application/json"),
            ...customHeaders,
        };

        const options: RequestInit = {
            method,
            headers,
            //credentials: "include",
        };

        if (data) {
            if (isFormData && data instanceof FormData) {
                // For FormData, create headers without Content-Type
                // as the browser will set it with the boundary
                const headersWithoutContentType: Record<string, string> = {
                    ...createHeaders(undefined),
                    ...(customHeaders as Record<string, string>),
                };
                // Remove Content-Type header
                delete headersWithoutContentType["Content-Type"];

                options.headers = headersWithoutContentType;
                options.body = data;
            } else if (method !== "GET") {
                options.body = JSON.stringify(data);
            }
        }

        const response = await fetch(url, options);
        return await handleResponse<T>(response);
    } catch (error) {
        return handleError(error);
    }
};

// Plan API endpoints
export const planApi = {
    /**
     * Get all plans
     */
    getPlans: async () => {
        return apiRequest<ApiResponse<Plan[]>>("/plans");
    },

    /**
     * Get a plan by ID
     */
    getPlanById: async (id: string) => {
        return apiRequest<ApiResponse<Plan>>(`/plans/${id}`);
    },

    /**
     * Create a new plan
     */
};
