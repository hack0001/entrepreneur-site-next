import { QUIZ, SLIDE, HEADLINES, LATEST } from "../../graphql/headline";
// Fetch data from external API

export const HEADLINE_QUERY = {
	query: HEADLINES,
	variables: {
		filter: { mainHeadline: true },
		limit: 4,
		id: process.env.REACT_APP_SITE_ID,
	},
	operationName: "ListProductionArticles",
};
export const LATEST_QUERY = {
	query: LATEST,
	variables: {
		limit: 14,
		id: process.env.REACT_APP_SITE_ID,
	},
	operationName: "ListProductionArticles",
};
export const QUIZ_QUERY = {
	query: QUIZ,
	variables: {
		filter: { mainHeadline: true },
		limit: 5,
		id: process.env.REACT_APP_SITE_ID,
	},
	operationName: "ListProductionQuizs",
};
export const SLIDE_LONGFORM_QUERY = {
	query: SLIDE,
	variables: {
		limit: 5,
		id: process.env.REACT_APP_SITE_ID,
	},
	operationName: "ListProductionSlideshows",
};

export const MOTIVATION_QUERY = {
	query: HEADLINES,
	variables: {
		filter: { category: "motivation" },
		id: process.env.REACT_APP_SITE_ID,
	},
	operationName: "ListProductionArticles",
};

export const BUSINESS_QUERY = {
	query: HEADLINES,
	variables: {
		filter: { category: "business" },
		id: process.env.REACT_APP_SITE_ID,
	},
	operationName: "ListProductionArticles",
};

export const PEOPLE_QUERY = {
	query: HEADLINES,
	variables: {
		filter: { category: "people" },
		id: process.env.REACT_APP_SITE_ID,
	},
	operationName: "ListProductionArticles",
};

export const QUOTE_QUERY = {
	query: HEADLINES,
	variables: {
		filter: { category: "quotes" },
		id: process.env.REACT_APP_SITE_ID,
	},
	operationName: "ListProductionArticles",
};

export const ENTERTAINMENT_QUERY = {
	query: HEADLINES,
	variables: {
		filter: { category: "business" },
		id: process.env.REACT_APP_SITE_ID,
	},
	operationName: "ListProductionArticles",
};

export const CASE_STUDY_QUERY = {
	query: HEADLINES,
	variables: {
		filter: { category: "business" },
		id: process.env.REACT_APP_SITE_ID,
	},
	operationName: "ListProductionArticles",
};

export const NET_WORTH_QUERY = {
	query: HEADLINES,
	variables: {
		filter: { category: "net-worth" },
		id: process.env.REACT_APP_SITE_ID,
	},
	operationName: "ListProductionArticles",
};
