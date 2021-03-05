import { clean } from "../components/helper/imageUrlHelper";
const queryHandler = queryData => {
	if (Object.keys(queryData).length > 0) {
		const {
			utm_content,
			utm_medium,
			utm_source,
			utm_cpc,
			utm_campaign,
			utm_term,
		} = queryData;
		const queryUpdate = clean({
			utm_content,
			utm_medium,
			utm_source,
			utm_cpc,
			utm_campaign,
			utm_term,
		});

		return queryUpdate;
	} else {
		return {};
	}
};

const getParams = url => {
	if (url.length > 1) {
		return {
			urlPath: url.split("?")[0],
			queryParams: Object.fromEntries(new URLSearchParams(url.split("?")[1])),
		};
	} else {
		return {
			urlPath: "",
			queryParams: {},
		};
	}
};

const objectCheck = params => {
	return Object.keys(params).length > 0 ? true : false;
};

const constructQuizUrl = (baseurl, query) => {
	if (Object.keys(query).length > 0) {
		const nilScoreQuery = { ...query, score: 0 };
		const queryString = new URLSearchParams(nilScoreQuery).toString();
		return `${baseurl}?${queryString}`;
	} else {
		return `${baseurl}`;
	}
};

export { queryHandler, getParams, objectCheck, constructQuizUrl };
