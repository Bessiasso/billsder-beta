export const stripHTMLTags = (htmlString: string): string => {
    // also replaces <br> tags with new lines
    return htmlString.replace(/<br>/g, "\n").replace(/<[^>]+>/g, "");
};

/**
 * Replaces any instance of {{ variableName }} with the values
 * @param data The data object whose keys are the variable names (string) along with corresponding values
 * @param htmlString The HTML string to be updated
 * @return The updated HTML string
 */
export const replaceMergeTags = (
    data: Record<string, string | string[]>,
    htmlString: string
): string => {
    Object.keys(data)?.forEach((key) => {
        if (htmlString.includes(`{{ ${key} }}`)) {
            let val = data[key];

            // check if value is an array
            if (Array.isArray(val)) {
                const listElements = val.map((item) => {
                    return `<li>${item}</li>`;
                });

                // create an unordered list in HTML
                val = `<ul>${listElements.join("")}</ul>`;
            }

            const regexPattern = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, "g");
            htmlString = htmlString.replace(regexPattern, val as string);
        }
    });

    return htmlString;
};
