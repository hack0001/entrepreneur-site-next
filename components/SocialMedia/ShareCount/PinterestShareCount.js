import objectToGetParams from "../utils/objectToGetParams";

const getPinterestShareCount = async url => {
	const endpoint = `https://api.pinterest.com/v1/urls/count.json`;
	try {
		const data = await fetch(endpoint + objectToGetParams({ url }), {
			method: "GET",
			headers: {
				Accept: "application/json",
			},
		});
		const pinterestData = await data.text();
		const pinCount = JSON.parse(
			pinterestData.replace(/receiveCount/i, "").replace(/[()]/g, ""),
		);
		return pinCount.count ? pinCount.count : undefined;
	} catch (err) {
		console.log("Error", err);
		return err;
	}
};

export default getPinterestShareCount;
