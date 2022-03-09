import shareCountFactory from "../utils/shareCountFactory";

const getFacebookShareCount = async (shareUrl, callback) => {
	//Using a Permanent Facebook Token
	const cloudFrontDist = `${
		process.env.CLOUDFRONT_SHARE_URL_ENDPOINT
	}/${encodeURIComponent(JSON.stringify(shareUrl))}`;

	try {
		const data = await fetch(cloudFrontDist, {
			method: "GET",
			headers: {
				Accept: "application/json",
			},
		});
		const finalData = await data.json();
		const shareCountNumber =
			finalData && finalData.engagement && finalData.engagement.share_count
				? finalData.engagement.share_count
				: undefined;
		callback(shareCountNumber > 10 ? shareCountNumber : 26);
	} catch (err) {
		console.log("Error", err);
	}
};

export default shareCountFactory(getFacebookShareCount);
