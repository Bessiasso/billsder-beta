export const  getEstimatedDurationInHoursDays = (
    durationInMinutes: number
): string => {
    if (durationInMinutes <= 0) return "0 minutes";
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    let result = "";
    if (days > 0) {
        result += `${days} day${days > 1 ? "s" : ""}`;
    }
    if (remainingHours > 0) {
        if (result) result += ", ";
        result += `${remainingHours} hour${remainingHours > 1 ? "s" : ""}`;
    }
    if (minutes > 0) {
        if (result) result += ", ";
        result += `${minutes} minute${minutes > 1 ? "s" : ""}`;
    }
    return result || "0 minutes";
};