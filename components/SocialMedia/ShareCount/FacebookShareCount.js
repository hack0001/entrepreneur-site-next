import shareCountFactory from "../utils/shareCountFactory";

const getFacebookShareCount = async (shareUrl, callback) => {
	//Using a Permanent Facebook Token
	const endpoint = `https://graph.facebook.com/?id=${shareUrl}&fields=engagement&access_token=EAAHCkg0g64MBAGmGaghMP427BaIXwgOdt2CTnTex4ToppzpUpgJZCAZCz8XXirOlGXL3Y1NfLU72NQkoEZCZB04xZBTOzLl5iB3R3QxGCCfytzLu7AAZATtb2ZA0CDjRBU8aCHflbqcvGZCPyqOniUUwQBkcZAqQA44zWT5ko48sh9kE4OOQjK2PIoBE0ZBRSLamk05ZAjaTPWCMwZDZD`;

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
