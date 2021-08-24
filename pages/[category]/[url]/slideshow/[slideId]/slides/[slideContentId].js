import { useContext, useEffect } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import SlideLayout from "@components/Layouts/SlideShowLayout";
import SlideLoading from "@components/Loading/Layouts/SlideShowLoading";
import prodRequest from "@components/apiRequest/prodRequest";
import parseUrl from "@components/helper/parseUrl";
import { SLIDESHOW } from "@graphql/indivSlideShow";
import { slideShowQuery } from "@data/queryData/querys";
import Context from "@utils/Context";
import { queryHandler, getParams } from "@utils/queryHandler";

const Slide = ({
	individual,
	headline,
	quiz,
	slide,
	url,
	slideId,
	slideContentId,
	query,
}) => {
	const router = useRouter();
	const { handleState, sessionSlideIds } = useContext(Context);

	if (parseUrl(router.asPath)) {
		Cookie.set("CPC", JSON.stringify(true), {
			expires: 0.25,
		});
	}

	if (!individual || !headline || !quiz || !slide) return <SlideLoading />;

	useEffect(() => {
		let sessionViews = [];
		if (slideId) {
			sessionViews = sessionSlideIds
				.filter(x => slideId !== x.id)
				.concat({ id: slideId });
		}

		const { urlPath, queryParams } = getParams(
			router.asPath ? router.asPath : "",
		);
		const queryUpdate = queryHandler(queryParams);

		handleState({
			sessionSlideIds: sessionViews,
			query: queryUpdate,
			currentUrlPath: urlPath,
		});
	}, [slideId]);

	useEffect(() => {
		const { urlPath, queryParams } = getParams(
			router.asPath ? router.asPath : "",
		);
		const queryUpdate = queryHandler(queryParams);
		handleState({
			query: queryUpdate,
			currentUrlPath: urlPath,
		});
	}, [slideContentId]);

	const numSlides =
		individual && individual.data && individual.data.getProductionSlideshow
			? individual.data.getProductionSlideshow.numSlides
			: "1000";
	const positionCheck =
		Number(slideContentId) > Number(numSlides) ? "closing" : slideContentId;

	return (
		<SlideLayout
			individual={individual.data.getProductionSlideshow}
			headline={headline.data.listProductionArticles}
			latest={headline.data.listProductionArticles}
			quiz={quiz.data.listProductionQuizs}
			slide={slide.data.listProductionSlideshows}
			id={slideId}
			position={positionCheck}
			url={url}
		/>
	);
};

export async function getStaticProps(context) {
	const { url, slideId, slideContentId } = context.params;
	// Fetch data from external API
	const SLIDESHOW_QUERY = {
		query: SLIDESHOW,
		variables: { id: slideId },
		operationName: "GetProductionSlideshow",
	};

	const [individual, headline, quiz, slide] = await Promise.all(
		[SLIDESHOW_QUERY, ...slideShowQuery].map(query =>
			prodRequest({
				query: query.query,
				variables: query.variables,
				operationName: query.operationName,
			}),
		),
	);

	return {
		props: {
			individual,
			headline,
			quiz,
			slide,
			url,
			slideId,
			slideContentId,
			query: context.query ? context.query : {},
		},
		// Next.js will attempt to re-generate the page:
		// - When a request comes in
		// - At most once every second
		revalidate: 10, // In seconds
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
	return { paths: [], fallback: true };
}
export default Slide;
