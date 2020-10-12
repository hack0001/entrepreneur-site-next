import { Fragment } from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import sideHelper from "../helper/sideBarHelper";
import SideBarComponent from "./SideBar/SideBarComponent";
const AdWrapper = dynamic(() => import("../ads/adWrapper"), {
	ssr: false,
});
import {
	AMAZON_AD_CODE,
	AMAZON_KINDLE_CODE_SQUARE,
} from "../ads/code/amazonBusiness";
import Adsense from "../ads/code/adsense/adsense";

const SideBarContent = ({ data, type, showAd = false, limit = 0, cpcAd }) => {
	const slicedData = limit > 0 ? data.slice(0, limit) : data;
	return (
		<>
			{cpcAd && <AdWrapper adCode={cpcAd.displayAd} />}
			{showAd && !cpcAd && (
				<Adsense client="ca-pub-2068760522034474" slot="6792782716" />
			)}
			{slicedData.map((article, index) => {
				const {
					headlineImage,
					headlineImageAlt,
					headlineImagePath,
					headlineImageCrop,
					headlineImageCropInfo,
					headline,
					category,
					refPath,
					contentLink,
				} = sideHelper(article, type);

				return (
					<Fragment key={index}>
						{index === 2 && showAd && (
							<Adsense client="ca-pub-2068760522034474" slot="1753150973" />
							// <AdWrapper adCode={AMAZON_KINDLE_CODE_SQUARE} />
						)}
						<SideBarComponent
							type={type}
							headlineImage={headlineImage}
							headlineImageAlt={headlineImageAlt}
							headlineImagePath={headlineImagePath}
							headlineImageCrop={headlineImageCrop}
							headlineImageCropInfo={headlineImageCropInfo}
							headline={headline}
							category={category}
							refPath={refPath}
							contentLink={contentLink}
						/>
					</Fragment>
				);
			})}
			{cpcAd && <AdWrapper adCode={cpcAd.displayAd} />}
			{showAd && !cpcAd && (
				<Adsense client="ca-pub-2068760522034474" slot="7552272565" />
			)}
		</>
	);
};
export default SideBarContent;

SideBarContent.propTypes = {
	data: PropTypes.array,
	loading: PropTypes.Boolean,
	type: PropTypes.string,
};
