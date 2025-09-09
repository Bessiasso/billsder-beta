import api from "@/services";
import { ApiResponse, Supplier } from "@/services/api-types";
import {
    User as typeUser,
    Company as typeCompany,
    Employee as typeEmployee,
    Item as typeItem,
    Role as typeRole,
} from "@/services/api-types";
import { useSession } from "next-auth/react";
import { decodeEntityId } from "@/lib/hashIds";

type SessionUser = {
    id: string;
    username: string;
    email: string;
    id_role: string;
    id_company: string;
    id_employee: string;
    id_state: string;
};

export const useSessionData = () => {
    const { data: session } = useSession();
    if (!session) {
        return null;
    }
    return session.user as SessionUser;
};

/**
 * Utility to decode an entity ID and always return a string objectId or null.
 */
export function getObjectIdFromEntityId(entityId: string): string | null {
    const decoded = decodeEntityId(entityId);
    if (typeof decoded === "string") return decoded;
    if (decoded && typeof decoded.objectId === "string")
        return decoded.objectId;
    return null;
}

export const fetchUserData = async (userId: string) => {
    /* const objectId = getObjectIdFromEntityId(userId);
    if (!objectId) {
        return null;
    } */
    try {
        const response: ApiResponse<typeUser> = await api.system.users.getById(
            userId
        );
        if (response.success) {
            const userData = response.data;
            return userData;
        }
    } catch (error) {
        return null;
    }
};

export const fetchEmployeeData = async (employeeId: string, userId: string) => {
    try {
        const response: ApiResponse<typeEmployee> =
            await api.business.employees.getById(employeeId, userId);
        if (response.success) {
            const employeeData = response.data;
            return employeeData;
        }
    } catch (error) {
        return null;
    }
};

export const fetchCompanyData = async (companyId: string, userId: string) => {
    try {
        const response: ApiResponse<typeCompany> =
            await api.business.companies.getById(companyId, userId);
        if (response.success) {
            const companyData = response.data;
            return companyData;
        }
    } catch (error) {
        return null;
    }
};

export const fetchCompanyProducts = async (
    companyId: string,
    userId: string
) => {
    const companyObjectId = getObjectIdFromEntityId(companyId);
    if (!companyObjectId) {
        return null;
    }
    const userObjectId = getObjectIdFromEntityId(userId);
    if (!userObjectId) {
        return null;
    }
    try {
        const responnse: ApiResponse<typeItem[]> =
            await api.business.items.getByCompany(
                companyObjectId,
                userObjectId
            );
        if (responnse.success) {
            const companyProducts = responnse.data;
            return companyProducts;
        }
    } catch (error) {
        return null;
    }
};

export const fetchRole = async (idRole: string, userId: string) => {
    try {
        const response: ApiResponse<typeRole> = await api.system.roles.getById(
            idRole,
            userId
        );
        if (response.success) {
            const roleData = response.data;
            return roleData;
        }
    } catch (error) {
        return null;
    }
};

export const fetchItemById = async (idItem: string, userId: string) => {
    const objectId = getObjectIdFromEntityId(idItem);
    if (!objectId) {
        return null;
    }
    try {
        const response: ApiResponse<typeItem> =
            await api.business.items.getById(objectId, userId);
        if (response.success) {
            const itemData = response.data;
            return itemData;
        }
    } catch (error) {
        return null;
    }
};

export const fetchSuppliersByCompany = async (
    company_id: string,
    userId: string
) => {
    try {
        const response: ApiResponse<Supplier[]> =
            await api.business.suppliers.getByCompany(company_id, userId);
        if (response.success) {
            const suppliersData = response.data;
            return suppliersData;
        }
    } catch (error) {
        return null;
    }
};

export const fetchSupplierById = async (supplierId: string, userId: string) => {
    const objectId = getObjectIdFromEntityId(supplierId);
    if (!objectId) {
        console.error("Invalid id:", supplierId);
        return null;
    }
    try {
        const response: ApiResponse<Supplier> =
            await api.business.suppliers.getById(objectId, userId);
        if (response.success) {
            const supplierData = response.data;
            return supplierData;
        }
    } catch (error) {
        return null;
    }

}

export const fetchPlan = async (idPlan: string) => {};

