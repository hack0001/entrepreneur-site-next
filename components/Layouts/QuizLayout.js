import { useContext, useEffect, useState } from "react";
import Layout from "../Layouts/Layout";
import PropTypes from "prop-types";
import {
	SideBarContent,
	SideBarSmallContent,
	SectionBar,
	QuizComponent,
} from "../LayoutComponents";
import LazyLoad from "react-lazyload";
import styles from "./styles/contentLayout.module.sass";
import { ETORO_COPY_TRADER } from "../ads/code/eToro";
import dynamic from "next/dynamic";
import Context from "@utils/Context";
import { objectCheck } from "@utils/queryHandler";
import Cookie from "js-cookie";
import { filterUnique } from "@utils/handler";

const FacebookPage = dynamic(() => import("../SocialMedia/FacebookPage"), {
	ssr: false,
});
const Quiz = ({
	individual,
	headline,
	latest,
	quiz,
	slide,
	id,
	position,
	url,
	score,
}) => {
	const { query, currentUrlPath } = useContext(Context);
	const queryLinkCheck = objectCheck(query);
	const uniqueQuizContent = filterUnique(quiz.items, [{ id }]);
	const headlineData = individual.linkedArticle
		? [{ ...individual.linkedArticle, type: "article" }, ...uniqueQuizContent]
		: uniqueQuizContent;

	const typeMarker = "quiz";
	const [cpcMarker, setCpcMarker] = useState(false);

	useEffect(() => {
		const cpcMarker = Cookie.get("CPC") ? JSON.parse(Cookie.get("CPC")) : false;
		setCpcMarker(cpcMarker);
	}, []);

	return (
		<Layout>
			<main className={styles.articleContainer}>
				<article className={styles.articleSection}>
					<QuizComponent
						content={individual}
						position={position}
						nextQuiz={quiz}
						url={url}
						id={id}
						score={score}
						queryLinkCheck={queryLinkCheck}
						query={query}
						cpcMarker={cpcMarker}
						setCpcMarker={setCpcMarker}
					/>
				</article>
				<aside
					className={
						cpcMarker
							? styles.quickSideArticleSection
							: styles.sideArticleSection
					}
				>
					{!cpcMarker && (
						<div className={styles.sectionPadding}>
							<SectionBar title="Quiz" titleColor="#111" titleSize="1rem" />
						</div>
					)}

					{cpcMarker && (
						<div
							className={styles.sideContentWrapper}
							style={{ position: "sticky", top: 50 }}
						>
							<SideBarContent
								data={headlineData}
								type={typeMarker}
								showAd={false}
								queryLinkCheck={true}
								query={{ ...query, utm_medium: "sidebar-quiz" }}
								currentUrlPath={currentUrlPath}
								showArticles={!cpcMarker}
							/>

							<div className={styles.sectionPadding}>
								<SectionBar
									title="Popular"
									titleColor="#111"
									titleSize="1rem"
								/>
							</div>
							<SideBarSmallContent
								data={slide.items}
								type="slideshow"
								showAd={false}
								adCode={ETORO_COPY_TRADER}
								queryLinkCheck={true}
								query={{ ...query, utm_medium: "sidebarsmall-quiz" }}
								currentUrlPath={currentUrlPath}
							/>
							<LazyLoad once={true}>
								<FacebookPage />
							</LazyLoad>
						</div>
					)}
					{!cpcMarker && (
						<>
							<SideBarContent
								data={headlineData}
								type={typeMarker}
								showAd={false}
								queryLinkCheck={true}
								query={{ ...query, utm_medium: "sidebar-quiz" }}
								currentUrlPath={currentUrlPath}
								showArticles={!cpcMarker}
							/>
							<LazyLoad once={true}>
								<FacebookPage />
							</LazyLoad>
							<div className={styles.sectionPadding}>
								<SectionBar
									title="Popular"
									titleColor="#111"
									titleSize="1rem"
								/>
							</div>
							<SideBarSmallContent
								data={slide.items}
								type="slideshow"
								showAd={true}
								adCode={ETORO_COPY_TRADER}
								queryLinkCheck={true}
								query={{ ...query, utm_medium: "sidebarsmall-quiz" }}
								currentUrlPath={currentUrlPath}
							/>
						</>
					)}
				</aside>
			</main>
		</Layout>
	);
};
Quiz.propTypes = {
	id: PropTypes.String,
};

export default Quiz;
