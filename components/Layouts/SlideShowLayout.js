import { useContext, useState, useEffect } from "react";
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
import Cookie from "js-cookie";
import { filterUnique } from "@utils/handler";

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
	const [cpcMarker, setCpcMarker] = useState(false);

	const uniqueSlideshowContent = filterUnique(slide.items, [{ id }]);
	const headlineData = individual.linkedArticle
		? [
				{ ...individual.linkedArticle, type: "article" },
				...uniqueSlideshowContent,
		  ]
		: uniqueSlideshowContent;
	const typeMarker = "slideshow";

	useEffect(() => {
		const cpcMarker = Cookie.get("CPC") ? JSON.parse(Cookie.get("CPC")) : false;
		setCpcMarker(cpcMarker);
	}, []);

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
							<SectionBar title="Popular" titleColor="#111" titleSize="1rem" />
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
								limit={6}
								queryLinkCheck={true}
								query={{ ...query, utm_medium: "sidebar-slideshow" }}
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
								data={uniqueSlideshowContent}
								type="slideshow"
								showAd={cpcMarker ? false : true}
								limit={6}
								queryLinkCheck={true}
								query={{ ...query, utm_medium: "sidebarsmall-slideshow" }}
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
								limit={6}
								queryLinkCheck={true}
								query={{ ...query, utm_medium: "sidebar-slideshow" }}
								currentUrlPath={currentUrlPath}
								showArticles={!cpcMarker}
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
								showAd={position !== "opening" ? false : true}
								limit={6}
								queryLinkCheck={true}
								query={{ ...query, utm_medium: "sidebarsmall-slideshow" }}
								currentUrlPath={currentUrlPath}
							/>
						</>
					)}
				</aside>
			</main>
		</Layout>
	);
};
Slide.propTypes = {
	id: PropTypes.String,
};

export default Slide;
