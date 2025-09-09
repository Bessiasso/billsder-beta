/**
 * Business API Client
 * Handles companies, customers, suppliers, employees, and business operations
 */

// Import types
import {
    Company,
    Customer,
    Supplier,
    Employee,
    Document,
    Store,
    Item,
    Order,
    CalendarEvent,
    ApiResponse,
    //Team,
    TeamMember,
    PaymentMethod,
    TaxSettings,
    TaxRate,
    TaxCategory,
    TaxRule,
    TaxExemption,
    type Currency,
    //StoreLocation,
    //ItemCategory,
    //ItemVariant,
    //EventAttendee,
    //EventReminder,
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

// Business API endpoints
export const businessApi = {
    companies: {
        /**
         * Create a new company
         */
        create: async (companyData: Partial<Company>) => {
            return apiRequest<ApiResponse<Company>>(
                "/companies",
                "POST",
                companyData
            );
        },

        /**
         * Get companies by user ID
         */
        getByUserId: async (userId: string) => {
            return apiRequest<ApiResponse<Company[]>>(
                `/companies/user/${userId}`
            );
        },

        /**
         * Update a company
         */
        update: async (
            id: string,
            userId: string,
            companyData: Partial<Company>
        ) => {
            return apiRequest<ApiResponse<Company>>(
                `/companies/${id}/${userId}`,
                "PUT",
                companyData
            );
        },

        /**
         * Search companies by name
         */
        searchByName: async (name: string, userId: string) => {
            return apiRequest<ApiResponse<Company[]>>(
                `/companies/search/${name}/${userId}`
            );
        },

        /**
         * Get a company by ID
         */
        getById: async (id: string, userId: string) => {
            return apiRequest<ApiResponse<Company>>(
                `/companies/${id}/${userId}`
            );
        },

        /**
         * Get all companies
         */
        getAll: async (userId: string) => {
            return apiRequest<ApiResponse<Company[]>>(
                `/companies/all/${userId}`
            );
        },

        /**
         * Delete a company
         */
        delete: async (id: string, userId: string) => {
            return apiRequest<ApiResponse<void>>(
                `/companies/${id}/${userId}`,
                "DELETE"
            );
        },

        /**
         * Get taxation settings for a company
         */
        getTaxationSettings: async (id: string, userId: string) => {
            return apiRequest<ApiResponse<TaxSettings>>(
                `/companies/${id}/taxation/${userId}`
            );
        },

        /**
         * Update taxation settings for a company
         */
        updateTaxationSettings: async (
            id: string,
            userId: string,
            taxationData: Partial<TaxSettings>
        ) => {
            return apiRequest<ApiResponse<TaxSettings>>(
                `/companies/${id}/taxation/${userId}`,
                "PUT",
                taxationData
            );
        },

        /**
         * Add or update a tax rate
         */
        updateTaxRate: async (
            id: string,
            userId: string,
            taxRateData: Partial<TaxRate>
        ) => {
            return apiRequest<ApiResponse<TaxRate>>(
                `/companies/${id}/tax-rate/${userId}`,
                "POST",
                { taxRate: taxRateData }
            );
        },

        /**
         * Delete a tax rate
         */
        deleteTaxRate: async (
            id: string,
            taxRateId: string,
            userId: string
        ) => {
            return apiRequest<ApiResponse<void>>(
                `/companies/${id}/tax-rate/${taxRateId}/${userId}`,
                "DELETE"
            );
        },

        /**
         * Add or update a tax category
         */
        updateTaxCategory: async (
            id: string,
            userId: string,
            taxCategoryData: Partial<TaxCategory>
        ) => {
            return apiRequest<ApiResponse<TaxCategory>>(
                `/companies/${id}/tax-category/${userId}`,
                "POST",
                {
                    taxCategory: taxCategoryData,
                }
            );
        },

        /**
         * Delete a tax category
         */
        deleteTaxCategory: async (
            id: string,
            taxCategoryId: string,
            userId: string
        ) => {
            return apiRequest<ApiResponse<void>>(
                `/companies/${id}/tax-category/${taxCategoryId}/${userId}`,
                "DELETE"
            );
        },

        /**
         * Add or update a tax rule
         */
        updateTaxRule: async (
            id: string,
            userId: string,
            taxRuleData: Partial<TaxRule>
        ) => {
            return apiRequest<ApiResponse<TaxRule>>(
                `/companies/${id}/tax-rule/${userId}`,
                "POST",
                { taxRule: taxRuleData }
            );
        },

        /**
         * Delete a tax rule
         */
        deleteTaxRule: async (
            id: string,
            taxRuleId: string,
            userId: string
        ) => {
            return apiRequest<ApiResponse<void>>(
                `/companies/${id}/tax-rule/${taxRuleId}/${userId}`,
                "DELETE"
            );
        },

        /**
         * Add or update a tax exemption
         */
        updateTaxExemption: async (
            id: string,
            userId: string,
            taxExemptionData: Partial<TaxExemption>
        ) => {
            return apiRequest<ApiResponse<TaxExemption>>(
                `/companies/${id}/tax-exemption/${userId}`,
                "POST",
                {
                    taxExemption: taxExemptionData,
                }
            );
        },

        /**
         * Delete a tax exemption
         */
        deleteTaxExemption: async (
            id: string,
            taxExemptionId: string,
            userId: string
        ) => {
            return apiRequest<ApiResponse<void>>(
                `/companies/${id}/tax-exemption/${taxExemptionId}/${userId}`,
                "DELETE"
            );
        },

        /**
         * Calculate taxes for a given set of items
         */
        calculateTaxes: async (
            id: string,
            userId: string,
            calculationData: { items: any[]; customer?: any; location?: string }
        ) => {
            return apiRequest<ApiResponse<any>>(
                `/companies/${id}/calculate-taxes/${userId}`,
                "POST",
                calculationData
            );
        },

        /**
         * Get company settings
         */
        getSettings: async (id: string, userId: string) => {
            return apiRequest<ApiResponse<any>>(
                `/companies/${id}/settings/${userId}`
            );
        },

        /**
         * Update company settings
         */
        updateSettings: async (
            id: string,
            userId: string,
            settingsData: any
        ) => {
            return apiRequest<ApiResponse<any>>(
                `/companies/${id}/settings/${userId}`,
                "PUT",
                settingsData
            );
        },

        /**
         * Get company branding
         */
        getBranding: async (id: string, userId: string) => {
            return apiRequest<ApiResponse<any>>(
                `/companies/${id}/branding/${userId}`
            );
        },

        /**
         * Update company branding
         */
        updateBranding: async (
            id: string,
            userId: string,
            brandingData: any
        ) => {
            return apiRequest<ApiResponse<any>>(
                `/companies/${id}/branding/${userId}`,
                "PUT",
                brandingData
            );
        },
    },

    customers: {
        /**
         * Get all customers for a company
         */
        getByCompany: async (companyId: string, userId: string) => {
            return apiRequest<ApiResponse<Customer[]>>(
                `/customers/company/${companyId}/${userId}`
            );
        },

        /**
         * Get a customer by ID
         */
        getById: async (id: string, userId: string) => {
            return apiRequest<ApiResponse<Customer>>(
                `/customers/${id}/${userId}`
            );
        },

        /**
         * Create a new customer
         */
        create: async (customerData: Partial<Customer>, userId: string) => {
            return apiRequest<ApiResponse<Customer>>(
                `/customers/${userId}`,
                "POST",
                customerData
            );
        },

        /**
         * Update a customer
         */
        update: async (
            id: string,
            userId: string,
            customerData: Partial<Customer>
        ) => {
            return apiRequest<ApiResponse<Customer>>(
                `/customers/${id}/${userId}`,
                "PUT",
                customerData
            );
        },

        /**
         * Delete a customer
         */
        delete: async (id: string, userId: string) => {
            return apiRequest<ApiResponse<void>>(
                `/customers/${id}/${userId}`,
                "DELETE"
            );
        },

        /**
         * Search customers by name
         */
        searchByName: async (
            companyId: string,
            name: string,
            userId: string
        ) => {
            return apiRequest<ApiResponse<Customer[]>>(
                `/customers/search/${companyId}/${name}/${userId}`
            );
        },

        /**
         * Get customer purchase history
         */
        getPurchaseHistory: async (id: string, userId: string) => {
            return apiRequest<ApiResponse<any[]>>(
                `/customers/${id}/purchases/${userId}`
            );
        },

        /**
         * Add a note to a customer
         */
        addNote: async (id: string, userId: string, note: string) => {
            return apiRequest<ApiResponse<Customer>>(
                `/customers/${id}/notes/${userId}`,
                "POST",
                { note }
            );
        },

        /**
         * Get customer payment methods
         */
        getPaymentMethods: async (id: string, userId: string) => {
            return apiRequest<ApiResponse<PaymentMethod[]>>(
                `/customers/${id}/payment-methods/${userId}`
            );
        },

        /**
         * Add payment method to customer
         */
        addPaymentMethod: async (
            id: string,
            userId: string,
            paymentMethodData: Partial<PaymentMethod>
        ) => {
            return apiRequest<ApiResponse<PaymentMethod>>(
                `/customers/${id}/payment-methods/${userId}`,
                "POST",
                paymentMethodData
            );
        },

        /**
         * Delete customer payment method
         */
        deletePaymentMethod: async (
            customerId: string,
            paymentMethodId: string,
            userId: string
        ) => {
            return apiRequest<ApiResponse<void>>(
                `/customers/${customerId}/payment-methods/${paymentMethodId}/${userId}`,
                "DELETE"
            );
        },
    },

    suppliers: {
        /**
         * Get all suppliers for a company
         */
        getByCompany: async (companyId: string, userId: string) => {
            return apiRequest<ApiResponse<Supplier[]>>(
                `/suppliers/company/${companyId}/${userId}`
            );
        },

        /**
         * Get a supplier by ID
         */
        getById: async (id: string, userId: string) => {
            return apiRequest<ApiResponse<Supplier>>(
                `/suppliers/${id}/${userId}`
            );
        },

        /**
         * Create a new supplier
         */
        create: async (supplierData: Partial<Supplier>, userId: string) => {
            return apiRequest<ApiResponse<Supplier>>(
                `/suppliers/${userId}`,
                "POST",
                supplierData
            );
        },

        /**
         * Update a supplier
         */
        update: async (
            id: string,
            userId: string,
            supplierData: Partial<Supplier>
        ) => {
            return apiRequest<ApiResponse<Supplier>>(
                `/suppliers/${id}/${userId}`,
                "PUT",
                supplierData
            );
        },

        /**
         * Delete a supplier
         */
        delete: async (id: string, userId: string) => {
            return apiRequest<ApiResponse<void>>(
                `/suppliers/${id}/${userId}`,
                "DELETE"
            );
        },

        /**
         * Search suppliers by name
         */
        searchByName: async (
            companyId: string,
            name: string,
            userId: string
        ) => {
            return apiRequest<ApiResponse<Supplier[]>>(
                `/suppliers/search/${companyId}/${name}/${userId}`
            );
        },

        /**
         * Get supplier items
         */
        getItems: async (id: string, userId: string) => {
            return apiRequest<ApiResponse<Item[]>>(
                `/suppliers/${id}/items/${userId}`
            );
        },

        /**
         * Add a note to a supplier
         */
        addNote: async (id: string, userId: string, note: string) => {
            return apiRequest<ApiResponse<Supplier>>(
                `/suppliers/${id}/notes/${userId}`,
                "POST",
                { note }
            );
        },
    },

    employees: {
        /**
         * Get all employees for a company
         */
        getByCompany: async (companyId: string, userId: string) => {
            return apiRequest<ApiResponse<Employee[]>>(
                `/employees/company/${companyId}/${userId}`
            );
        },

        /**
         * Get an employee by ID
         */
        getById: async (id: string, userId: string) => {
            return apiRequest<ApiResponse<Employee>>(
                `/employees/${id}/${userId}`
            );
        },

        /**
         * Get an employee by ID
         */
        getByUserId: async (userId: string) => {
            return apiRequest<ApiResponse<Employee>>(
                `/employees/getbyuser/${userId}`
            );
        },

        /**
         * Create a new employee
         */
        create: async (employeeData: Partial<Employee>, userId: string) => {
            return apiRequest<ApiResponse<Employee>>(
                `/employees/${userId}`,
                "POST",
                employeeData
            );
        },

        /**
         * Update an employee
         */
        update: async (
            id: string,
            userId: string,
            employeeData: Partial<Employee>
        ) => {
            return apiRequest<ApiResponse<Employee>>(
                `/employees/${id}/${userId}`,
                "PUT",
                employeeData
            );
        },

        /**
         * Delete an employee
         */
        delete: async (id: string, userId: string) => {
            return apiRequest<ApiResponse<void>>(
                `/employees/${id}/${userId}`,
                "DELETE"
            );
        },

        /**
         * Search employees by name
         */
        searchByName: async (
            companyId: string,
            name: string,
            userId: string
        ) => {
            return apiRequest<ApiResponse<Employee[]>>(
                `/employees/search/${companyId}/${name}/${userId}`
            );
        },

        /**
         * Get employee documents
         */
        getDocuments: async (id: string, userId: string) => {
            return apiRequest<ApiResponse<Document[]>>(
                `/employees/${id}/documents/${userId}`
            );
        },

        /**
         * Add a document to an employee
         */
        addDocument: async (
            id: string,
            userId: string,
            documentData: Partial<Document>
        ) => {
            return apiRequest<ApiResponse<Document>>(
                `/employees/${id}/documents/${userId}`,
                "POST",
                documentData
            );
        },

        /**
         * Get employee attendance
         */
        getAttendance: async (
            id: string,
            userId: string,
            startDate: string,
            endDate: string
        ) => {
            return apiRequest<ApiResponse<any[]>>(
                `/employees/${id}/attendance/${userId}?startDate=${startDate}&endDate=${endDate}`
            );
        },

        /**
         * Record employee attendance
         */
        recordAttendance: async (
            id: string,
            userId: string,
            attendanceData: any
        ) => {
            return apiRequest<ApiResponse<any>>(
                `/employees/${id}/attendance/${userId}`,
                "POST",
                attendanceData
            );
        },
    },

    documents: {
        /**
         * Get all documents for a company
         */
        getByCompany: async (companyId: string, userId: string) => {
            return apiRequest<ApiResponse<Document[]>>(
                `/documents/company/${companyId}/${userId}`
            );
        },

        /**
         * Get a document by ID
         */
        getById: async (id: string, userId: string) => {
            return apiRequest<ApiResponse<Document>>(
                `/documents/${id}/${userId}`
            );
        },

        /**
         * Create a new document
         */
        create: async (documentData: Partial<Document>, userId: string) => {
            return apiRequest<ApiResponse<Document>>(
                `/documents/${userId}`,
                "POST",
                documentData
            );
        },

        /**
         * Update a document
         */
        update: async (
            id: string,
            userId: string,
            documentData: Partial<Document>
        ) => {
            return apiRequest<ApiResponse<Document>>(
                `/documents/${id}/${userId}`,
                "PUT",
                documentData
            );
        },

        /**
         * Delete a document
         */
        delete: async (id: string, userId: string) => {
            return apiRequest<ApiResponse<void>>(
                `/documents/${id}/${userId}`,
                "DELETE"
            );
        },

        /**
         * Search documents by name
         */
        searchByName: async (
            companyId: string,
            name: string,
            userId: string
        ) => {
            return apiRequest<ApiResponse<Document[]>>(
                `/documents/search/${companyId}/${name}/${userId}`
            );
        },

        /**
         * Download a document
         */
        download: async (id: string, userId: string) => {
            return apiRequest<Blob>(`/documents/${id}/download/${userId}`);
        },

        /**
         * Share a document
         */
        share: async (
            id: string,
            userId: string,
            shareData: { email: string; expiresAt?: string }
        ) => {
            return apiRequest<ApiResponse<any>>(
                `/documents/${id}/share/${userId}`,
                "POST",
                shareData
            );
        },
    },

    stores: {
        /**
         * Get all stores for a company
         */
        getByCompany: async (companyId: string, userId: string) => {
            return apiRequest<ApiResponse<Store[]>>(
                `/stores/company/${companyId}/${userId}`
            );
        },

        /**
         * Get a store by ID
         */
        getById: async (id: string, userId: string) => {
            return apiRequest<ApiResponse<Store>>(`/stores/${id}/${userId}`);
        },

        /**
         * Create a new store
         */
        create: async (storeData: Partial<Store>, userId: string) => {
            return apiRequest<ApiResponse<Store>>(
                `/stores/${userId}`,
                "POST",
                storeData
            );
        },

        /**
         * Update a store
         */
        update: async (
            id: string,
            userId: string,
            storeData: Partial<Store>
        ) => {
            return apiRequest<ApiResponse<Store>>(
                `/stores/${id}/${userId}`,
                "PUT",
                storeData
            );
        },

        /**
         * Delete a store
         */
        delete: async (id: string, userId: string) => {
            return apiRequest<ApiResponse<void>>(
                `/stores/${id}/${userId}`,
                "DELETE"
            );
        },

        /**
         * Search stores by name
         */
        searchByName: async (
            companyId: string,
            name: string,
            userId: string
        ) => {
            return apiRequest<ApiResponse<Store[]>>(
                `/stores/search/${companyId}/${name}/${userId}`
            );
        },

        /**
         * Get store locations
         */
        /* getLocations: async (id: string, userId: string) => {
      return apiRequest<ApiResponse<StoreLocation[]>>(`/stores/${id}/locations/${userId}`)
    }, */

        /**
         * Add a store location
         */
        /* addLocation: async (id: string, userId: string, locationData: Partial<StoreLocation>) => {
      return apiRequest<ApiResponse<StoreLocation>>(`/stores/${id}/locations/${userId}`, "POST", locationData)
    }, */

        /**
         * Update a store location
         */
        /* updateLocation: async (
      storeId: string,
      locationId: string,
      userId: string,
      locationData: Partial<StoreLocation>,
    ) => {
      return apiRequest<ApiResponse<StoreLocation>>(
        `/stores/${storeId}/locations/${locationId}/${userId}`,
        "PUT",
        locationData,
      )
    }, */

        /**
         * Delete a store location
         */
        deleteLocation: async (
            storeId: string,
            locationId: string,
            userId: string
        ) => {
            return apiRequest<ApiResponse<void>>(
                `/stores/${storeId}/locations/${locationId}/${userId}`,
                "DELETE"
            );
        },
    },

    items: {
        /**
         * Get all items for a company
         */
        getByCompany: async (companyId: string, userId: string) => {
            return apiRequest<ApiResponse<Item[]>>(
                `/items/company/${companyId}/${userId}`
            );
        },

        /**
         * Get an item by ID
         */
        getById: async (id: string, userId: string) => {
            return apiRequest<ApiResponse<Item>>(`/items/${id}/${userId}`);
        },

        /**
         * Create a new item
         */
        create: async (itemData: Partial<Item>, userId: string) => {
            return apiRequest<ApiResponse<Item>>(
                `/items/${userId}`,
                "POST",
                itemData
            );
        },

        /**
         * Update an item
         */
        update: async (id: string, userId: string, itemData: Partial<Item>) => {
            return apiRequest<ApiResponse<Item>>(
                `/items/${id}/${userId}`,
                "PUT",
                itemData
            );
        },

        /**
         * Delete an item
         */
        delete: async (id: string, userId: string) => {
            return apiRequest<ApiResponse<void>>(
                `/items/${id}/${userId}`,
                "DELETE"
            );
        },

        /**
         * Search items by name
         */
        searchByName: async (
            companyId: string,
            name: string,
            userId: string
        ) => {
            return apiRequest<ApiResponse<Item[]>>(
                `/items/search/${companyId}/${name}/${userId}`
            );
        },

        /**
         * Get item categories
         */
        /* getCategories: async (companyId: string, userId: string) => {
      return apiRequest<ApiResponse<ItemCategory[]>>(`/items/categories/${companyId}/${userId}`)
    }, */

        /**
         * Create an item category
         */
        /* createCategory: async (companyId: string, userId: string, categoryData: Partial<ItemCategory>) => {
      return apiRequest<ApiResponse<ItemCategory>>(`/items/categories/${companyId}/${userId}`, "POST", categoryData)
    }, */

        /**
         * Update an item category
         */
        /* updateCategory: async (categoryId: string, userId: string, categoryData: Partial<ItemCategory>) => {
      return apiRequest<ApiResponse<ItemCategory>>(`/items/categories/${categoryId}/${userId}`, "PUT", categoryData)
    }, */

        /**
         * Delete an item category
         */
        deleteCategory: async (categoryId: string, userId: string) => {
            return apiRequest<ApiResponse<void>>(
                `/items/categories/${categoryId}/${userId}`,
                "DELETE"
            );
        },

        /**
         * Get item variants
         */
        /* getVariants: async (itemId: string, userId: string) => {
      return apiRequest<ApiResponse<ItemVariant[]>>(`/items/${itemId}/variants/${userId}`)
    }, */

        /**
         * Add an item variant
         */
        /* addVariant: async (itemId: string, userId: string, variantData: Partial<ItemVariant>) => {
      return apiRequest<ApiResponse<ItemVariant>>(`/items/${itemId}/variants/${userId}`, "POST", variantData)
    }, */

        /**
         * Update an item variant
         */
        /* updateVariant: async (itemId: string, variantId: string, userId: string, variantData: Partial<ItemVariant>) => {
      return apiRequest<ApiResponse<ItemVariant>>(
        `/items/${itemId}/variants/${variantId}/${userId}`,
        "PUT",
        variantData,
      )
    }, */

        /**
         * Delete an item variant
         */
        deleteVariant: async (
            itemId: string,
            variantId: string,
            userId: string
        ) => {
            return apiRequest<ApiResponse<void>>(
                `/items/${itemId}/variants/${variantId}/${userId}`,
                "DELETE"
            );
        },
    },

    orders: {
        /**
         * Get all orders for a company
         */
        getByCompany: async (companyId: string, userId: string) => {
            return apiRequest<ApiResponse<Order[]>>(
                `/orders/company/${companyId}/${userId}`
            );
        },

        /**
         * Get an order by ID
         */
        getById: async (id: string, userId: string) => {
            return apiRequest<ApiResponse<Order>>(`/orders/${id}/${userId}`);
        },

        /**
         * Create a new order
         */
        create: async (orderData: Partial<Order>, userId: string) => {
            return apiRequest<ApiResponse<Order>>(
                `/orders/${userId}`,
                "POST",
                orderData
            );
        },

        /**
         * Update an order
         */
        update: async (
            id: string,
            userId: string,
            orderData: Partial<Order>
        ) => {
            return apiRequest<ApiResponse<Order>>(
                `/orders/${id}/${userId}`,
                "PUT",
                orderData
            );
        },

        /**
         * Delete an order
         */
        delete: async (id: string, userId: string) => {
            return apiRequest<ApiResponse<void>>(
                `/orders/${id}/${userId}`,
                "DELETE"
            );
        },

        /**
         * Update order status
         */
        /* updateStatus: async (id: string, userId: string, status: OrderStatus) => {
      return apiRequest<ApiResponse<Order>>(`/orders/${id}/status/${userId}`, "PUT", { status })
    }, */

        /**
         * Get orders by customer
         */
        getByCustomer: async (customerId: string, userId: string) => {
            return apiRequest<ApiResponse<Order[]>>(
                `/orders/customer/${customerId}/${userId}`
            );
        },

        /**
         * Get orders by status
         */
        /* getByStatus: async (companyId: string, status: OrderStatus, userId: string) => {
      return apiRequest<ApiResponse<Order[]>>(`/orders/status/${companyId}/${status}/${userId}`)
    }, */

        /**
         * Generate invoice from order
         */
        generateInvoice: async (id: string, userId: string) => {
            return apiRequest<ApiResponse<any>>(
                `/orders/${id}/invoice/${userId}`,
                "POST"
            );
        },

        /**
         * Process payment for order
         */
        processPayment: async (
            id: string,
            userId: string,
            paymentData: any
        ) => {
            return apiRequest<ApiResponse<any>>(
                `/orders/${id}/payment/${userId}`,
                "POST",
                paymentData
            );
        },
    },

    calendar: {
        /**
         * Get all calendar events for a company
         */
        getByCompany: async (companyId: string, userId: string) => {
            return apiRequest<ApiResponse<CalendarEvent[]>>(
                `/calendar/company/${companyId}/${userId}`
            );
        },

        /**
         * Get a calendar event by ID
         */
        getById: async (id: string, userId: string) => {
            return apiRequest<ApiResponse<CalendarEvent>>(
                `/calendar/${id}/${userId}`
            );
        },

        /**
         * Create a new calendar event
         */
        create: async (eventData: Partial<CalendarEvent>, userId: string) => {
            return apiRequest<ApiResponse<CalendarEvent>>(
                `/calendar/${userId}`,
                "POST",
                eventData
            );
        },

        /**
         * Update a calendar event
         */
        update: async (
            id: string,
            userId: string,
            eventData: Partial<CalendarEvent>
        ) => {
            return apiRequest<ApiResponse<CalendarEvent>>(
                `/calendar/${id}/${userId}`,
                "PUT",
                eventData
            );
        },

        /**
         * Delete a calendar event
         */
        delete: async (id: string, userId: string) => {
            return apiRequest<ApiResponse<void>>(
                `/calendar/${id}/${userId}`,
                "DELETE"
            );
        },

        /**
         * Respond to a calendar event invitation
         */
        /* respondToInvitation: async (id: string, userId: string, status: EventStatus) => {
      return apiRequest<ApiResponse<CalendarEvent>>(`/calendar/${id}/respond/${userId}`, "POST", { status })
    }, */

        /**
         * Get events by date range
         */
        getByDateRange: async (
            companyId: string,
            userId: string,
            startDate: string,
            endDate: string
        ) => {
            return apiRequest<ApiResponse<CalendarEvent[]>>(
                `/calendar/range/${companyId}/${userId}?startDate=${startDate}&endDate=${endDate}`
            );
        },

        /**
         * Add attendee to event
         */
        /* addAttendee: async (id: string, userId: string, attendeeData: Partial<EventAttendee>) => {
      return apiRequest<ApiResponse<CalendarEvent>>(`/calendar/${id}/attendees/${userId}`, "POST", attendeeData)
    }, */

        /**
         * Remove attendee from event
         */
        removeAttendee: async (
            id: string,
            attendeeId: string,
            userId: string
        ) => {
            return apiRequest<ApiResponse<CalendarEvent>>(
                `/calendar/${id}/attendees/${attendeeId}/${userId}`,
                "DELETE"
            );
        },

        /**
         * Add reminder to event
         */
        /* addReminder: async (id: string, userId: string, reminderData: Partial<EventReminder>) => {
      return apiRequest<ApiResponse<CalendarEvent>>(`/calendar/${id}/reminders/${userId}`, "POST", reminderData)
    }, */

        /**
         * Remove reminder from event
         */
        removeReminder: async (
            id: string,
            reminderId: string,
            userId: string
        ) => {
            return apiRequest<ApiResponse<CalendarEvent>>(
                `/calendar/${id}/reminders/${reminderId}/${userId}`,
                "DELETE"
            );
        },
    },

    multiCurrency: {
        /**
         * Get all supported currencies
         */
        getSupportedCurrencies: async (userId: string) => {
            return apiRequest<ApiResponse<Currency[]>>(`/currencies/${userId}`);
        },

        /**
         * Get exchange rates
         */
        getExchangeRates: async (userId: string, baseCurrency: Currency) => {
            return apiRequest<ApiResponse<Record<string, number>>>(
                `/currencies/rates/${userId}/${baseCurrency}`
            );
        },

        /**
         * Convert amount between currencies
         */
        convertCurrency: async (
            userId: string,
            fromCurrency: Currency,
            toCurrency: Currency,
            amount: number
        ) => {
            return apiRequest<ApiResponse<{ amount: number; rate: number }>>(
                `/currencies/convert/${userId}`,
                "POST",
                {
                    fromCurrency,
                    toCurrency,
                    amount,
                }
            );
        },

        /**
         * Update company currency settings
         */
        updateCompanyCurrencySettings: async (
            companyId: string,
            userId: string,
            settings: {
                defaultCurrency: Currency;
                enabledCurrencies: Currency[];
            }
        ) => {
            return apiRequest<ApiResponse<any>>(
                `/currencies/settings/${companyId}/${userId}`,
                "PUT",
                settings
            );
        },

        /**
         * Get historical exchange rates
         */
        getHistoricalRates: async (
            userId: string,
            baseCurrency: Currency,
            date: string
        ) => {
            return apiRequest<ApiResponse<Record<string, number>>>(
                `/currencies/historical/${userId}/${baseCurrency}/${date}`
            );
        },
    },

    teams: {
        /**
         * Get all teams for a company
         */
        /* getByCompany: async (companyId: string, userId: string) => {
      return apiRequest<ApiResponse<Team[]>>(`/teams/company/${companyId}/${userId}`)
    },
 */
        /**
         * Get a team by ID
         */
        /* getById: async (id: string, userId: string) => {
      return apiRequest<ApiResponse<Team>>(`/teams/${id}/${userId}`)
    }, */

        /**
         * Create a new team
         */
        /* create: async (teamData: Partial<Team>, userId: string) => {
      return apiRequest<ApiResponse<Team>>(`/teams/${userId}`, "POST", teamData)
    }, */

        /**
         * Update a team
         */
        /* update: async (id: string, userId: string, teamData: Partial<Team>) => {
      return apiRequest<ApiResponse<Team>>(`/teams/${id}/${userId}`, "PUT", teamData)
    }, */

        /**
         * Delete a team
         */
        delete: async (id: string, userId: string) => {
            return apiRequest<ApiResponse<void>>(
                `/teams/${id}/${userId}`,
                "DELETE"
            );
        },

        /**
         * Add member to team
         */
        /* addMember: async (id: string, userId: string, memberData: Partial<TeamMember>) => {
      return apiRequest<ApiResponse<Team>>(`/teams/${id}/members/${userId}`, "POST", memberData)
    }, */

        /**
         * Remove member from team
         */
        /* removeMember: async (id: string, memberId: string, userId: string) => {
      return apiRequest<ApiResponse<Team>>(`/teams/${id}/members/${memberId}/${userId}`, "DELETE")
    }, */

        /**
         * Update member role in team
         */
        /* updateMemberRole: async (id: string, memberId: string, userId: string, role: Role) => {
      return apiRequest<ApiResponse<Team>>(`/teams/${id}/members/${memberId}/role/${userId}`, "PUT", { role })
    }, */
    },
};

// Export the business API
export default businessApi;
