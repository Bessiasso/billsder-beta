/**
 * API Client Index
 * Exports all API modules for easy import
 */

//import financeApi from "./finance"
//import analyticsApi from "./analytics"
//import commerceApi from "./commerce"
import { systemApi } from "./system";
import { businessApi } from "./business"

// Export all API modules
export {
    //financeApi,
    //analyticsApi,
    //commerceApi,
    systemApi,
    businessApi
};

// Export default as a combined API object
const api = {
    //finance: financeApi,
    //analytics: analyticsApi,
    //commerce: commerceApi,
    system: systemApi,
    business: businessApi,
};

export default api;
