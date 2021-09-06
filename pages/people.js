import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import HeadlineLayout from "../components/Layouts/HeadlineLayout";
import MainHeadlineLoading from "../components/Loading/Layouts/MainHeadlineLoadingLayout";
import { peopleHeadlineQuery } from "../data/queryData/querys";
import prodRequest from "../components/apiRequest/prodRequest";
import { HEADLINES } from "../graphql/headline";
import Context from "../utils/Context";
import { queryHandler, getParams } from "../utils/queryHandler";

const People = ({ headline, quiz, slide }) => {
	const router = useRouter();
	const { handleState } = useContext(Context);

	if (!headline || !quiz || !slide) return <MainHeadlineLoading />;

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

	return (
		<HeadlineLayout
			headline={headline.data.listProductionArticles}
			quiz={quiz.data.listProductionQuizs}
			slide={slide.data.listProductionSlideshows}
			title="People"
			pageTitle="People"
			canonical="people"
			latestNextToken={headline.data.listProductionArticles.nextToken}
			latestSortIndex={headline.data.listProductionArticles.sortIndex}
			nextQuery={HEADLINES}
			queryFilter={{ category: "people" }}
			queryOpName="ListProductionArticles"
			objectMarker="listProductionArticles"
		/>
	);
};

export async function getStaticProps() {
	const [headline, quiz, slide] = await Promise.all(
		peopleHeadlineQuery.map(query =>
			prodRequest({
				query: query.query,
				variables: query.variables,
				operationName: query.operationName,
			}),
		),
	);

	return {
		props: { headline, quiz, slide },
		// Next.js will attempt to re-generate the page:
		// - When a request comes in
		// - At most once every second
		revalidate: 10800, // In seconds
	};
}

export default People;
