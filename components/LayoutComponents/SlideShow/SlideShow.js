import { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import BookEnds from "./BookEnds";
import Slides from "./Slides";
import ErrorLoader from "../Error";
import Headline from "./Headline";
import SectionBar from "../SectionBar";
import ScrollUpButton from "../ScrollUpButton/ScrollUpButton";
import { closingSocialButtons } from "../../SocialMedia/data";
import ShareButtonHoriz from "../../SocialMedia/ShareButtonsHoriz";
import Crumbs from "../Crumbs/crumbs";
import QuickEmailSignUp from "../../SignUpModal/quickEmailSignup";
import FacebookComments from "../../SocialMedia/FacebookComments";
import LazyLoad from "react-lazyload";
import ScrollingContent from "../ScrollingContent/ScrollingContent";
import styles from "./styles/slideShowStyles.module.sass";
import Context from "@utils/Context";
import QuickViewButton from "../../Button/QuickViewButton";
import QuickSlides from "./QuickView/QuickSlides";
import QuickBookEnds from "./QuickView/QuickBookEnds";
import QuickHeadline from "./QuickView/QuickHeadline";
import { filterUnique } from "@utils/handler";
import Adsense from "../../ads/code/adsense/adsense";
import { objectCheck } from "@utils/queryHandler";
import PinterestEmbed from "@components/SocialMedia/pinterestEmbed";
import percentileMarkers from "@utils/percentageMarkers";
import Cookie from "js-cookie";

const SlideDetails = ({
	content,
	position,
	latest,
	url,
	id,
	nextSlideShow,
	cpcMarker,
	setCpcMarker,
}) => {
	const details = JSON.parse(content.overview);
	const slides = JSON.parse(content.slides);
	const { sessionSlideIds, query, currentUrlPath } = useContext(Context);
	const queryLinkCheck = objectCheck(query);
	const [percentage, setPercentage] = useState(percentileMarkers);

	const filterArray = sessionSlideIds.concat({ id });
	const nextContent = filterUnique(nextSlideShow.items, filterArray);

	const {
		affiliateDisclaimer,
		progressBar,
		pinterestLink,
		pinterestEmbedCode,
		pinterestPinLink,
		viewCount,
		user,
	} = content;
	const lastUpdated = content.updatedAt;
	const authorName = user.alias ? user.alias : "";

	const {
		blurb,
		category,
		headlineImage,
		showNumbers,
		countdown,
		title,
		slideUrl,
		headlineImageAlt,
		showNextTitle,
	} = details[0];
	const positionNumber = Number(position);

	useEffect(() => {
		setPercentage(percentileMarkers);
	}, [id]);

	useEffect(() => {
		const currentPercentage = Math.round(
			(positionNumber / content.numSlides) * 100,
		);

		const updatePercentageCheck = percentage.map(marker => {
			if (currentPercentage >= marker.percentile && !marker.percentileCheck) {
				// Track the Percentage Viewed in Tag Manager
				if (typeof window !== "undefined") {
					if (window.dataLayer) {
						window.dataLayer.push({
							event: "slideshow_percentage",
							percentage: currentPercentage,
							percentile: marker.percentile,
							percentageCheck: marker.percentileCheck,
							category,
						});
					}
				}

				return {
					percentile: marker.percentile,
					percentileCheck: true,
				};
			}
			return marker;
		});
		setPercentage(updatePercentageCheck);
	}, [positionNumber]);

	if (
		!slides &&
		positionNumber > content.numSlides &&
		position !== "opening" &&
		position !== "closing"
	) {
		return <ErrorLoader />;
	}

	const bookEndOpening = slides["opening"][0];
	const bookEndClosing = slides["closing"][0];
	const slideData = countdown ? slides["slides"] : slides["slides"];
	const shareUrl = `${process.env.SITE_ADDRESS}/${category}/${slideUrl}/slideshow/${id}/slides/opening`;
	const nextHref = `/${category}/${slideUrl}/slideshow/${id}/slides`;
	const nextSlideShowHref = nextContent[0]
		? `/${nextContent[0].category}/${nextContent[0].urlDescription}/slideshow/${nextContent[0].id}/slides/opening`
		: "";
	const showOpeningSlide = content.showHeadlineSlide === "true" ? true : false;
	const slideEndRef =
		positionNumber + 1 === content.numSlides + 1
			? "closing"
			: positionNumber + 1;

	const cookieSetup = () => {
		Cookie.set("CPC", JSON.stringify(true), {
			expires: 0.25,
		});
		setCpcMarker(true);
	};

	return (
		<div className={styles.sectionPadding}>
			<SectionBar title={category} titleColor="#111" titleSize="1rem" />
			{(cpcMarker || (!cpcMarker && position !== "opening")) && (
				<>
					<div>
						<QuickHeadline
							data={details}
							id={id}
							position={position}
							totalSlides={content.numSlides}
							cpcMarker={cpcMarker}
							lastUpdated={lastUpdated}
							pinterestLink={pinterestLink}
							authorName={authorName}
						/>
						{(position === "opening" || position === "closing") && (
							<>
								<QuickBookEnds
									position={position}
									image={slides[position][0][`${position}Image`]}
									imageAlt={slides[position][0][`${position}ImageAlt`]}
									imagePath={slides[position][0][`${position}ImagePath`]}
									imageCrop={slides[position][0][`${position}Crop`]}
									imageCropInfo={slides[position][0][`${position}CropInfo`]}
									imageAltAttribution={
										slides[position][0][`${position}ImageAttribution`]
									}
									imageAltAttributionLink={
										slides[position][0][`${position}ImageAttributionLink`]
									}
									title={slides[position][0][`${position}`]}
									details={
										slides[position][0][`${position}SlideDetails`]
											? slides[position][0][`${position}SlideDetails`]
											: undefined
									}
									embed={slides[position][0][`${position}Image-embed`]}
									currentUrlPath={currentUrlPath}
								/>

								{position === "opening" && (
									<QuickViewButton
										label="Start"
										optionalTitle={
											showNextTitle ? slides["slides"][0].slide : ""
										}
										imgSrc={slides["slides"][0].slideImage}
										imagePath={slides["slides"][0].slideImagePath}
										href={`${nextHref}/1`}
										refPath={`/[category]/[url]/slideshow/[slideId]/slides/[slideContentId]`}
										imageAlt={slides["slides"][0].slideImageAlt}
										imageCrop={slides["slides"][0].slideImageCrop}
										imageCropInfo={slides["slides"][0].slideImageCropInfo}
										imageEmbed={slides["slides"][0][`slideImage-embed`]}
										cpcMarker={cpcMarker}
										queryLinkCheck={queryLinkCheck}
										query={query}
									/>
								)}
								{position === "closing" && nextContent[0] && (
									<QuickViewButton
										label={"Next"}
										optionalTitle={nextContent[0].headline}
										imgSrc={nextContent[0].headlineImage}
										imagePath={nextContent[0].imagePath}
										href={nextSlideShowHref}
										refPath={`/[category]/[url]/slideshow/[slideId]/slides/[slideContentId]`}
										imageAlt={nextContent[0].headlineImageAlt}
										imageCrop={nextContent[0].headlineImageCrop}
										imageCropInfo={nextContent[0].headlineImageCropInfo}
										imageEmbed={nextContent[0][`headlineImage-embed`]}
										cpcMarker={cpcMarker}
										queryLinkCheck={true}
										query={{ ...query, utm_medium: "quickview_bottom_next" }}
									/>
								)}
							</>
						)}
					</div>
					<div>
						{position !== "opening" && position !== "closing" && (
							<QuickSlides
								total={content.numSlides}
								slideData={slides.slides.filter(
									x => x.slidePosition === positionNumber,
								)}
								nextSlideData={slides.slides.filter(
									x => x.slidePosition === positionNumber + 1,
								)}
								showNumbers={showNumbers}
								position={position}
								countdown={countdown}
								linkImage={details[0][`headlineImage`]}
								nextHref={`${nextHref}/${slideEndRef}`}
								cpcMarker={cpcMarker}
								queryLinkCheck={queryLinkCheck}
								query={query}
								currentUrlPath={currentUrlPath}
								showNextTitle={showNextTitle}
								progressBar={progressBar}
							/>
						)}
					</div>
				</>
			)}
			{!cpcMarker && position === "opening" && (
				<>
					<Headline
						data={details}
						id={id}
						position={position}
						query={query}
						queryLinkCheck={queryLinkCheck}
						affiliateDisclaimer={affiliateDisclaimer}
						lastUpdated={lastUpdated}
						pinterestLink={pinterestLink}
						authorName={authorName}
					/>
					<BookEnds
						position={"opening"}
						showHeadlineImage={showOpeningSlide}
						image={bookEndOpening.openingImage}
						imageAlt={bookEndOpening.openingImageAlt}
						imageAltAttribution={bookEndOpening.openingImageAttribution}
						imageAltAttributionLink={bookEndOpening.openingImageAttributionLink}
						imagePath={bookEndOpening.openingImagePath}
						imageCrop={bookEndOpening.openingImageCrop}
						imageCropInfo={bookEndOpening.openingImageCropInfo}
						title={bookEndOpening.opening}
						details={
							bookEndOpening.openingSlideDetails
								? bookEndOpening.openingSlideDetails
								: undefined
						}
						embed={bookEndOpening["openingImage-embed"]}
						priority={true}
					/>

					<Slides
						data={slideData}
						showNumbers={showNumbers}
						shareUrl={shareUrl}
						image={headlineImage}
						headline={title}
						brief={blurb}
						latest={latest}
						countdown={countdown}
						queryLinkCheck={queryLinkCheck}
						query={query}
						currentUrlPath={currentUrlPath}
						pinterestLink={pinterestLink}
					/>
					<BookEnds
						position={"closing"}
						image={bookEndClosing.closingImage}
						showHeadlineImage={true}
						imageAlt={bookEndClosing.closingImageAlt}
						imageAltAttribution={bookEndClosing.closingImageAttribution}
						imageAltAttributionLink={bookEndClosing.closingImageAttributionLink}
						imagePath={bookEndClosing.closingImagePath}
						imageCrop={bookEndClosing.closingImageCrop}
						imageCropInfo={bookEndClosing.closingImageCropInfo}
						title={bookEndClosing.closing}
						details={
							bookEndClosing.closingSlideDetails
								? bookEndClosing.closingSlideDetails
								: undefined
						}
						embed={bookEndClosing["closingImage-embed"]}
						priority={false}
					/>
					<div>
						{/* SlideShowBottomHoriz */}
						<Adsense
							client={`ca-pub-${process.env.GOOGLE_ADSENSE_ID}`}
							slot="3467673426"
							currentUrlPath={currentUrlPath}
						/>
					</div>

					{nextContent[0] && (
						<QuickViewButton
							label={"Next"}
							optionalTitle={nextContent[0].headline}
							handler={cookieSetup}
							imgSrc={nextContent[0].headlineImage}
							imagePath={nextContent[0].imagePath}
							href={nextSlideShowHref}
							refPath={`/[category]/[url]/slideshow/[slideId]/slides/[slideContentId]`}
							imageAlt={nextContent[0].headlineImageAlt}
							imageCrop={nextContent[0].headlineImageCrop}
							imageCropInfo={nextContent[0].headlineImageCropInfo}
							imageEmbed={nextContent[0]["headlineImage-embed"]}
							cpcMarker={cpcMarker}
							queryLinkCheck={true}
							query={{ ...query, utm_medium: "slideshow_bottom_next" }}
						/>
					)}
				</>
			)}
			<LazyLoad once={true}>
				<PinterestEmbed
					pinterestEmbedCode={pinterestEmbedCode}
					pinterestPinLink={pinterestPinLink}
				/>
			</LazyLoad>

			{!cpcMarker && (
				<LazyLoad once={true}>
					<ScrollUpButton />
				</LazyLoad>
			)}
			<LazyLoad once={true}>
				<SectionBar title={`Share`} titleColor="#111" titleSize="1rem" />
				<ShareButtonHoriz
					data={closingSocialButtons}
					url={shareUrl}
					image={headlineImage}
					headline={title}
					brief={blurb}
					pinterestLink={pinterestLink}
					position={"bottom_share_horiz"}
				/>
			</LazyLoad>
			<Crumbs
				home={process.env.SITE_ADDRESS}
				category={category}
				headline={title}
				headlineUrl={shareUrl}
				refPath={`/[category]/[url]/slideshow/[slideId]/slides/[slideContentId]`}
				queryLinkCheck={queryLinkCheck}
				query={query}
			/>
			<LazyLoad once={true}>
				<QuickEmailSignUp queryLinkCheck={queryLinkCheck} query={query} />
			</LazyLoad>
			<LazyLoad once={true}>
				<SectionBar
					title="Leave a Comment"
					titleColor="#111"
					titleSize="1rem"
				/>
			</LazyLoad>
			<FacebookComments
				url={shareUrl}
				numPostsVisible={5}
				orderBy="reverse_time"
			/>
			<LazyLoad once={true}>
				<ScrollingContent id={id} title="Latest" type={"slideshow"} />
			</LazyLoad>
			<hr className={styles.break} />
		</div>
	);
};

SlideDetails.propTypes = {
	content: PropTypes.object,
	position: PropTypes.string,
	overview: PropTypes.object,
};
export default SlideDetails;
