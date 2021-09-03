import { useContext, useEffect } from "react";
import MainHeadlineLayout from "../components/Layouts/MainHeadlineLayout";
import MainHeadlineLoading from "../components/Loading/Layouts/MainHeadlineLoadingLayout";
import prodRequest from "../components/apiRequest/prodRequest";
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

export async function getStaticProps(sh) {
	const [headline, latest, quiz, slide] = await Promise.all(
		mainHeadlineQuery.map(query =>
			prodRequest({
				query: query.query,
				variables: query.variables,
				operationName: query.operationName,
			}),
		),
	);
	return {
		props: { headline, latest, quiz, slide },
		// Next.js will attempt to re-generate the page:
		// - When a request comes in
		// - At most once every second
		revalidate: 3600, // In seconds
	};
}

// This function gets called at build time
// export async function getStaticPaths() {
// 	// Call an external API endpoint to get posts
// 	// const res = await fetch('https://.../posts')
// 	// const posts = await res.json()

// 	// // Get the paths we want to pre-render based on posts
// 	// const paths = posts.map((post) => ({
// 	//   params: { id: post.id },
// 	// }))

// 	// We'll pre-render only these paths at build time.
// 	// { fallback: false } means other routes should 404.
// 	return { paths: [], fallback: true };
// }

// This gets called on every request
// export async function getServerSideProps(context) {
// 	context.res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate");

// 	const [headline, latest, quiz, slide] = await Promise.all(
// 		mainHeadlineQuery.map(query =>
// 			prodRequest({
// 				query: query.query,
// 				variables: query.variables,
// 				operationName: query.operationName,
// 			}),
// 		),
// 	);

// 	// Pass data to the page via props
// 	return { props: { headline, latest, quiz, slide } };
// }

export default Home;
