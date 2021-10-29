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
	const headlineData = individual.linkedArticle
		? [{ ...individual.linkedArticle, type: "article" }, ...headline.items]
		: headline.items;
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
				<aside className={styles.sideArticleSection}>
					<div className={styles.sectionPadding}>
						<SectionBar title="Quiz" titleColor="#111" titleSize="1rem" />
					</div>
					<SideBarContent
						data={headlineData}
						type="article"
						showAd={true}
						queryLinkCheck={true}
						query={{ ...query, utm_medium: "sidebar-quiz" }}
						currentUrlPath={currentUrlPath}
						showArticles={!cpcMarker}
					/>
					<LazyLoad once={true}>
						<FacebookPage />
					</LazyLoad>
					<div className={styles.sectionPadding}>
						<SectionBar title="Popular" titleColor="#111" titleSize="1rem" />
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
				</aside>
			</main>
		</Layout>
	);
};
Quiz.propTypes = {
	id: PropTypes.String,
};

export default Quiz;
