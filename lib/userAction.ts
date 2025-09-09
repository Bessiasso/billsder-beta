import api from "@/services";
import { ApiResponse } from "@/services/api-types";
import {
    User as typeUser,
    Company as typeCompany,
    Employee as typeEmployee,
    Item as typeItem,
    Role as typeRole,
} from "@/services/api-types";

export const createItem = async (itemData: any, userId: string) => {
    try {
        const response: ApiResponse<typeItem> = await api.business.items.create(
            itemData,
            userId
        );
        if (response.success) {
            return response;
        }
    } catch (error) {
        return null;
    }
};

export const updateItem = async (
    itemId: string,
    userId: string,
    itemData: typeItem
) => {
    try {
        const response: ApiResponse<typeItem> = await api.business.items.update(
            itemId,
            userId,
            itemData
        );
        if (response.success) {
            return response;
        }
    } catch (error) {
        return null;
    }
};

export const deleteItem = async (itemId: string, userId: string) => {
    try {
        const response: ApiResponse<void> = await api.business.items.delete(
            itemId,
            userId
        );
        if (response.success) {
            return response;
        }
    } catch (error) {
        return null;
    }
};

export const deleteExistingImage = async (imageUrl: string) => {
    try {
        const response = await fetch("/api/upload/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: imageUrl }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(
                error.error ||
                    "Une erreur est survenue lors de la suppression de l'image"
            );
        }

        return true;
    } catch (error) {
        console.error(
            "Erreur lors de la suppression de l'image existante:",
            error
        );
        return false;
    }
};

export const deleteSupplier = async (supplierId: string, userId: string) => {
    try {
        const response: ApiResponse<void> = await api.business.suppliers.delete(
            supplierId,
            userId
        );
        if (response.success) {
            return response;
        }
    } catch (error) {
        return null;
    }
};
