import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Embed from "../../../Embed/Embed";
import QuickViewButton from "../../../Button/QuickViewButton";
import styles from "./styles/quickSlideStyles.module.sass";
import SingleLoader from "../../../Loading/SingleLoader";
import Adsense from "../../../ads/code/adsense/adsense";
import adsenseStyles from "../../../ads/code/adsense/adsenseStyles";
import Reader from "../../Editor/reader";

const QuickSlides = ({
	total,
	slideData,
	position,
	linkImage,
	nextHref,
	nextSlideData,
	showNumbers,
	countdown,
	cpcMarker,
	queryLinkCheck,
	query,
	currentUrlPath,
}) => {
	const slideDetails = slideData[0];
	const {
		slide,
		slideComment,
		slideImage,
		slideImageAlt,
		slideImagePath,
		slideImageCrop,
		slideImageCropInfo,
		slideImageAttribution,
		slideImageAttributionLink,
		slidePosition,
		bottomSlideDetails,
	} = slideDetails;

	const showNumber = countdown ? total - slidePosition + 1 : slidePosition;
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(false);
	}, [slideImage]);

	if (loading) return <SingleLoader />;

	return (
		<div className={styles.bookendWrapper}>
			<div>
				<Adsense
					client="ca-pub-2068760522034474"
					slot="3049705177"
					responsive={false}
					adStyle={adsenseStyles["maxHeight"]}
					currentUrlPath={currentUrlPath}
				/>
			</div>
			<h1 className={styles.sectionHeader}>
				{showNumbers && (
					<span className={styles.slidePosition}>{showNumber}</span>
				)}
				{slide}
			</h1>
			<h3 className={styles.sectionBrief}>{slideComment}</h3>
			<div className={styles.sectionParagraph}>
				<Reader value={slideDetails.slideDetails[0].children} />
			</div>
			<div>
				<Embed
					embed={slideDetails["slideImage-embed"]}
					image={slideImage}
					imageAlt={slideImageAlt}
					imageAltAttribution={slideImageAttribution}
					imageAltAttributionLink={slideImageAttributionLink}
					imageCrop={slideImageCrop}
					imageCropInfo={slideImageCropInfo}
					imagePath={slideImagePath}
					styles={{ width: "100%", height: "100%" }}
					noMaxHeight={true}
					wrapperClass={"contentWrapper"}
				/>
			</div>
			<div className={styles.bottomSectionParagraph}>
				{bottomSlideDetails && (
					<Reader value={bottomSlideDetails[0].children} />
				)}
			</div>
			<div className={styles.adWrap}>
				<Adsense
					client="ca-pub-2068760522034474"
					slot="1874540097"
					responsive={false}
					adStyle={adsenseStyles["maxHeight"]}
					currentUrlPath={currentUrlPath}
				/>
			</div>
			{cpcMarker && (
				<QuickViewButton
					label="Next"
					imgSrc={nextSlideData[0] ? nextSlideData[0].slideImage : slideImage}
					href={nextHref}
					imagePath={
						nextSlideData[0] ? nextSlideData[0].slideImagePath : slideImagePath
					}
					refPath={`/[category]/[url]/slideshow/[slideId]/slides/[slideContentId]`}
					imageAlt={
						nextSlideData[0]
							? nextSlideData[0].slideImageAlt
							: "Next Slide Image"
					}
					imageCrop={
						nextSlideData[0] ? nextSlideData[0].slideImageCrop : slideImageCrop
					}
					imageCropInfo={
						nextSlideData[0]
							? nextSlideData[0].slideImageCropInfo
							: slideImageCropInfo
					}
					queryLinkCheck={queryLinkCheck}
					query={query}
				/>
			)}
		</div>
	);
};

QuickSlides.propTypes = {
	data: PropTypes.Array,
};
export default QuickSlides;
