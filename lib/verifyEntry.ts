export async function checkUsernameAvailability(
    username: string
): Promise<boolean> {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!backendUrl) {
        throw new Error("Backend URL is not configured");
    }

    try {
        const response = await fetch(
            `${backendUrl}/users/verify-username/${username}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to check username availability");
        }

        const data = await response.json();
        return data.isAvailable;
    } catch (error) {
        console.error("Error checking username availability:", error);
        throw error;
    }
}
