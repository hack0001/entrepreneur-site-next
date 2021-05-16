import { Fragment } from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import sideHelper from "../helper/sideBarHelper";
import SideBarComponent from "./SideBar/SideBarComponent";
const AdWrapper = dynamic(() => import("../ads/adWrapper"), {
	ssr: false,
});
import Adsense from "../ads/code/adsense/adsense";

const SideBarContent = ({
	data,
	type,
	showAd = false,
	limit = 0,
	cpcAd,
	queryLinkCheck,
	query,
	currentUrlPath,
}) => {
	const slicedData = limit > 0 ? data.slice(0, limit) : data;
	return (
		<>
			{cpcAd && <AdWrapper adCode={cpcAd.displayAd} />}
			{showAd && !cpcAd && (
				<div>
					<Adsense
						client="ca-pub-2068760522034474"
						slot="6792782716"
						currentUrlPath={currentUrlPath}
					/>
				</div>
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
				} = sideHelper(article, article.type ? article.type : type);

				return (
					<Fragment key={index}>
						{index === 2 && showAd && (
							<div>
								<Adsense
									client="ca-pub-2068760522034474"
									slot="1753150973"
									currentUrlPath={currentUrlPath}
								/>
							</div>
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
							queryLinkCheck={queryLinkCheck}
							query={query}
						/>
					</Fragment>
				);
			})}
			{cpcAd && <AdWrapper adCode={cpcAd.displayAd} />}
			{showAd && !cpcAd && (
				<div>
					<Adsense
						client="ca-pub-2068760522034474"
						slot="7552272565"
						currentUrlPath={currentUrlPath}
					/>
				</div>
			)}
		</>
	);
};
export default SideBarContent;

SideBarContent.propTypes = {
	data: PropTypes.array,
	loading: PropTypes.Boolean,
	type: PropTypes.string,
	queryLinkCheck: PropTypes.Boolean,
};
