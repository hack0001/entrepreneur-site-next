import { useContext, useEffect } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import QuizLayout from "@components/Layouts/QuizLayout";
import prodGetRequest from "@components/apiRequest/prodGetRequest";
import QuickViewLoading from "@components/Loading/Layouts/QuizLoadingLayout";
import parseUrl from "@components/helper/parseUrl";
import { quizQuery } from "@data/queryData/querys";
import Context from "@utils/Context";
import { queryHandler, getParams, constructQuizUrl } from "@utils/queryHandler";

const Questions = ({
	individual,
	headline,
	quiz,
	slide,
	questionId,
	url,
	quizId,
	category,
	score,
}) => {
	const router = useRouter();
	const { handleState, sessionQuizIds } = useContext(Context);
	if (parseUrl(router.asPath)) {
		Cookie.set("CPC", JSON.stringify(true), {
			expires: 0.25,
		});
	}

	if (!individual || !headline || !quiz || !slide) return <QuickViewLoading />;

	useEffect(() => {
		const { urlPath, queryParams } = getParams(
			router.asPath ? router.asPath : "",
		);
		handleState({
			query: { utm_medium: "DING DONG" },
			currentUrlPath: urlPath,
		});
		const tempQuizCookie = Cookie.get("temp-quiz-session")
			? JSON.parse(Cookie.get("temp-quiz-session"))
			: false;
		if (!tempQuizCookie) {
			if (questionId === "opening") {
				Cookie.set("temp-quiz-session", JSON.stringify(true));
			} else if (questionId !== "opening") {
				const pushUrl = constructQuizUrl(
					`/${category}/${url}/quiz/${quizId}/questions/opening`,
					queryParams,
				);

				router.push(pushUrl);
			}
		} else if (tempQuizCookie) {
			if (questionId === "closing") {
				Cookie.remove("temp-quiz-session");
			} else if (questionId !== "opening") {
				if (process.env.NODE_ENV !== "development") {
					const pushTempUrl = constructQuizUrl(
						`/${category}/${url}/quiz/${quizId}/questions/opening`,
						queryParams,
					);
					router.push(pushTempUrl);
				}
			}
		}
	}, []);

	useEffect(() => {
		let sessionViews = [];

		if (quizId) {
			sessionViews = sessionQuizIds
				.filter(x => quizId !== x.id)
				.concat({ id: quizId });
		}

		const { urlPath, queryParams } = getParams(
			router.asPath ? router.asPath : "",
		);
		const queryUpdate = queryHandler(queryParams);
		handleState({
			sessionQuizIds: sessionViews,
			query: queryUpdate,
			currentUrlPath: urlPath,
		});
	}, [quizId]);

	useEffect(() => {
		const { urlPath, queryParams } = getParams(
			router.asPath ? router.asPath : "",
		);
		const queryUpdate = queryHandler(queryParams);
		handleState({
			query: queryUpdate,
			currentUrlPath: urlPath,
		});
	}, [questionId]);

	return (
		<QuizLayout
			individual={individual.data.getProductionQuiz}
			headline={headline.data.listProductionArticles}
			// latest={headlineCache.data.listProductionArticles}
			quiz={quiz.data.listProductionQuizs}
			slide={slide.data.listProductionSlideshows}
			id={quizId}
			position={questionId}
			url={url}
			score={Number(score)}
		/>
	);
};

export async function getStaticProps(context) {
	const { category, questionId, url, quizId, score } = context.params;
	const scoreCheck = score ? score : null;
	// Fetch data from external API
	const QUIZ_QUERY = `/content/indiv_quiz/${quizId}`;

	const [individual, headline, quiz, slide] = await Promise.all(
		[QUIZ_QUERY, ...quizQuery].map(endpoint => prodGetRequest(endpoint)),
	);

	return {
		props: {
			individual,
			headline,
			quiz,
			slide,
			questionId,
			url,
			quizId,
			category,
			score: scoreCheck,
		},
		// Next.js will attempt to re-generate the page:
		// - When a request comes in
		// - At most once every second
		revalidate: 18000, // In seconds
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

export default Questions;
