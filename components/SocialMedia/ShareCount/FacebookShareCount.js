const GetFacebookShareCount = async url => {
	//Using a Permanent Facebook Token
	const cloudFrontDist = `${
		process.env.CLOUDFRONT_SHARE_URL_ENDPOINT
	}/${encodeURIComponent(JSON.stringify(url))}`;

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

		return shareCountNumber;
	} catch (err) {
		console.log("Error", err);
		return err;
	}
};

export default GetFacebookShareCount;
