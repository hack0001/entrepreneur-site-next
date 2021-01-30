import PropTypes from "prop-types";
import Embed from "../../Embed/Embed";
import { openingSocialButtons } from "../../SocialMedia/data";
import SectionBar from "../SectionBar";
import ShareButtonHoriz from "../../SocialMedia/ShareButtonsHoriz";
import LazyLoad from "react-lazyload";
import NextLink from "../Editor/renderElement/ads/nextLink";
import slideStyles from "./styles/slideStyles.module.sass";
import dynamic from "next/dynamic";
import Reader from "../Editor/reader";
const MultiAdWrapper = dynamic(() => import("../../ads/twoAdsWrapper"), {
	ssr: false,
});
import { AMAZON_KINDLE_CODE_SQUARE } from "../../ads/code/amazonBusiness";
import { FIVERR_SQUARE } from "../../ads/code/fiverr";
import Adsense from "../../ads/code/adsense/adsense";
import adsenseStyles from "../../ads/code/adsense/adsenseStyles";

const Slides = ({
	data,
	showNumbers,
	shareUrl,
	image,
	headline,
	brief,
	latest,
	countdown,
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
					<Adsense
						client="ca-pub-2068760522034474"
						slot="8433059648"
						responsive={false}
						adStyle={adsenseStyles["maxHeight"]}
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
						<Adsense client="ca-pub-2068760522034474" slot="7104500257" />
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
							<NextLink data={midDataOverview} type="article" id={midDataId} />
							<SectionBar title={``} titleColor="#111" titleSize="1rem" />
						</LazyLoad>
					</>
				)}
				{index % 3 === 0 && (
					<div className={slideStyles.multiAdWrap}>
						<div>
							<MultiAdWrapper
								adCodeOne={FIVERR_SQUARE}
								adCodeTwo={AMAZON_KINDLE_CODE_SQUARE}
							/>
						</div>
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
