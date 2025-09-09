/**
 * System API Client
 * This file provides typed functions to interact with system-related backend API endpoints
 */

// Import types
import type {
    User,
    Role,
    Notification,
    ApiResponse,
    //SystemSettings,
    Log,
    //Permission,
} from "./api-types";

// Base API configuration
const API_BASE_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4242/api";

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

// System API endpoints
export const systemApi = {
    // ===== AUTHENTICATION =====
    auth: {
        /**
         * Login a user
         */
        login: async (email: string, password: string) => {
            return apiRequest<ApiResponse<{ token: string; user: User }>>(
                "/auth/login",
                "POST",
                { email, password }
            );
        },

        /**
         * Register a new user
         */
        register: async (userData: {
            email: string;
            password: string;
            name: string;
        }) => {
            return apiRequest<ApiResponse<{ token: string; user: User }>>(
                "/auth/register",
                "POST",
                userData
            );
        },

        /**
         * Request a password reset
         */
        forgotPassword: async (email: string) => {
            return apiRequest<ApiResponse<void>>(
                "/auth/forgot-password",
                "POST",
                { email }
            );
        },

        /**
         * Reset a password with token
         */
        resetPassword: async (token: string, newPassword: string) => {
            return apiRequest<ApiResponse<void>>(
                "/auth/reset-password",
                "POST",
                { token, newPassword }
            );
        },

        /**
         * Verify a user's email
         */
        verifyEmail: async (token: string) => {
            return apiRequest<ApiResponse<void>>("/auth/verify-email", "POST", {
                token,
            });
        },

        /**
         * Refresh the authentication token
         */
        refreshToken: async () => {
            return apiRequest<ApiResponse<{ token: string }>>(
                "/auth/refresh-token",
                "POST"
            );
        },

        /**
         * Logout the current user
         */
        logout: async () => {
            try {
                const response = await apiRequest<ApiResponse<void>>(
                    "/auth/logout",
                    "POST"
                );
                localStorage.removeItem("token");
                return response;
            } catch (error) {
                localStorage.removeItem("token");
                throw error;
            }
        },

        /**
         * Get the current user profile
         */
        getProfile: async () => {
            return apiRequest<User>("/auth/profile", "GET");
        },

        /**
         * Update the current user profile
         */
        updateProfile: async (profileData: Partial<User>) => {
            return apiRequest<ApiResponse<User>>(
                "/auth/profile",
                "PUT",
                profileData
            );
        },

        /**
         * Change the current user's password
         */
        changePassword: async (
            currentPassword: string,
            newPassword: string
        ) => {
            return apiRequest<ApiResponse<void>>(
                "/auth/change-password",
                "POST",
                { currentPassword, newPassword }
            );
        },

        /**
         * Request a new verification email
         */
        resendVerificationEmail: async (email: string) => {
            return apiRequest<ApiResponse<void>>(
                "/auth/resend-verification",
                "POST",
                { email }
            );
        },

        /**
         * Login with a social provider
         */
        socialLogin: async (
            provider: "google" | "facebook" | "apple",
            token: string
        ) => {
            return apiRequest<ApiResponse<{ token: string; user: User }>>(
                `/auth/social/${provider}`,
                "POST",
                { token }
            );
        },

        /**
         * Generate a one-time password (OTP)
         */
        generateOtp: async (email: string) => {
            return apiRequest<ApiResponse<void>>("/auth/generate-otp", "POST", {
                email,
            });
        },

        /**
         * Verify a one-time password (OTP)
         */
        verifyOtp: async (email: string, otp: string) => {
            return apiRequest<ApiResponse<{ token: string; user: User }>>(
                "/auth/verify-otp",
                "POST",
                { email, otp }
            );
        },

        /**
         * Validate authentication token
         */
        validateToken: async (token: string) => {
            return apiRequest<ApiResponse<{ valid: boolean }>>(
                "/auth/validate-token",
                "POST",
                { token }
            );
        },

        /**
         * Get authentication status
         */
        getAuthStatus: async () => {
            return apiRequest<
                ApiResponse<{ isAuthenticated: boolean; user?: User }>
            >("/auth/status", "GET");
        },

        /**
         * Impersonate a user (admin only)
         */
        impersonateUser: async (userId: string) => {
            return apiRequest<ApiResponse<{ token: string; user: User }>>(
                "/auth/impersonate",
                "POST",
                { userId }
            );
        },

        /**
         * End impersonation and return to original user
         */
        endImpersonation: async () => {
            return apiRequest<ApiResponse<{ token: string; user: User }>>(
                "/auth/end-impersonation",
                "POST"
            );
        },
    },

    // ===== USER MANAGEMENT =====
    users: {
        /**
         * Get all users
         */
        getAll: async () => {
            return apiRequest<User[]>("/users", "GET");
        },

        /**
         * Get a user by ID
         */
        getById: async (id: string) => {
            return apiRequest<ApiResponse<User>>(`/users/${id}`, "GET");
        },

        /**
         * Verify if a username exists
         */
        verifyUsername: async (username: string) => {
            return apiRequest<{ isAvailable: boolean }>(
                `/users/verify-username/${username}/`,
                "GET"
            );
        },

        /**
         * Create a new user
         */
        create: async (userData: Partial<User>) => {
            return apiRequest<ApiResponse<User>>("/users", "POST", userData);
        },

        /**
         * Update a user by ID
         */
        update: async (id: string, userData: Partial<User>) => {
            return apiRequest<ApiResponse<User>>(
                `/users/${id}`,
                "PUT",
                userData
            );
        },

        /**
         * Delete a user by ID
         */
        delete: async (id: string) => {
            return apiRequest<ApiResponse<void>>(`/users/${id}`, "DELETE");
        },

        /**
         * Get a user by email
         */
        getByEmail: async (email: string) => {
            return apiRequest<User>(`/users/email/${email}`, "GET");
        },

        /**
         * Get a user by email (POST method)
         */
        getUserByEmail: async (email: string) => {
            return apiRequest<ApiResponse<User>>("/users/email", "POST", {
                email,
            });
        },

        /**
         * Register an OTP for a user
         */
        registerOtp: async (email: string, otp: string) => {
            return apiRequest<ApiResponse<void>>(
                "/users/otp/register",
                "POST",
                { email, otp }
            );
        },

        /**
         * Verify an OTP for a user
         */
        verifyOtp: async (email: string, otp: string) => {
            return apiRequest<ApiResponse<void>>("/users/otp/verify", "POST", {
                email,
                otp,
            });
        },

        /**
         * Get user activity logs
         */
        getActivityLogs: async (userId: string, page = 1, limit = 20) => {
            return apiRequest<
                ApiResponse<{ logs: Log[]; total: number; pages: number }>
            >(`/users/${userId}/activity?page=${page}&limit=${limit}`, "GET");
        },

        /**
         * Get user permissions
         */
        /* getPermissions: async (userId: string) => {
            return apiRequest<Permission[]>(
                `/users/${userId}/permissions`,
                "GET"
            );
        }, */

        /**
         * Update user status (active/inactive)
         */
        updateStatus: async (userId: string, status: "active" | "inactive") => {
            return apiRequest<ApiResponse<User>>(
                `/users/${userId}/status`,
                "PUT",
                { status }
            );
        },

        /**
         * Assign roles to a user
         */
        assignRoles: async (userId: string, roleIds: string[]) => {
            return apiRequest<ApiResponse<User>>(
                `/users/${userId}/roles`,
                "POST",
                { roleIds }
            );
        },

        /**
         * Remove roles from a user
         */
        removeRoles: async (userId: string, roleIds: string[]) => {
            return apiRequest<ApiResponse<User>>(
                `/users/${userId}/roles`,
                "DELETE",
                { roleIds }
            );
        },

        /**
         * Get users by role
         */
        getByRole: async (roleId: string) => {
            return apiRequest<User[]>(`/users/role/${roleId}`, "GET");
        },

        /**
         * Search users
         */
        search: async (query: string) => {
            return apiRequest<User[]>(
                `/users/search?q=${encodeURIComponent(query)}`,
                "GET"
            );
        },

        /**
         * Upload user avatar
         */
        uploadAvatar: async (userId: string, formData: FormData) => {
            return apiRequest<ApiResponse<{ avatarUrl: string }>>(
                `/users/${userId}/avatar`,
                "POST",
                formData,
                undefined,
                true // isFormData
            );
        },

        /**
         * Delete user avatar
         */
        deleteAvatar: async (userId: string) => {
            return apiRequest<ApiResponse<void>>(
                `/users/${userId}/avatar`,
                "DELETE"
            );
        },

        /**
         * Get user preferences
         */
        getPreferences: async (userId: string) => {
            return apiRequest<any>(`/users/${userId}/preferences`, "GET");
        },

        /**
         * Update user preferences
         */
        updatePreferences: async (userId: string, preferences: any) => {
            return apiRequest<ApiResponse<any>>(
                `/users/${userId}/preferences`,
                "PUT",
                preferences
            );
        },

        /**
         * Get user companies
         */
        getCompanies: async (userId: string) => {
            return apiRequest<any[]>(`/users/${userId}/companies`, "GET");
        },

        /**
         * Set default company for user
         */
        setDefaultCompany: async (userId: string, companyId: string) => {
            return apiRequest<ApiResponse<User>>(
                `/users/${userId}/default-company`,
                "PUT",
                { companyId }
            );
        },

        /**
         * Get user sessions
         */
        getSessions: async (userId: string) => {
            return apiRequest<any[]>(`/users/${userId}/sessions`, "GET");
        },

        /**
         * Terminate user session
         */
        terminateSession: async (userId: string, sessionId: string) => {
            return apiRequest<ApiResponse<void>>(
                `/users/${userId}/sessions/${sessionId}`,
                "DELETE"
            );
        },

        /**
         * Terminate all user sessions except current
         */
        terminateAllSessions: async (userId: string) => {
            return apiRequest<ApiResponse<void>>(
                `/users/${userId}/sessions`,
                "DELETE"
            );
        },

        /**
         * Enable two-factor authentication
         */
        enableTwoFactor: async (userId: string) => {
            return apiRequest<ApiResponse<{ secret: string; qrCode: string }>>(
                `/users/${userId}/two-factor/enable`,
                "POST"
            );
        },

        /**
         * Verify and activate two-factor authentication
         */
        verifyTwoFactor: async (userId: string, token: string) => {
            return apiRequest<ApiResponse<{ backupCodes: string[] }>>(
                `/users/${userId}/two-factor/verify`,
                "POST",
                { token }
            );
        },

        /**
         * Disable two-factor authentication
         */
        disableTwoFactor: async (userId: string, password: string) => {
            return apiRequest<ApiResponse<void>>(
                `/users/${userId}/two-factor/disable`,
                "POST",
                { password }
            );
        },

        /**
         * Generate new backup codes for two-factor authentication
         */
        generateBackupCodes: async (userId: string, password: string) => {
            return apiRequest<ApiResponse<{ backupCodes: string[] }>>(
                `/users/${userId}/two-factor/backup-codes`,
                "POST",
                {
                    password,
                }
            );
        },
    },

    // ===== ROLE MANAGEMENT =====
    roles: {
        /**
         * Get all roles
         */
        getAll: async (userId: string) => {
            return apiRequest<Role[]>(`/roles/${userId}`, "GET");
        },

        /**
         * Get a role by ID
         */
        getById: async (id: string, userId: string) => {
            return apiRequest<ApiResponse<Role>>(
                `/roles/${id}/${userId}`,
                "GET"
            );
        },

        /**
         * Create a new role
         */
        create: async (roleData: {
            name: string;
            permissions: string[];
            userId: string;
        }) => {
            return apiRequest<ApiResponse<Role>>("/roles", "POST", roleData);
        },

        /**
         * Update a role
         */
        update: async (id: string, userId: string, updates: any) => {
            return apiRequest<ApiResponse<Role>>(
                `/roles/${id}/${userId}`,
                "PUT",
                updates
            );
        },

        /**
         * Delete a role
         */
        delete: async (id: string, userId: string) => {
            return apiRequest<ApiResponse<void>>(
                `/roles/${id}/${userId}`,
                "DELETE"
            );
        },

        /**
         * Get all available permissions
         */
        /* getAllPermissions: async (userId: string) => {
            return apiRequest<Permission[]>(
                `/roles/permissions/${userId}`,
                "GET"
            );
        }, */

        /**
         * Get permissions by role
         */
        /* getPermissionsByRole: async (roleId: string, userId: string) => {
            return apiRequest<Permission[]>(
                `/roles/${roleId}/${userId}/permissions`,
                "GET"
            );
        }, */

        /**
         * Assign permissions to a role
         */
        assignPermissions: async (
            roleId: string,
            userId: string,
            permissionIds: string[]
        ) => {
            return apiRequest<ApiResponse<Role>>(
                `/roles/${roleId}/${userId}/permissions`,
                "POST",
                { permissionIds }
            );
        },

        /**
         * Remove permissions from a role
         */
        removePermissions: async (
            roleId: string,
            userId: string,
            permissionIds: string[]
        ) => {
            return apiRequest<ApiResponse<Role>>(
                `/roles/${roleId}/${userId}/permissions`,
                "DELETE",
                { permissionIds }
            );
        },

        /**
         * Get roles by permission
         */
        getRolesByPermission: async (permissionId: string, userId: string) => {
            return apiRequest<Role[]>(
                `/roles/permission/${permissionId}/${userId}`,
                "GET"
            );
        },

        /**
         * Clone a role
         */
        cloneRole: async (
            roleId: string,
            userId: string,
            newRoleName: string
        ) => {
            return apiRequest<ApiResponse<Role>>(
                `/roles/${roleId}/${userId}/clone`,
                "POST",
                { name: newRoleName }
            );
        },

        /**
         * Get role users
         */
        getRoleUsers: async (roleId: string, userId: string) => {
            return apiRequest<User[]>(
                `/roles/${roleId}/${userId}/users`,
                "GET"
            );
        },

        /**
         * Get role hierarchy
         */
        getRoleHierarchy: async (userId: string) => {
            return apiRequest<any>(`/roles/hierarchy/${userId}`, "GET");
        },

        /**
         * Update role hierarchy
         */
        updateRoleHierarchy: async (userId: string, hierarchyData: any) => {
            return apiRequest<ApiResponse<any>>(
                `/roles/hierarchy/${userId}`,
                "PUT",
                hierarchyData
            );
        },

        /**
         * Get role by name
         */
        getRoleByName: async (name: string, userId: string) => {
            return apiRequest<Role>(`/roles/name/${name}/${userId}`, "GET");
        },
    },

    // ===== NOTIFICATION MANAGEMENT =====
    notifications: {
        /**
         * Get all notifications for a user
         */
        getByUser: async (userId: string) => {
            return apiRequest<Notification[]>(
                `/notifications/${userId}`,
                "GET"
            );
        },

        /**
         * Create a new notification
         */
        create: async (
            userId: string,
            notificationData: Partial<Notification>
        ) => {
            return apiRequest<ApiResponse<Notification>>(
                `/notifications/${userId}`,
                "POST",
                notificationData
            );
        },

        /**
         * Mark a notification as read
         */
        markAsRead: async (id: string, userId: string) => {
            return apiRequest<ApiResponse<Notification>>(
                `/notifications/${id}/${userId}/read`,
                "PUT"
            );
        },

        /**
         * Delete a notification
         */
        delete: async (id: string, userId: string) => {
            return apiRequest<ApiResponse<void>>(
                `/notifications/${id}/${userId}`,
                "DELETE"
            );
        },

        /**
         * Delete all notifications for a user
         */
        deleteAllByUser: async (userId: string, currentUserId: string) => {
            return apiRequest<ApiResponse<void>>(
                `/notifications/user/${userId}/${currentUserId}`,
                "DELETE"
            );
        },

        /**
         * Mark all notifications as read
         */
        markAllAsRead: async (userId: string) => {
            return apiRequest<ApiResponse<void>>(
                `/notifications/${userId}/read-all`,
                "PUT"
            );
        },

        /**
         * Archive a notification
         */
        archive: async (id: string, userId: string) => {
            return apiRequest<ApiResponse<Notification>>(
                `/notifications/${id}/${userId}/archive`,
                "PUT"
            );
        },

        /**
         * Get unread notification count
         */
        getUnreadCount: async (userId: string) => {
            return apiRequest<{ count: number }>(
                `/notifications/${userId}/unread-count`,
                "GET"
            );
        },

        /**
         * Get notifications by type
         */
        getByType: async (userId: string, type: string) => {
            return apiRequest<Notification[]>(
                `/notifications/${userId}/type/${type}`,
                "GET"
            );
        },

        /**
         * Get notifications by priority
         */
        getByPriority: async (
            userId: string,
            priority: "low" | "medium" | "high"
        ) => {
            return apiRequest<Notification[]>(
                `/notifications/${userId}/priority/${priority}`,
                "GET"
            );
        },

        /**
         * Update notification settings
         */
        updateSettings: async (
            userId: string,
            settings: {
                email: boolean;
                push: boolean;
                sms: boolean;
                inApp: boolean;
            }
        ) => {
            return apiRequest<ApiResponse<any>>(
                `/notifications/${userId}/settings`,
                "PUT",
                settings
            );
        },

        /**
         * Get notification settings
         */
        getSettings: async (userId: string) => {
            return apiRequest<any>(`/notifications/${userId}/settings`, "GET");
        },

        /**
         * Subscribe to notification channel
         */
        subscribeToChannel: async (userId: string, channelId: string) => {
            return apiRequest<ApiResponse<void>>(
                `/notifications/${userId}/channels/subscribe`,
                "POST",
                { channelId }
            );
        },

        /**
         * Unsubscribe from notification channel
         */
        unsubscribeFromChannel: async (userId: string, channelId: string) => {
            return apiRequest<ApiResponse<void>>(
                `/notifications/${userId}/channels/unsubscribe`,
                "POST",
                { channelId }
            );
        },

        /**
         * Get user notification channels
         */
        getChannels: async (userId: string) => {
            return apiRequest<any[]>(
                `/notifications/${userId}/channels`,
                "GET"
            );
        },
    },

    // ===== OFFLINE MODE =====
    offline: {
        /**
         * Generate offline data
         */
        generateData: async (userId: string, modules: string[]) => {
            return apiRequest<ApiResponse<any>>(
                `/offline/${userId}/generate`,
                "POST",
                { modules }
            );
        },

        /**
         * Sync offline data
         */
        syncData: async (userId: string, offlineChanges: any) => {
            return apiRequest<ApiResponse<any>>(
                `/offline/${userId}/sync`,
                "POST",
                { offlineChanges }
            );
        },

        /**
         * Check for updates
         */
        checkForUpdates: async (userId: string, lastSyncTimestamp: number) => {
            return apiRequest<ApiResponse<any>>(
                `/offline/${userId}/check-updates?lastSyncTimestamp=${lastSyncTimestamp}`,
                "GET"
            );
        },

        /**
         * Get offline configuration
         */
        getConfiguration: async (userId: string) => {
            return apiRequest<any>(`/offline/${userId}/configuration`, "GET");
        },

        /**
         * Update offline configuration
         */
        updateConfiguration: async (userId: string, config: any) => {
            return apiRequest<ApiResponse<any>>(
                `/offline/${userId}/configuration`,
                "PUT",
                config
            );
        },

        /**
         * Clear offline data
         */
        clearData: async (userId: string) => {
            return apiRequest<ApiResponse<void>>(
                `/offline/${userId}/data`,
                "DELETE"
            );
        },

        /**
         * Get offline sync status
         */
        getSyncStatus: async (userId: string) => {
            return apiRequest<any>(`/offline/${userId}/sync-status`, "GET");
        },

        /**
         * Reset sync status
         */
        resetSyncStatus: async (userId: string) => {
            return apiRequest<ApiResponse<void>>(
                `/offline/${userId}/reset-sync`,
                "POST"
            );
        },
    },

    // ===== MOBILE NOTIFICATIONS =====
    mobileNotifications: {
        /**
         * Register a device for mobile notifications
         */
        registerDevice: async (
            userId: string,
            deviceData: {
                deviceToken: string;
                deviceType: string;
                deviceName?: string;
            }
        ) => {
            return apiRequest<ApiResponse<any>>(
                `/mobile-notifications/${userId}/register-device`,
                "POST",
                deviceData
            );
        },

        /**
         * Unregister a device for mobile notifications
         */
        unregisterDevice: async (userId: string, deviceToken: string) => {
            return apiRequest<ApiResponse<any>>(
                `/mobile-notifications/${userId}/unregister-device`,
                "POST",
                { deviceToken }
            );
        },

        /**
         * Configure notification preferences
         */
        configurePreferences: async (userId: string, preferences: any) => {
            return apiRequest<ApiResponse<any>>(
                `/mobile-notifications/${userId}/preferences`,
                "POST",
                { preferences }
            );
        },

        /**
         * Send a test notification
         */
        sendTestNotification: async (userId: string) => {
            return apiRequest<ApiResponse<any>>(
                `/mobile-notifications/${userId}/test`,
                "POST"
            );
        },

        /**
         * Get registered devices
         */
        getDevices: async (userId: string) => {
            return apiRequest<any[]>(
                `/mobile-notifications/${userId}/devices`,
                "GET"
            );
        },

        /**
         * Update device information
         */
        updateDevice: async (
            userId: string,
            deviceToken: string,
            updates: any
        ) => {
            return apiRequest<ApiResponse<any>>(
                `/mobile-notifications/${userId}/device/${deviceToken}`,
                "PUT",
                updates
            );
        },

        /**
         * Send a notification to a specific user
         */
        sendNotification: async (
            userId: string,
            notificationData: { title: string; body: string; data?: any }
        ) => {
            return apiRequest<ApiResponse<any>>(
                `/mobile-notifications/${userId}/send`,
                "POST",
                notificationData
            );
        },

        /**
         * Get notification history
         */
        getHistory: async (userId: string) => {
            return apiRequest<any[]>(
                `/mobile-notifications/${userId}/history`,
                "GET"
            );
        },

        /**
         * Delete notification history
         */
        clearHistory: async (userId: string) => {
            return apiRequest<ApiResponse<void>>(
                `/mobile-notifications/${userId}/history`,
                "DELETE"
            );
        },

        /**
         * Get notification templates
         */
        getTemplates: async (userId: string) => {
            return apiRequest<any[]>(
                `/mobile-notifications/${userId}/templates`,
                "GET"
            );
        },

        /**
         * Create notification template
         */
        createTemplate: async (userId: string, templateData: any) => {
            return apiRequest<ApiResponse<any>>(
                `/mobile-notifications/${userId}/templates`,
                "POST",
                templateData
            );
        },
    },

    // ===== SYSTEM SETTINGS =====
    settings: {
        /**
         * Get system settings
         */
        /* get: async () => {
            return apiRequest<SystemSettings>("/settings", "GET");
        }, */

        /**
         * Update system settings
         */
        /* update: async (settings: Partial<SystemSettings>) => {
            return apiRequest<ApiResponse<SystemSettings>>(
                "/settings",
                "PUT",
                settings
            );
        }, */

        /**
         * Get user settings
         */
        getUserSettings: async (userId: string) => {
            return apiRequest<any>(`/settings/user/${userId}`, "GET");
        },

        /**
         * Update user settings
         */
        updateUserSettings: async (userId: string, settings: any) => {
            return apiRequest<ApiResponse<any>>(
                `/settings/user/${userId}`,
                "PUT",
                settings
            );
        },

        /**
         * Reset user settings to default
         */
        resetUserSettings: async (userId: string) => {
            return apiRequest<ApiResponse<any>>(
                `/settings/user/${userId}/reset`,
                "POST"
            );
        },

        /**
         * Get company settings
         */
        getCompanySettings: async (companyId: string) => {
            return apiRequest<any>(`/settings/company/${companyId}`, "GET");
        },

        /**
         * Update company settings
         */
        updateCompanySettings: async (companyId: string, settings: any) => {
            return apiRequest<ApiResponse<any>>(
                `/settings/company/${companyId}`,
                "PUT",
                settings
            );
        },

        /**
         * Get feature flags
         */
        getFeatureFlags: async () => {
            return apiRequest<any>("/settings/feature-flags", "GET");
        },

        /**
         * Update feature flags
         */
        updateFeatureFlags: async (flags: any) => {
            return apiRequest<ApiResponse<any>>(
                "/settings/feature-flags",
                "PUT",
                flags
            );
        },

        /**
         * Get system appearance settings
         */
        getAppearance: async () => {
            return apiRequest<any>("/settings/appearance", "GET");
        },

        /**
         * Update system appearance settings
         */
        updateAppearance: async (appearanceSettings: any) => {
            return apiRequest<ApiResponse<any>>(
                "/settings/appearance",
                "PUT",
                appearanceSettings
            );
        },

        /**
         * Get system email templates
         */
        getEmailTemplates: async () => {
            return apiRequest<any[]>("/settings/email-templates", "GET");
        },

        /**
         * Update system email template
         */
        updateEmailTemplate: async (templateId: string, templateData: any) => {
            return apiRequest<ApiResponse<any>>(
                `/settings/email-templates/${templateId}`,
                "PUT",
                templateData
            );
        },
    },

    // ===== LOGS AND AUDIT =====
    logs: {
        /**
         * Get system logs
         */
        getSystemLogs: async (page = 1, limit = 50, level?: string) => {
            let url = `/logs/system?page=${page}&limit=${limit}`;
            if (level) {
                url += `&level=${level}`;
            }
            return apiRequest<{ logs: Log[]; total: number; pages: number }>(
                url,
                "GET"
            );
        },

        /**
         * Get audit logs
         */
        getAuditLogs: async (
            page = 1,
            limit = 50,
            userId?: string,
            action?: string
        ) => {
            let url = `/logs/audit?page=${page}&limit=${limit}`;
            if (userId) {
                url += `&userId=${userId}`;
            }
            if (action) {
                url += `&action=${action}`;
            }
            return apiRequest<{ logs: any[]; total: number; pages: number }>(
                url,
                "GET"
            );
        },

        /**
         * Get error logs
         */
        getErrorLogs: async (page = 1, limit = 50) => {
            return apiRequest<{ logs: Log[]; total: number; pages: number }>(
                `/logs/errors?page=${page}&limit=${limit}`,
                "GET"
            );
        },

        /**
         * Get access logs
         */
        getAccessLogs: async (page = 1, limit = 50, userId?: string) => {
            let url = `/logs/access?page=${page}&limit=${limit}`;
            if (userId) {
                url += `&userId=${userId}`;
            }
            return apiRequest<{ logs: any[]; total: number; pages: number }>(
                url,
                "GET"
            );
        },

        /**
         * Create a log entry
         */
        createLog: async (logData: {
            level: string;
            message: string;
            meta?: any;
        }) => {
            return apiRequest<ApiResponse<Log>>("/logs", "POST", logData);
        },

        /**
         * Search logs
         */
        searchLogs: async (
            query: string,
            logType: "system" | "audit" | "error" | "access" = "system",
            page = 1,
            limit = 50
        ) => {
            return apiRequest<{ logs: any[]; total: number; pages: number }>(
                `/logs/search?q=${encodeURIComponent(
                    query
                )}&type=${logType}&page=${page}&limit=${limit}`,
                "GET"
            );
        },

        /**
         * Export logs
         */
        exportLogs: async (
            logType: "system" | "audit" | "error" | "access" = "system",
            format: "csv" | "json" = "csv",
            filters?: any
        ) => {
            let url = `/logs/export?type=${logType}&format=${format}`;
            if (filters) {
                Object.entries(filters).forEach(([key, value]) => {
                    if (value !== undefined) {
                        url += `&${key}=${encodeURIComponent(String(value))}`;
                    }
                });
            }

            // For blob responses, we need to handle them differently
            const response = await fetch(`${API_BASE_URL}${url}`, {
                method: "GET",
                headers: createHeaders(),
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return response.blob();
        },

        /**
         * Get log statistics
         */
        getLogStats: async (
            logType: "system" | "audit" | "error" | "access" = "system",
            timeframe: "day" | "week" | "month" = "day"
        ) => {
            return apiRequest<any>(
                `/logs/stats?type=${logType}&timeframe=${timeframe}`,
                "GET"
            );
        },

        /**
         * Clear logs
         */
        clearLogs: async (
            logType: "system" | "audit" | "error" | "access" = "system",
            olderThan?: Date
        ) => {
            let url = `/logs/clear?type=${logType}`;
            if (olderThan) {
                url += `&olderThan=${olderThan.toISOString()}`;
            }
            return apiRequest<ApiResponse<{ count: number }>>(url, "DELETE");
        },
    },

    // ===== HEALTH AND MONITORING =====
    health: {
        /**
         * Get system health status
         */
        getStatus: async () => {
            return apiRequest<any>("/health", "GET");
        },

        /**
         * Get system metrics
         */
        getMetrics: async () => {
            return apiRequest<any>("/health/metrics", "GET");
        },

        /**
         * Get database status
         */
        getDatabaseStatus: async () => {
            return apiRequest<any>("/health/database", "GET");
        },

        /**
         * Get service status
         */
        getServiceStatus: async (service: string) => {
            return apiRequest<any>(`/health/service/${service}`, "GET");
        },

        /**
         * Run system diagnostics
         */
        runDiagnostics: async () => {
            return apiRequest<ApiResponse<any>>("/health/diagnostics", "POST");
        },

        /**
         * Get system information
         */
        getSystemInfo: async () => {
            return apiRequest<any>("/health/info", "GET");
        },

        /**
         * Get system performance metrics
         */
        getPerformanceMetrics: async (
            timeframe: "hour" | "day" | "week" | "month" = "day"
        ) => {
            return apiRequest<any>(
                `/health/performance?timeframe=${timeframe}`,
                "GET"
            );
        },

        /**
         * Get API usage statistics
         */
        getApiUsage: async (
            timeframe: "hour" | "day" | "week" | "month" = "day"
        ) => {
            return apiRequest<any>(
                `/health/api-usage?timeframe=${timeframe}`,
                "GET"
            );
        },

        /**
         * Get error rate statistics
         */
        getErrorRates: async (
            timeframe: "hour" | "day" | "week" | "month" = "day"
        ) => {
            return apiRequest<any>(
                `/health/error-rates?timeframe=${timeframe}`,
                "GET"
            );
        },
    },

    // ===== TEAMS =====
    teams: {
        /**
         * Add a member to a team
         */
        addMember: async (
            companyId: string,
            userId: string,
            email: string,
            role?: string
        ) => {
            return apiRequest<ApiResponse<any>>(
                `/teams/${companyId}/${userId}`,
                "POST",
                { email, role }
            );
        },

        /**
         * Remove a member from a team
         */
        removeMember: async (
            companyId: string,
            userId: string,
            memberId: string
        ) => {
            return apiRequest<ApiResponse<any>>(
                `/teams/${companyId}/${userId}/${memberId}`,
                "DELETE"
            );
        },

        /**
         * Update a member's role
         */
        updateMemberRole: async (
            companyId: string,
            userId: string,
            memberId: string,
            role: string
        ) => {
            return apiRequest<ApiResponse<any>>(
                `/teams/${companyId}/${userId}/${memberId}`,
                "PUT",
                { role }
            );
        },

        /**
         * Get all team members
         */
        getMembers: async (companyId: string, userId: string) => {
            return apiRequest<ApiResponse<any>>(
                `/teams/${companyId}/${userId}`,
                "GET"
            );
        },

        /**
         * Check team capacity
         */
        checkCapacity: async (companyId: string, userId: string) => {
            return apiRequest<ApiResponse<any>>(
                `/teams/capacity/${companyId}/${userId}`,
                "GET"
            );
        },

        /**
         * Invite a user to a team
         */
        inviteUser: async (
            companyId: string,
            userId: string,
            inviteData: { email: string; role: string; message?: string }
        ) => {
            return apiRequest<ApiResponse<any>>(
                `/teams/${companyId}/${userId}/invite`,
                "POST",
                inviteData
            );
        },

        /**
         * Accept a team invitation
         */
        acceptInvitation: async (invitationToken: string) => {
            return apiRequest<ApiResponse<any>>(
                `/teams/invitations/accept`,
                "POST",
                { token: invitationToken }
            );
        },

        /**
         * Reject a team invitation
         */
        rejectInvitation: async (invitationToken: string) => {
            return apiRequest<ApiResponse<any>>(
                `/teams/invitations/reject`,
                "POST",
                { token: invitationToken }
            );
        },

        /**
         * Get pending invitations
         */
        getPendingInvitations: async (companyId: string, userId: string) => {
            return apiRequest<any[]>(
                `/teams/${companyId}/${userId}/invitations`,
                "GET"
            );
        },

        /**
         * Cancel an invitation
         */
        cancelInvitation: async (
            companyId: string,
            userId: string,
            invitationId: string
        ) => {
            return apiRequest<ApiResponse<void>>(
                `/teams/${companyId}/${userId}/invitations/${invitationId}`,
                "DELETE"
            );
        },

        /**
         * Get team activity
         */
        getTeamActivity: async (
            companyId: string,
            userId: string,
            page = 1,
            limit = 20
        ) => {
            return apiRequest<{
                activities: any[];
                total: number;
                pages: number;
            }>(
                `/teams/${companyId}/${userId}/activity?page=${page}&limit=${limit}`,
                "GET"
            );
        },

        /**
         * Get team permissions
         */
        getTeamPermissions: async (companyId: string, userId: string) => {
            return apiRequest<any[]>(
                `/teams/${companyId}/${userId}/permissions`,
                "GET"
            );
        },

        /**
         * Update team permissions
         */
        updateTeamPermissions: async (
            companyId: string,
            userId: string,
            permissions: any
        ) => {
            return apiRequest<ApiResponse<any>>(
                `/teams/${companyId}/${userId}/permissions`,
                "PUT",
                permissions
            );
        },
    },

    // ===== BACKUP AND RESTORE =====
    backup: {
        /**
         * Create a backup
         */
        createBackup: async (
            userId: string,
            backupOptions: {
                includeFiles?: boolean;
                includeDatabase?: boolean;
                description?: string;
            }
        ) => {
            return apiRequest<ApiResponse<any>>(
                `/backup/${userId}`,
                "POST",
                backupOptions
            );
        },

        /**
         * Get all backups
         */
        getBackups: async (userId: string) => {
            return apiRequest<any[]>(`/backup/${userId}`, "GET");
        },

        /**
         * Restore from backup
         */
        restoreBackup: async (
            userId: string,
            backupId: string,
            restoreOptions: {
                restoreFiles?: boolean;
                restoreDatabase?: boolean;
            }
        ) => {
            return apiRequest<ApiResponse<any>>(
                `/backup/${userId}/restore/${backupId}`,
                "POST",
                restoreOptions
            );
        },

        /**
         * Delete a backup
         */
        deleteBackup: async (userId: string, backupId: string) => {
            return apiRequest<ApiResponse<void>>(
                `/backup/${userId}/${backupId}`,
                "DELETE"
            );
        },

        /**
         * Download a backup
         */
        downloadBackup: async (userId: string, backupId: string) => {
            // For blob responses, we need to handle them differently
            const response = await fetch(
                `${API_BASE_URL}/backup/${userId}/download/${backupId}`,
                {
                    method: "GET",
                    headers: createHeaders(),
                    credentials: "include",
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return response.blob();
        },

        /**
         * Schedule automatic backups
         */
        scheduleBackups: async (
            userId: string,
            schedule: {
                frequency: "daily" | "weekly" | "monthly";
                time?: string;
                day?: number;
                retention?: number;
            }
        ) => {
            return apiRequest<ApiResponse<any>>(
                `/backup/${userId}/schedule`,
                "POST",
                schedule
            );
        },

        /**
         * Get backup schedule
         */
        getBackupSchedule: async (userId: string) => {
            return apiRequest<any>(`/backup/${userId}/schedule`, "GET");
        },

        /**
         * Update backup schedule
         */
        updateBackupSchedule: async (
            userId: string,
            schedule: {
                frequency: "daily" | "weekly" | "monthly";
                time?: string;
                day?: number;
                retention?: number;
            }
        ) => {
            return apiRequest<ApiResponse<any>>(
                `/backup/${userId}/schedule`,
                "PUT",
                schedule
            );
        },

        /**
         * Disable scheduled backups
         */
        disableScheduledBackups: async (userId: string) => {
            return apiRequest<ApiResponse<void>>(
                `/backup/${userId}/schedule`,
                "DELETE"
            );
        },
    },
};

// Export the system API
export default systemApi;
