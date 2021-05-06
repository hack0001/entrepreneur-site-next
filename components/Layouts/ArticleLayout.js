import { useContext } from "react";
import Layout from "../Layouts/Layout";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import {
	SideBarContent,
	SideBarSmallContent,
	SectionBar,
	ArticleHead as ArticleContent,
} from "../LayoutComponents";
import LazyLoad from "react-lazyload";
import styles from "./styles/contentLayout.module.sass";
import { ETORO_COPY_TRADER } from "../ads/code/eToro";
import Context from "@utils/Context";
import { objectCheck } from "@utils/queryHandler";

const FacebookPage = dynamic(() => import("../SocialMedia/FacebookPage"), {
	ssr: false,
});

const Article = ({ id, individual, quiz, slide, url }) => {
	const cpcAd = individual.linkedCpc ? individual.linkedCpc : null;
	const { query, currentUrlPath } = useContext(Context);
	const queryLinkCheck = objectCheck(query);
	const headlineData = individual.linkedArticle
		? [individual.linkedArticle, ...slide.items]
		: slide.items;
	return (
		<Layout>
			<main className={styles.articleContainer}>
				<article className={styles.articleSection}>
					<ArticleContent
						overview={individual}
						id={id}
						nextSlideShow={slide}
						queryLinkCheck={queryLinkCheck}
						query={query}
						currentUrlPath={currentUrlPath}
						cpcAd={cpcAd}
					/>
				</article>
				<aside className={styles.sideArticleSection}>
					<div className={styles.sectionPadding}>
						<SectionBar title="Popular" titleColor="#111" titleSize="1rem" />
					</div>
					<SideBarContent
						data={headlineData}
						cpcAd={cpcAd}
						type="slideshow"
						showAd={true}
						queryLinkCheck={true}
						query={{ ...query, utm_medium: "sidebar-article" }}
						currentUrlPath={currentUrlPath}
					/>
					<LazyLoad once={true}>
						<FacebookPage />
					</LazyLoad>
					<div className={styles.sectionPadding}>
						<SectionBar title="Quiz" titleColor="#111" titleSize="1rem" />
					</div>
					<SideBarSmallContent
						data={quiz.items}
						type="quiz"
						cpcAd={cpcAd}
						showAd={true}
						adCode={ETORO_COPY_TRADER}
						queryLinkCheck={true}
						query={{ ...query, utm_medium: "sidebarsmall-article" }}
						currentUrlPath={currentUrlPath}
						linkedArticle={
							individual.linkedArticle ? individual.linkedArticle : null
						}
					/>
				</aside>
			</main>
		</Layout>
	);
};
Article.propTypes = {
	id: PropTypes.String,
};

export default Article;
