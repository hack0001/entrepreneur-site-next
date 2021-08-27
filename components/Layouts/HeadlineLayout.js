import { useState, useContext } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import dynamic from "next/dynamic";
import {
	ScrollingArticles,
	SideBarContent,
	SideBarSmallContent,
	SectionBar,
} from "../LayoutComponents";
import Layout from "../Layouts/Layout";
import LazyLoad from "react-lazyload";
import styles from "./styles/headlineLayout.module.sass";
import baseTheme from "../../theme/baseTheme.json";
import Context from "@utils/Context";
import prodRequest from "@components/apiRequest/prodRequest";

const FacebookPage = dynamic(() => import("../SocialMedia/FacebookPage"), {
	ssr: false,
});
const RippleButton = dynamic(() => import("../Button/Button"), {
	ssr: false,
});

const HeadlineLayout = ({
	headline,
	quiz,
	slide,
	title,
	pageTitle,
	canonical,
	latestNextToken,
	latestSortIndex,
	nextQuery,
	queryFilter,
	queryOpName,
	objectMarker,
}) => {
	const { query, currentUrlPath } = useContext(Context);
	const [token, setToken] = useState(latestNextToken ? latestNextToken : null);
	const [sortIndex, setSortIndex] = useState(
		latestSortIndex ? latestSortIndex : null,
	);
	const [loadingMorePosts, setLoadingMorePosts] = useState(false);
	const [latestContent, setLatestContent] = useState(
		headline ? headline.items : [],
	);

	const loadMore = async () => {
		setLoadingMorePosts(true);
		if (!token) {
			setLoadingMorePosts(false);
			return;
		}
		const { data: loadMoreArticles } = await prodRequest({
			query: nextQuery,
			variables: {
				filter: queryFilter,
				limit: 4,
				nextToken: token,
				sortIndex: sortIndex,
			},
			operationName: queryOpName,
		});

		const addLatestContent = latestContent.concat(
			loadMoreArticles[objectMarker].items,
		);
		setLatestContent(addLatestContent);
		setToken(loadMoreArticles[objectMarker].nextToken);
		setSortIndex(loadMoreArticles[objectMarker].sortIndex);
		setLoadingMorePosts(false);
	};

	return (
		<Layout>
			<Head>
				<title>{title}</title>
				<link
					rel="canonical"
					href={`${process.env.SITE_ADDRESS}/${canonical}`}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(
							{
								"@context": "https://schema.org",
								"@type": "BreadcrumbList",
								itemListElement: [
									{
										"@type": "ListItem",
										position: 1,
										name: "Home",
										item: "https://wealthmack.com/",
									},
									{
										"@type": "ListItem",
										position: 2,
										name: title,
										item: `${process.env.SITE_ADDRESS}/${canonical}`,
									},
								],
							},
							null,
							4,
						),
					}}
				/>
			</Head>
			<div className={styles.homeContainer}>
				<section className={styles.bodyContainer}>
					<div className={styles.latestContainer}>
						<div className={styles.scrollingWrapper}>
							<div className={styles.sectionPadding}>
								<LazyLoad once={true}>
									<SectionBar
										title={pageTitle}
										titleColor="#111"
										titleSize="1rem"
									/>
								</LazyLoad>
							</div>
							<ScrollingArticles
								data={latestContent}
								queryLinkCheck={true}
								query={{ ...query, utm_medium: `${pageTitle}-scrolling` }}
							/>
							{token && (
								<LazyLoad once={true}>
									<RippleButton
										label={loadingMorePosts ? "Loading..." : "More"}
										color={baseTheme.secondary}
										handler={loadMore}
									/>
								</LazyLoad>
							)}
						</div>
					</div>
					<aside className={styles.slideContainer}>
						<div className={styles.sectionPadding}>
							<SectionBar title="Quiz" titleColor="#111" titleSize="1rem" />
						</div>
						<SideBarContent
							data={quiz.items}
							type="quiz"
							queryLinkCheck={true}
							query={{ ...query, utm_medium: `sidebar-${pageTitle}` }}
							currentUrlPath={currentUrlPath}
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
							queryLinkCheck={true}
							query={{ ...query, utm_medium: `sidebarsmall-${pageTitle}` }}
							currentUrlPath={currentUrlPath}
						/>
					</aside>
				</section>
			</div>
		</Layout>
	);
};
HeadlineLayout.propTypes = {
	title: PropTypes.string,
	pageTitle: PropTypes.string,
};
HeadlineLayout.defaultProps = {
	title: "WealthMack",
	pageTitle: "Latest",
};

export default HeadlineLayout;
