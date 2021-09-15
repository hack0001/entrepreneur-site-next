const querySelect = type => {
	switch (type) {
		case "article":
			return [`/list/latest`, "listProductionArticles"];
		case "quiz":
			return [`/list/quiz`, "listProductionQuizs"];
		case "slideshow":
			return [`/list/slideshow`, "listProductionSlideshows"];
		default:
			return null;
	}
};

export default querySelect;
