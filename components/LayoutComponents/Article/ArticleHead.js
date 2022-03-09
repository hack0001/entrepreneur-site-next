import SectionBar from "../SectionBar";
import PropTypes from "prop-types";
import DynamicHeader from "../../Header/DynamicHeader";
import ArticleBody from "./ArticleBody";
import ShareButtonHoriz from "../../SocialMedia/ShareButtonsHoriz";
import ShareButtonVert from "../../SocialMedia/ShareButtonsVert";
import ImageLoader from "../../Loading/ImageLoader";
import {
	openingSocialButtons,
	sideSocialButtons,
} from "../../SocialMedia/data";
import ShowMeta from "../../showMeta/showMeta";
import LazyLoad from "react-lazyload";
import styles from "./styles/articleHeadStyles.module.sass";
import Adsense from "../../ads/code/adsense/adsense";
import Disclaimer from "../../ads/disclaimer";

const ArticleHead = ({
	overview,
	id,
	nextSlideShow,
	currentUrlPath,
	query,
	queryLinkCheck,
	cpcAd,
}) => {
	const details = JSON.parse(overview.overview);
	const { pinterestLink, user } = overview;
	const authorName = user ? user.alias : "";
	const {
		affiliateCallToAction,
		articleHeadline,
		bulletHeadlines,
		bulletHeadlinesDetails,
		category,
		displayDate,
		headline,
		headlineImage,
		headlineImageAlt,
		headlineImagePath,
		headlineImageCrop,
		headlineImageCropInfo,
		kicker,
		showDate,
		showAuthor,
		showContentsTable,
		tags,
		urlDescription,
	} = details[0];

	const callToActionMarker = affiliateCallToAction ? true : false;
	const canonical = `${process.env.SITE_ADDRESS}/${category}/${urlDescription}/article/${id}`;
	return (
		<div className={styles.sectionPadding}>
			<DynamicHeader
				title={headline}
				description={kicker}
				url={canonical}
				canonical={canonical}
				image={headlineImage}
				createdAt={displayDate}
				updatedAt={displayDate}
				imagePath={headlineImagePath}
				imageCrop={headlineImageCrop}
				imageCropInfo={headlineImageCropInfo}
				tags={tags}
				author={authorName}
			/>
			<SectionBar title={category} titleColor="#111" titleSize="1rem" />
			<h1 className={styles.sectionHeading}>
				{articleHeadline ? articleHeadline : headline}
			</h1>
			<div className={styles.metaWrapper}>
				<ShowMeta
					showDate={showDate}
					displayDate={displayDate}
					showAuthor={showAuthor}
					authorName={authorName}
					lastUpdated={overview.updatedAt}
				/>
			</div>
			{/* <!-- HorizBarContentTop --> */}

			<ImageLoader
				src={headlineImage}
				alt={headlineImageAlt}
				imagePath={headlineImagePath}
				imageCrop={headlineImageCrop}
				imageCropInfo={headlineImageCropInfo}
				animation={false}
				unsized={true}
				styles={{ width: "100%", height: "100%" }}
				noMaxHeight={true}
				priority={true}
				wrapperClass={"contentWrapper"}
			/>
			<div className={styles.bulletWrapper}>
				{bulletHeadlines > 0 && (
					<ul className={styles.bulletList}>
						{Object.keys(bulletHeadlinesDetails).map((bullet, index) => {
							return (
								<li className={styles.sectionList} key={index}>
									{bulletHeadlinesDetails[bullet]}
								</li>
							);
						})}
					</ul>
				)}
			</div>
			<LazyLoad once={true}>
				<hr className={styles.break} />
				<ShareButtonVert
					data={sideSocialButtons}
					url={canonical}
					image={headlineImage}
					headline={headline}
					brief={kicker}
					pinterestLink={pinterestLink}
				/>
				<ShareButtonHoriz
					data={openingSocialButtons}
					url={canonical}
					image={headlineImage}
					headline={headline}
					brief={kicker}
					position={"top_share_horiz"}
					pinterestLink={pinterestLink}
				/>
			</LazyLoad>
			{overview.affiliateDisclaimer && (
				<Disclaimer query={query} queryLinkCheck={queryLinkCheck} />
			)}
			<hr className={styles.break} />
			<div>
				{/* HorizBarContentTop */}
				<Adsense
					client={`ca-pub-${process.env.GOOGLE_ADSENSE_ID}`}
					slot={"9802692073"}
					responsive={true}
					currentUrlPath={currentUrlPath}
					adStyle={"adHeadline"}
					adWrapperStyle={"adTopHeadline"}
					adWrap={"adHeadWrap"}
				/>
			</div>
			<ArticleBody
				content={overview}
				url={canonical}
				image={headlineImage}
				headline={headline}
				nextSlideShow={nextSlideShow}
				brief={kicker}
				id={id}
				cpcAd={cpcAd}
				category={category}
				showContentsTable={showContentsTable}
				affiliateCallToAction={affiliateCallToAction}
				callToActionMarker={callToActionMarker}
			/>
		</div>
	);
};

ArticleHead.propTypes = {
	overview: PropTypes.object,
	id: PropTypes.string,
};
export default ArticleHead;
