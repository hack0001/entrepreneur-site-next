export const newImageUrl = originalImagePath => {
	const startsWith = originalImagePath.charAt(0) === "/" ? "" : "/";
	const cloudfrontUrl = `${process.env.CLOUDFRONT_IMAGE_DOMAIN}${startsWith}${originalImagePath}`;
	return cloudfrontUrl;
};

export const getImagePath = longImageUrl => {
	return longImageUrl.replace(/^.*\/\/[^\/]+/, "");
};

function removeEmpty(obj) {
	return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
}
//returns a new object rather than using delete which overwrites existing object
export const clean = obj =>
	Object.fromEntries(
		Object.entries(obj)
			.filter(([k, v]) => v != null)
			.map(([k, v]) => (typeof v === "object" ? [k, removeEmpty(v)] : [k, v])),
	);
