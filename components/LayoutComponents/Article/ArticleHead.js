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
import adsenseStyles from "../../ads/code/adsense/adsenseStyles";

const ArticleHead = ({ overview, id, nextSlideShow, currentUrlPath }) => {
	const details = JSON.parse(overview.overview);
	const {
		articleHeadline,
		category,
		headline,
		headlineImage,
		headlineImageAlt,
		headlineImagePath,
		headlineImageCrop,
		headlineImageCropInfo,
		brief,
		bulletHeadlines,
		bulletHeadlinesDetails,
		urlDescription,
		showDate,
		displayDate,
		showAuthor,
		authorName,
		tags,
	} = details[0];
	const canonical = `${process.env.SITE_ADDRESS}/${category}/${urlDescription}/article/${id}`;

	return (
		<div className={styles.sectionPadding}>
			<DynamicHeader
				title={headline}
				description={brief}
				url={canonical}
				canonical={canonical}
				image={headlineImage}
				createdAt={displayDate}
				updatedAt={displayDate}
				imagePath={headlineImagePath}
				imageCrop={headlineImageCrop}
				imageCropInfo={headlineImageCropInfo}
				tags={tags}
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
				/>
			</div>
			{/* <!-- HorizBarContentTop --> */}
			<Adsense
				client={"ca-pub-2068760522034474"}
				slot={"9802692073"}
				responsive={true}
				currentUrlPath={currentUrlPath}
			/>
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
			{bulletHeadlines > 0 && (
				<ul className={styles.sectionList}>
					{Object.keys(bulletHeadlinesDetails).map((bullet, index) => {
						return (
							<li className={styles.sectionList} key={index}>
								{bulletHeadlinesDetails[bullet]}
							</li>
						);
					})}
				</ul>
			)}
			<LazyLoad once={true}>
				<hr className={styles.break} />
				<ShareButtonVert
					data={sideSocialButtons}
					url={canonical}
					image={headlineImage}
					headline={headline}
					brief={brief}
				/>
				<ShareButtonHoriz
					data={openingSocialButtons}
					url={canonical}
					image={headlineImage}
					headline={headline}
					brief={brief}
					position={"top_share_horiz"}
				/>
			</LazyLoad>
			<hr className={styles.break} />
			<ArticleBody
				content={overview}
				url={canonical}
				image={headlineImage}
				headline={headline}
				nextSlideShow={nextSlideShow}
				brief={brief}
				id={id}
			/>
		</div>
	);
};

ArticleHead.propTypes = {
	overview: PropTypes.object,
	id: PropTypes.string,
};
export default ArticleHead;
