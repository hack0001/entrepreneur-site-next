import { useContext, useEffect } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import ArticleLayout from "@components/Layouts/ArticleLayout";
import prodGetRequest from "@components/apiRequest/prodGetRequest";
import ArticleLoading from "@components/Loading/Layouts/ArticleLoadingLayout";
import parseUrl from "@components/helper/parseUrl";
import { articleQuery } from "@data/queryData/querys";
import Context from "@utils/Context";
import { queryHandler, getParams } from "@utils/queryHandler";

const Article = ({ individual, quiz, slide, id, category, url }) => {
	const router = useRouter();
	const { handleState, sessionArticleIds } = useContext(Context);
	if (parseUrl(router.asPath)) {
		Cookie.set("CPC", JSON.stringify(true), {
			expires: 0.25,
		});
	}

	if (!individual || !quiz || !slide) return <ArticleLoading />;

	useEffect(() => {
		let sessionViews = [];

		if (id) {
			sessionViews = sessionArticleIds
				.filter(x => id !== x.id)
				.concat({ id: id });
		}

		handleState({
			sessionArticleIds: sessionViews,
			currentUrlPath: router.asPath ? router.asPath : "",
		});
	}, [id]);

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
		<ArticleLayout
			id={id}
			individual={individual.data.getProductionArticle}
			quiz={quiz.data.listProductionQuizs}
			slide={slide.data.listProductionSlideshows}
			url={url}
		/>
	);
};

export async function getStaticProps(context) {
	// Fetch data from external API
	const { id, category, url } = context.params;
	const ARTICLE_QUERY = `/content/indiv_article/${id}`;

	const [individual, quiz, slide] = await Promise.all(
		[ARTICLE_QUERY, ...articleQuery].map(endpoint => prodGetRequest(endpoint)),
	);

	return {
		props: { individual, quiz, slide, id, category, url },
		// Next.js will attempt to re-generate the page:
		// - When a request comes in
		// - At most once every second
		revalidate: 18000, // In seconds (every 5 hours)
	};
}

// This function gets called at build time
export async function getStaticPaths() {
	// Call an external API endpoint to get posts
	// const res = await fetch('https://.../posts')
	// const posts = await res.json()

	// // Get the paths we want to pre-render based on posts
	// const paths = posts.map((post) => ({
	//   params: { id: post.id },
	// }))

	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return { paths: [], fallback: "blocking" };
}

export default Article;
