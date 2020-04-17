import PropTypes from "prop-types";
import { theme } from "../../../theme/baseCss";
import BookEnds from "./BookEnds";
import Slides from "./Slides";
import ErrorLoader from "../Error";
import Headline from "./Headline";
import SectionBar from "../SectionBar";
import LinkButton from "../../Button/LinkButton";
import ScrollUpButton from "../ScrollUpButton/ScrollUpButton";
import { closingSocialButtons } from "../../SocialMedia/data";
import ShareButtonHoriz from "../../SocialMedia/ShareButtonsHoriz";
import Crumbs from "../Crumbs/crumbs";
import QuickEmailSignUp from "../../SignUpModal/quickEmailSignup";
import FacebookComments from "../../SocialMedia/FacebookComments";
import LazyLoad from "react-lazyload";
import ScrollingContent from "../ScrollingContent/ScrollingContent";

const SlideDetails = ({ content, position, latest, url, id }) => {
	const details = JSON.parse(content.overview);
	const slides = JSON.parse(content.slides);

	const {
		blurb,
		category,
		headlineImage,
		showNumbers,
		countdown,
		title,
		slideUrl,
	} = details[0];
	if (!slides) {
		return <ErrorLoader />;
	}
	const href = `/${url}/quickview/${id}/slides/${position}`;
	const bookEndOpening = slides["opening"][0];
	const bookEndClosing = slides["closing"][0];

	const slideData = countdown ? slides["slides"].reverse() : slides["slides"];
	const shareUrl = `${process.env.SITE_ADDRESS}/${slideUrl}/slideshow/${id}/slides/opening`;
	return (
		<div className="section-padding">
			<SectionBar title={`Lists`} titleColor="#111" titleSize="1.5rem" />
			<Headline data={details} id={id} position={position} />
			<div className="link-wrapper">
				<LinkButton
					label="Start SlideShow"
					href={href}
					imgSrc={details[0].headlineImage}
					srcset={details[0].srcset}
				/>
			</div>
			<BookEnds
				position={"opening"}
				image={bookEndOpening.openingImage}
				imageAlt={bookEndOpening.openingImageAlt}
				imageAltAttribution={bookEndOpening.openingImageAttribution}
				imageAltAttributionLink={bookEndOpening.openingImageAttributionLink}
				srcset={bookEndOpening.srcset}
				title={bookEndOpening.opening}
				details={
					bookEndOpening.openingSlideDetails
						? bookEndOpening.openingSlideDetails
						: undefined
				}
				embed={bookEndOpening["openingImage-embed"]}
			/>
			<div className="link-wrapper">
				<LinkButton
					label="Start SlideShow"
					href={href}
					imgSrc={details[0].headlineImage}
					srcset={details[0].srcset}
				/>
			</div>
			<ScrollUpButton />
			<Slides
				data={slideData}
				showNumbers={showNumbers}
				shareUrl={shareUrl}
				image={headlineImage}
				headline={title}
				brief={blurb}
				latest={latest}
			/>
			<BookEnds
				position={"closing"}
				image={bookEndClosing.closingImage}
				imageAlt={bookEndClosing.closingImageAlt}
				imageAltAttribution={bookEndClosing.closingImageAttribution}
				imageAltAttributionLink={bookEndClosing.closingImageAttributionLink}
				srcset={bookEndClosing.srcset}
				title={bookEndClosing.closing}
				details={
					bookEndClosing.closingSlideDetails
						? bookEndClosing.closingSlideDetails
						: undefined
				}
				embed={bookEndClosing["closingImage-embed"]}
			/>
			<SectionBar title={`Share`} titleColor="#111" titleSize="1.5rem" />
			<ShareButtonHoriz
				data={closingSocialButtons}
				url={shareUrl}
				image={headlineImage}
				headline={title}
				brief={blurb}
				position={"bottom_share_horiz"}
			/>
			<Crumbs
				home={process.env.SITE_ADDRESS}
				category={category}
				headline={title}
				headlineUrl={url}
			/>
			<QuickEmailSignUp />
			<SectionBar title="Leave a Comment" titleColor="#111" titleSize="2rem" />
			<FacebookComments
				url={shareUrl}
				numPostsVisible={5}
				orderBy="reverse_time"
			/>
			<LazyLoad>
				<ScrollingContent id={id} title="Latest" type={"slideshow"} />
			</LazyLoad>
			<hr className="break" />
			<style jsx>
				{`
					.break {
						border: 1px solid #dedede;
						width: 100%;
						margin: 0 auto;
					}
					.headline-image {
						max-height: 550px;
					}
					.link-wrapper {
						margin: 1rem 0;
					}
					.section-padding {
						display: flex;
						flex-direction: column;
						margin: 0.15rem 2rem;
					}

					.section-brief {
						margin: 1.5rem 0;
						padding: 0;
						font-size: 1.45rem;
						font-weight: 300;
						line-height: 2rem;
						color: ${theme.secondary};
						text-transform: capitalize;
						font-family: ${theme.secondaryFont};
					}
					.section-list {
						margin: 0rem 1rem 1rem 1rem;
						padding: 0;
						font-size: 1.45rem;
						font-weight: 300;
						color: ${theme.secondary};
						text-transform: capitalize;
						font-family: ${theme.secondaryFont};
					}
					ul {
						margin: 0;
					}

					@media only screen and (max-width: 670px) {
						.section-padding {
							margin: 0 auto;
							width: 96%;
						}
					}
				`}
			</style>
		</div>
	);
};

SlideDetails.propTypes = {
	content: PropTypes.object,
	position: PropTypes.string,
	overview: PropTypes.object,
};
export default SlideDetails;
