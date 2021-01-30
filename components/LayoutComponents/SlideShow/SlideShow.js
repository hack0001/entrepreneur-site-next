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
import Context from "../../../utils/Context";
import QuickViewButton from "../../Button/QuickViewButton";
import QuickSlides from "./QuickView/QuickSlides";
import QuickBookEnds from "./QuickView/QuickBookEnds";
import QuickHeadline from "./QuickView/QuickHeadline";
import { filterUnique } from "../../../utils/handler";
import Cookie from "js-cookie";
import Adsense from "../../ads/code/adsense/adsense";
import prodRequest from "../../apiRequest/prodRequest";
import { UPDATE_SLIDESHOW } from "../../../graphql/indivSlideShow";

const SlideDetails = ({
	content,
	position,
	latest,
	url,
	id,
	nextSlideShow,
}) => {
	const details = JSON.parse(content.overview);
	const slides = JSON.parse(content.slides);
	const { viewCount } = content;
	const { sessionSlideIds } = useContext(Context);
	const [cpcMarker, setCpcMarker] = useState(false);
	const filterArray = sessionSlideIds.concat({ id });
	const nextContent = filterUnique(nextSlideShow.items, filterArray);
	const {
		blurb,
		category,
		headlineImage,
		showNumbers,
		countdown,
		title,
		slideUrl,
		headlineImageAlt,
	} = details[0];
	const positionNumber = Number(position);

	useEffect(() => {
		const cpcMarker = Cookie.get("CPC") ? JSON.parse(Cookie.get("CPC")) : false;
		setCpcMarker(cpcMarker);
	}, []);

	useEffect(() => {
		const updatedCount = viewCount ? Number(viewCount) + 1 : 1;

		try {
			const mutationData = {
				query: UPDATE_SLIDESHOW,
				operationName: "updateProductionSlideshow",
				variables: {
					input: {
						id,
						viewCount: JSON.stringify(updatedCount),
					},
				},
			};
			prodRequest(mutationData);
		} catch (err) {
			console.log("Error with request", err);
		}
	}, [id]);

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
								/>
								{position === "opening" && (
									<QuickViewButton
										label="Start"
										imgSrc={details[0].headlineImage}
										imagePath={details[0].imagePath}
										href={`${nextHref}/1`}
										refPath={`/[category]/[url]/slideshow/[slideId]/slides/[slideContentId]`}
										imageAlt={details[0].headlineImageAlt}
										imageCrop={details[0].headlineImageCrop}
										imageCropInfo={details[0].headlineImageCropInfo}
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
							/>
						)}
						<Adsense
							client="ca-pub-2068760522034474"
							slot="7104500257"
							responsive={true}
							adStyle={{ display: "block" }}
						/>
					</div>
				</>
			)}
			{!cpcMarker && position === "opening" && (
				<>
					<Headline data={details} id={id} position={position} />
					<BookEnds
						position={"opening"}
						showHeadlineImage={showOpeningSlide}
						image={bookEndOpening.openingImage}
						imageAlt={bookEndOpening.openingImageAlt}
						imageAltAttribution={bookEndOpening.openingImageAttribution}
						imageAltAttributionLink={bookEndOpening.openingImageAttributionLink}
						imagePath={bookEndOpening.imagePath}
						imageCrop={bookEndOpening.imageCrop}
						imageCropInfo={bookEndOpening.imageCropInfo}
						title={bookEndOpening.opening}
						details={
							bookEndOpening.openingSlideDetails
								? bookEndOpening.openingSlideDetails
								: undefined
						}
						embed={bookEndOpening["openingImage-embed"]}
					/>

					<div>
						<Adsense client="ca-pub-2068760522034474" slot="8433059648" />
					</div>
					<Slides
						data={slideData}
						showNumbers={showNumbers}
						shareUrl={shareUrl}
						image={headlineImage}
						headline={title}
						brief={blurb}
						latest={latest}
						countdown={countdown}
					/>
					<BookEnds
						position={"closing"}
						image={bookEndClosing.closingImage}
						showHeadlineImage={true}
						imageAlt={bookEndClosing.closingImageAlt}
						imageAltAttribution={bookEndClosing.closingImageAttribution}
						imageAltAttributionLink={bookEndClosing.closingImageAttributionLink}
						imagePath={bookEndClosing.imagePath}
						imageCrop={bookEndClosing.imageCrop}
						imageCropInfo={bookEndClosing.imageCropInfo}
						title={bookEndClosing.closing}
						details={
							bookEndClosing.closingSlideDetails
								? bookEndClosing.closingSlideDetails
								: undefined
						}
						embed={bookEndClosing["closingImage-embed"]}
					/>
					<div>
						<Adsense client="ca-pub-2068760522034474" slot="3467673426" />
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
						/>
					)}
				</>
			)}
			<LazyLoad once={true}>
				<ScrollUpButton />
			</LazyLoad>
			<LazyLoad once={true}>
				<SectionBar title={`Share`} titleColor="#111" titleSize="1rem" />
				<ShareButtonHoriz
					data={closingSocialButtons}
					url={shareUrl}
					image={headlineImage}
					headline={title}
					brief={blurb}
					position={"bottom_share_horiz"}
				/>
			</LazyLoad>
			<Crumbs
				home={process.env.SITE_ADDRESS}
				category={category}
				headline={title}
				headlineUrl={url}
				refPath={`/[category]/[url]/slideshow/[slideId]/slides/[slideContentId]`}
			/>
			<LazyLoad once={true}>
				<QuickEmailSignUp />
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
