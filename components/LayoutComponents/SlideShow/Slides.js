import PropTypes from "prop-types";
import Embed from "../../Embed/Embed";
import { openingSocialButtons } from "../../SocialMedia/data";
import SectionBar from "../SectionBar";
import ShareButtonHoriz from "../../SocialMedia/ShareButtonsHoriz";
import LazyLoad from "react-lazyload";
import NextLink from "../Editor/renderElement/ads/nextLink";
import slideStyles from "./styles/slideStyles.module.sass";
import Reader from "../Editor/reader";
import Adsense from "../../ads/code/adsense/adsense";

const Slides = ({
	data,
	showNumbers,
	shareUrl,
	image,
	headline,
	brief,
	latest,
	countdown,
	queryLinkCheck,
	query,
	currentUrlPath,
}) => {
	return data.map((slideData, index) => {
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
		} = slideData;

		const arrayNumber = Number.isInteger(index / 2) ? index / 2 : null;
		const adData =
			arrayNumber && arrayNumber < latest.items.length
				? latest.items[arrayNumber - 1]
				: null;
		const midDataOverview = adData ? adData : null;
		const midDataId = adData ? adData.id : null;
		const showNumber = countdown
			? data.length - slidePosition + 1
			: slidePosition;

		return (
			<div className={slideStyles.bookendWrapper} key={index}>
				<h1 className={slideStyles.sectionHeader}>
					{showNumbers && (
						<span className={slideStyles.slidePosition}>{showNumber}</span>
					)}
					{slide}
				</h1>
				<h3 className={slideStyles.sectionBrief}>{slideComment}</h3>
				<div className={slideStyles.sectionParagraph}>
					<Reader value={slideData.slideDetails[0].children} />
					{/* <!-- SlideHorizTop --> */}
					<Adsense
						client="ca-pub-2068760522034474"
						slot="8433059648"
						responsive={true}
						adStyle={"maxHeight"}
						currentUrlPath={currentUrlPath}
					/>
				</div>
				<div>
					<Embed
						embed={slideData["slideImage-embed"]}
						image={slideImage}
						imageAlt={slideImageAlt}
						imageAltAttribution={slideImageAttribution}
						imageAltAttributionLink={slideImageAttributionLink}
						imageCrop={slideImageCrop}
						imageCropInfo={slideImageCropInfo}
						imagePath={slideImagePath}
						styles={{ width: "100%", height: "100%" }}
						noMaxHeight={false}
						wrapperClass={"contentWrapper"}
					/>
				</div>
				<div className={slideStyles.bottomSectionParagraph}>
					{bottomSlideDetails && (
						<Reader value={bottomSlideDetails[0].children} />
					)}
				</div>
				{index % 3 !== 0 && (
					<div className={slideStyles.midAdWrapper}>
						<Adsense
							client="ca-pub-2068760522034474"
							slot="7104500257"
							currentUrlPath={currentUrlPath}
						/>
					</div>
				)}

				{index % 4 === 0 && (
					<>
						<LazyLoad once={true}>
							<SectionBar title={`Share`} titleColor="#111" titleSize="1rem" />
							<ShareButtonHoriz
								data={openingSocialButtons}
								url={shareUrl}
								image={image}
								headline={headline}
								brief={brief}
								position={"middle_slideshow_share_horiz"}
							/>
						</LazyLoad>
					</>
				)}
				{index % 2 === 0 && adData && (
					<>
						<LazyLoad once={true}>
							<SectionBar
								title={`Up Next`}
								titleColor="#111"
								titleSize="1rem"
							/>
							<NextLink
								data={midDataOverview}
								type="article"
								id={midDataId}
								queryLinkCheck={queryLinkCheck}
								query={query}
							/>
							<SectionBar title={``} titleColor="#111" titleSize="1rem" />
						</LazyLoad>
					</>
				)}
				{index % 3 === 0 && (
					// Responsive Horizontal Adsense Component
					<div className={slideStyles.midAdWrapper}>
						<Adsense
							client="ca-pub-2068760522034474"
							slot="6603887822"
							currentUrlPath={currentUrlPath}
						/>
					</div>
				)}
			</div>
		);
	});
};
Slides.propTypes = {
	data: PropTypes.Array,
	shareUrl: PropTypes.String,
	image: PropTypes.String,
	headline: PropTypes.String,
	brief: PropTypes.String,
	imagePath: PropTypes.String,
};
Slides.defaultProps = {
	latest: [],
};
export default Slides;
