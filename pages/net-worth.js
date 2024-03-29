import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import HeadlineLayout from "../components/Layouts/HeadlineLayout";
import MainHeadlineLoading from "../components/Loading/Layouts/MainHeadlineLoadingLayout";
import prodGetRequest from "@components/apiRequest/prodGetRequest";
import { networthHeadlineQuery } from "../data/queryData/querys";
import Context from "@utils/Context";
import { queryHandler, getParams } from "@utils/queryHandler";

const NetWorth = ({ headline, quiz, slide }) => {
	const router = useRouter();
	const { handleState, query } = useContext(Context);
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
			title="Net-Worth"
			pageTitle="Net-Worth"
			canonical="net-worth"
		/>
	);
};

export async function getStaticProps() {
	const [headline, quiz, slide] = await Promise.all(
		networthHeadlineQuery.map(endpoint => prodGetRequest(endpoint)),
	);
	return {
		props: { headline, quiz, slide },
		// Next.js will attempt to re-generate the page:
		// - When a request comes in
		// - At most once every second
		revalidate: 10800, // In seconds
	};
}

export default NetWorth;
