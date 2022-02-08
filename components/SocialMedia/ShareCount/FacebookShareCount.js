import shareCountFactory from "../utils/shareCountFactory";

const getFacebookShareCount = async (shareUrl, callback) => {
	//Using a Permanent Facebook Token
	const endpoint = `https://graph.facebook.com/?id=${shareUrl}&fields=engagement&access_token=EAAHCkg0g64MBAHEvOM00X1InZCTN2C205k1hvGvDT4uCXODiz9UHWsX06v7LrbBZA0BMwQuZCjzVCXTE5wRhBNyIar1OCHkRDW6LVlktOYOi1u68hYUXZBPEAvagPhm5MufpVhjwhAzFZAVdrZBG2xmuDRctz5EhtcWZCJGGZBCOMZBphZA4zeEYPo53Ni3rpuuebkQm4VriTCfQZDZD`;

	try {
		const data = await fetch(endpoint, {
			method: "GET",
			headers: {
				Accept: "application/json",
			},
		});

		const facebookData = await data.text();
		const finalData = JSON.parse(facebookData);
		callback(
			finalData && finalData.engagement && finalData.engagement.share_count
				? finalData.engagement.share_count
				: undefined,
		);
	} catch (err) {
		console.log("Error", err);
	}
};

export default shareCountFactory(getFacebookShareCount);
