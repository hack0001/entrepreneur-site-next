export const cleanSpaceUnderscore = value => {
	if (typeof value === "string") {
		return value
			.trim()
			.replace(/[^a-zA-Z0-9]/g, " ")
			.replace(/\s\s+/g, " ")
			.replace(/\s/g, "_")
			.toLowerCase();
	}
};
