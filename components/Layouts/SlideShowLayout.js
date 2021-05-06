import { useContext } from "react";
import Layout from "../Layouts/Layout";
import PropTypes from "prop-types";
import {
	SideBarContent,
	SideBarSmallContent,
	SectionBar,
	SlideShowComponent,
} from "../LayoutComponents";
import LazyLoad from "react-lazyload";
import styles from "./styles/contentLayout.module.sass";
import dynamic from "next/dynamic";
import Context from "@utils/Context";
import { objectCheck } from "@utils/queryHandler";

const FacebookPage = dynamic(() => import("../SocialMedia/FacebookPage"), {
	ssr: false,
});
const Slide = ({
	individual,
	headline,
	latest,
	quiz,
	slide,
	id,
	position,
	url,
}) => {
	const { query, currentUrlPath } = useContext(Context);
	const queryLinkCheck = objectCheck(query);
	const headlineData = individual.linkedArticle
		? [individual.linkedArticle, ...headline.items]
		: headline.items;
	return (
		<Layout>
			<main className={styles.articleContainer}>
				<article className={styles.articleSection}>
					<SlideShowComponent
						content={individual}
						position={position}
						latest={latest}
						nextSlideShow={slide}
						url={url}
						id={id}
						queryLinkCheck={queryLinkCheck}
						query={query}
					/>
				</article>
				<aside className={styles.sideArticleSection}>
					<div className={styles.sectionPadding}>
						<SectionBar title="Popular" titleColor="#111" titleSize="1rem" />
					</div>
					<div className={styles.sideContentWrapper}>
						<SideBarContent
							data={headlineData}
							type="article"
							showAd={true}
							limit={6}
							queryLinkCheck={true}
							query={{ ...query, utm_medium: "sidebar-slideshow" }}
							currentUrlPath={currentUrlPath}
						/>
					</div>
					<LazyLoad once={true}>
						<FacebookPage />
					</LazyLoad>
					<div className={styles.sectionPadding}>
						<SectionBar title="Quiz" titleColor="#111" titleSize="1rem" />
					</div>
					<SideBarSmallContent
						data={quiz.items}
						type="quiz"
						showAd={true}
						limit={6}
						queryLinkCheck={true}
						query={{ ...query, utm_medium: "sidebarsmall-slideshow" }}
						currentUrlPath={currentUrlPath}
					/>
				</aside>
			</main>
		</Layout>
	);
};
Slide.propTypes = {
	id: PropTypes.String,
};

export default Slide;
