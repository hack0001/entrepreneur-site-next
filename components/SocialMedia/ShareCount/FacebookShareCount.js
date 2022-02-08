import shareCountFactory from "../utils/shareCountFactory";

const getFacebookShareCount = async (shareUrl, callback) => {
	//Using a Permanent Facebook Token
	const endpoint = `https://graph.facebook.com/?id=${shareUrl}&fields=engagement&access_token=EAAHCkg0g64MBAHGyVwgaotgLtBEeAyKqXnCsUCFrO980FaZBcWaqnrIppR0fOHS9HAQeZATy7eWyNzQkPgErDAJ88y0niIWOArhOuLqapihnDwhcuGJqWL40MBkFbp9YLINyhdoPWd2JjjDjWudTHHneFZASchHS4v7WSqZBylk3PKqPN0SYzkuaNHtX4AAfZCwqQZAxPAkgZDZD`;

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
