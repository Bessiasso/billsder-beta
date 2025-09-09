import { useEffect, useState } from "react";

const helloFetch = async (url: string): Promise<{ message: string } | null> => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

export default helloFetch;
