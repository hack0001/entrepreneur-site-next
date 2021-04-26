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
				case "ob":
				case "taboola":
				case "Taboola":
				case "tb":
				case "revContent":
				case "revcontent":
				case "rev":
				case "contentad":
				case "contentAd":
				case "facebook":
				case "fb":
				case "Facebook":
				case "Pinterest":
				case "pinterest":
					return true;
				default:
					return false;
			}
		}
	}
	return utmCheck;
};

export default parseUrlQuery;
