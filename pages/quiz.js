import { useContext, useEffect } from "react";
import HeadlineLayout from "../components/Layouts/HeadlineLayout";
import MainHeadlineLoading from "../components/Loading/Layouts/MainHeadlineLoadingLayout";
import prodRequest from "../components/apiRequest/prodRequest";
import { quizHeadlineQuery } from "../data/queryData/querys";
import { useRouter } from "next/router";
import Context from "../utils/Context";
import { queryHandler, getParams } from "../utils/queryHandler";

const Quiz = ({ headline, quiz, slide }) => {
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
			title="Quiz"
			pageTitle="Quiz"
			canonical="quiz"
		/>
	);
};

export async function getStaticProps() {
	const [headline, quiz, slide] = await Promise.all(
		quizHeadlineQuery.map(query =>
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
		revalidate: 3600, // In seconds
	};
}

export default Quiz;
