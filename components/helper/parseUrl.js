const parseUrlQuery = url => {
	const query = url.split("?");
	let utmCheck = false;
	if (query[1]) {
		const utm = query[1].split("&");
		let utmObj = {};
		for (let i in utm) {
			const [keyval, val] = utm[i].split("=");
			utmObj[keyval] = val;
		}
		if (utmObj.utm_source) {
			switch (utmObj.utm_source) {
				case "outbrain":
				case "Outbrain":
				case "taboola":
				case "Taboola":
				case "revContent":
				case "revcontent":
				case "contentad":
				case "contentAd":
					utmCheck = true;
				default:
					utmCheck = false;
			}
		}
	}
	return utmCheck;
};

export default parseUrlQuery;
