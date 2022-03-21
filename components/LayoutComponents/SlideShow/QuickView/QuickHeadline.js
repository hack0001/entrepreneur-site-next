import PropTypes from "prop-types";
import DynamicHeader from "../../../Header/DynamicHeader";
import ShareButtonVert from "../../../SocialMedia/ShareButtonsVert";
import { sideSocialButtons } from "../../../SocialMedia/data";
import ShowMeta from "../../../showMeta/showMeta";
import LazyLoad from "react-lazyload";
import styles from "./styles/quickHeadlineStyles.module.sass";

const QuickHeadline = ({
	data,
	id,
	position,
	totalSlides,
	pinterestLink,
	authorName,
	shareCounter,
}) => {
	const {
		blurb,
		category,
		title,
		slideUrl,
		headlineImage,
		headlineImagePath,
		headlineImageCrop,
		headlineImageCropInfo,
		slideTitle,
		showDate,
		displayDate,
		showAuthor,
		slideTags,
	} = data[0];
	const canonical = `${process.env.SITE_ADDRESS}/${category}/${slideUrl}/slideshow/${id}/slides/${position}`;
	const shareUrl = `${process.env.SITE_ADDRESS}/${category}/${slideUrl}/slideshow/${id}/slides/opening`;

	const nextEndpoint =
		position === "opening"
			? 1
			: position === "closing"
			? null
			: Number(position) === Number(totalSlides)
			? "closing"
			: Number(position) + 1;
	const prevEndpoint =
		position === "opening"
			? null
			: position === "closing"
			? Number(totalSlides)
			: Number(position) === 1
			? "opening"
			: Number(position) - 1;
	const next =
		position === "closing"
			? null
			: `${process.env.SITE_ADDRESS}/${category}/${slideUrl}/slideshow/${id}/slides/${nextEndpoint}`;
	const prev =
		position === "opening"
			? null
			: `${process.env.SITE_ADDRESS}/${category}/${slideUrl}/slideshow/${id}/slides/${prevEndpoint}`;
	return (
		<div className={styles.bookendWrapper}>
			<DynamicHeader
				title={title}
				description={slideTitle}
				url={shareUrl}
				canonical={canonical}
				image={headlineImage}
				imagePath={headlineImagePath}
				imageCrop={headlineImageCrop}
				imageCropInfo={headlineImageCropInfo}
				next={next}
				prev={prev}
				createdAt={displayDate}
				updatedAt={displayDate}
				tags={slideTags}
				author={authorName}
			/>
			<h1 className={styles.sectionHeading}>{title}</h1>
			<ShowMeta
				showDate={showDate}
				displayDate={displayDate}
				showAuthor={showAuthor}
				authorName={authorName}
			/>
			<LazyLoad once={true}>
				<ShareButtonVert
					data={sideSocialButtons}
					shareCounter={shareCounter}
					url={shareUrl}
					image={headlineImage}
					headline={title}
					brief={blurb}
					pinterestLink={pinterestLink}
				/>
			</LazyLoad>
		</div>
	);
};
QuickHeadline.propTypes = {
	data: PropTypes.Object,
	id: PropTypes.string,
	position: PropTypes.int,
};
export default QuickHeadline;
