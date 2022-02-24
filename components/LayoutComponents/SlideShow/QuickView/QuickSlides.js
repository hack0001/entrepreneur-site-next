import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import Embed from "../../../Embed/Embed";
import QuickViewButton from "../../../Button/QuickViewButton";
import styles from "./styles/quickSlideStyles.module.sass";
import ProgressBar from "@components/progressBar/progressBar";
import SingleLoader from "../../../Loading/SingleLoader";
import Adsense from "../../../ads/code/adsense/adsense";
import Reader from "../../Editor/reader";
import AdWrapper from "../../../ads/adWrapper";

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
	showNextTitle,
	progressBar,
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
		slideAffiliateLink,
		affiliateLinkCode,
		slideCallToAction,
		callToAction,
	} = slideDetails;
	// const slideImageEmbed = slideDetails[`slideImage-embed`];
	const showNumber = countdown ? total - slidePosition + 1 : slidePosition;
	const [loading, setLoading] = useState(false);
	const topTitleRef = useRef();

	useEffect(() => {
		setLoading(false);
		if (process.env.NODE_ENV !== "development") {
			const y = topTitleRef.current.getBoundingClientRect().top;
			window.scrollTo({ top: y - 65, behaviour: "smooth" });
		}
	}, [slideImage]);

	if (loading) return <SingleLoader />;

	return (
		<div className={styles.bookendWrapper} ref={topTitleRef}>
			<h2 className={styles.sectionHeader}>
				{showNumbers && (
					<span className={styles.slidePosition}>{showNumber}</span>
				)}
				{slide}
			</h2>
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
					priority={true}
				/>
			</div>
			<h3 className={styles.sectionBrief}>{slideComment}</h3>
			<div className={styles.belowImageAd}>
				<Adsense
					client={`ca-pub-${process.env.GOOGLE_ADSENSE_ID}`}
					slot="1004155983"
					responsive={true}
					adStyle={"default"}
					currentUrlPath={currentUrlPath}
				/>
			</div>

			<div className={styles.deskSectionParagraph}>
				<Reader
					value={slideDetails.slideDetails[0].children}
					quickView={true}
				/>
			</div>
			<div>
				{progressBar && (
					<div className={styles.progressWrapper}>
						<ProgressBar total={total} position={position} />
					</div>
				)}
			</div>

			<div className={styles.mobileSection}>
				<div className={styles.mobSectionParagraph}>
					<Reader
						value={slideDetails.slideDetails[0].children}
						quickView={true}
					/>
				</div>
			</div>

			<QuickViewButton
				label="Next"
				imgSrc={nextSlideData[0] ? nextSlideData[0].slideImage : linkImage}
				href={nextHref}
				imagePath={nextSlideData[0] ? nextSlideData[0].slideImagePath : ""}
				refPath={`/[category]/[url]/slideshow/[slideId]/slides/[slideContentId]`}
				imageAlt={
					nextSlideData[0] ? nextSlideData[0].slideImageAlt : "Next Slide Image"
				}
				imageCrop={
					nextSlideData[0] ? nextSlideData[0].slideImageCrop : slideImageCrop
				}
				imageCropInfo={
					nextSlideData[0]
						? nextSlideData[0].slideImageCropInfo
						: slideImageCropInfo
				}
				imageEmbed={
					nextSlideData[0] ? nextSlideData[0]["slideImage-embed"] : false
				}
				optionalTitle={
					nextSlideData[0] && showNextTitle ? nextSlideData[0].slide : ""
				}
				cpcMarker={cpcMarker}
				queryLinkCheck={queryLinkCheck}
				query={query}
			/>

			<div className={styles.bottomSectionParagraph}>
				{bottomSlideDetails && (
					<Reader value={bottomSlideDetails[0].children} quickView={true} />
				)}
				<div>
					{slideAffiliateLink && affiliateLinkCode && (
						<AdWrapper
							adCode={affiliateLinkCode}
							callToActionMarker={slideCallToAction}
							callToAction={callToAction}
						/>
					)}
				</div>
			</div>
			<div className={styles.adWrapper}>
				{/* QuickViewBottom */}
				{!slideAffiliateLink && !affiliateLinkCode && (
					<Adsense
						client={`ca-pub-${process.env.GOOGLE_ADSENSE_ID}`}
						slot="1874540097"
						responsive={true}
						adStyle={"default"}
						currentUrlPath={currentUrlPath}
					/>
				)}
			</div>

			<QuickViewButton
				label="Next"
				imgSrc={nextSlideData[0] ? nextSlideData[0].slideImage : linkImage}
				href={nextHref}
				imagePath={nextSlideData[0] ? nextSlideData[0].slideImagePath : ""}
				refPath={`/[category]/[url]/slideshow/[slideId]/slides/[slideContentId]`}
				imageAlt={
					nextSlideData[0] ? nextSlideData[0].slideImageAlt : "Next Slide Image"
				}
				imageCrop={
					nextSlideData[0] ? nextSlideData[0].slideImageCrop : slideImageCrop
				}
				imageCropInfo={
					nextSlideData[0]
						? nextSlideData[0].slideImageCropInfo
						: slideImageCropInfo
				}
				imageEmbed={
					nextSlideData[0] ? nextSlideData[0]["slideImage-embed"] : false
				}
				optionalTitle={
					nextSlideData[0] && showNextTitle ? nextSlideData[0].slide : ""
				}
				cpcMarker={cpcMarker}
				queryLinkCheck={queryLinkCheck}
				query={query}
			/>
		</div>
	);
};

QuickSlides.propTypes = {
	data: PropTypes.Array,
};
export default QuickSlides;
