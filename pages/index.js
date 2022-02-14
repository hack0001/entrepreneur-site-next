import { useContext, useEffect } from "react";
import MainHeadlineLayout from "../components/Layouts/MainHeadlineLayout";
import MainHeadlineLoading from "../components/Loading/Layouts/MainHeadlineLoadingLayout";
import prodGetRequest from "@components/apiRequest/prodGetRequest";
import { filterUnique } from "../utils/handler";
import { mainHeadlineQuery } from "../data/queryData/querys";
import { useRouter } from "next/router";
import Context from "../utils/Context";
import { queryHandler, getParams } from "../utils/queryHandler";

const Home = ({ headline, latest, quiz, slide }) => {
	const router = useRouter();
	const { handleState } = useContext(Context);

	if (!headline || !latest || !quiz || !slide) return <MainHeadlineLoading />;

	useEffect(() => {
		const { urlPath, queryParams } = getParams(
			router.asPath ? router.asPath : "",
		);

		const queryUpdate = queryHandler(queryParams);
		handleState({
			query: queryUpdate,
			currentUrlPath: urlPath,
		});
	}, []);

	const newLatestArticles = filterUnique(
		latest.data.listProductionArticles.items,
		headline.data.listProductionArticles.items,
	);

	return (
		<MainHeadlineLayout
			headline={headline.data.listProductionArticles}
			latest={newLatestArticles}
			quiz={quiz.data.listProductionQuizs}
			slide={slide.data.listProductionSlideshows}
			title="WealthMack - Providing Business Motivation and Inspiration for those who want to be the Best version of themselves"
			pageTitle={"Latest"}
			canonical=""
			latestNextToken={latest.data.listProductionArticles.nextToken}
			latestSortIndex={latest.data.listProductionArticles.sortIndex}
		/>
	);
};

export async function getStaticProps() {
	const [headline, latest, quiz, slide] = await Promise.all(
		mainHeadlineQuery.map(endpoint => prodGetRequest(endpoint)),
	);
	return {
		props: { headline, latest, quiz, slide },
		// Next.js will attempt to re-generate the page:
		// - When a request comes in
		// - At most once every second
		revalidate: 10800, // In seconds
	};
}

export default Home;
