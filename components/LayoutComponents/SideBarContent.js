import { Fragment } from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import sideHelper from "../helper/sideBarHelper";
import SideBarComponent from "./SideBar/SideBarComponent";
const AdWrapper = dynamic(() => import("../ads/adWrapper"), {
	ssr: false,
});
import Adsense from "../ads/code/adsense/adsense";
import styles from "./styles/sectionBarStyles.module.sass";

// import AffLink from "../ads/affiliate/socialMediaAff";

const SideBarContent = ({
	data,
	type,
	showAd = false,
	limit = 0,
	cpcAd,
	queryLinkCheck,
	query,
	currentUrlPath,
	showArticles = true,
}) => {
	const slicedData = limit > 0 ? data.slice(0, limit) : data;
	return (
		<>
			{cpcAd && (
				<AdWrapper adCode={cpcAd.displayAd} callToActionMarker={false} />
			)}
			{showAd && !cpcAd && (
				<div>
					{/* SideBarSquareTop */}
					<Adsense
						client={`ca-pub-${process.env.GOOGLE_ADSENSE_ID}`}
						slot="6792782716"
						currentUrlPath={currentUrlPath}
					/>
				</div>
			)}
			{/* {!showArticles && <AffLink />} */}
			{showArticles &&
				slicedData.map((article, index) => {
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
									{/* SideBarSquareMid */}
									<Adsense
										client={`ca-pub-${process.env.GOOGLE_ADSENSE_ID}`}
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

			{cpcAd && (
				<AdWrapper adCode={cpcAd.displayAd} callToActionMarker={false} />
			)}
			{showAd && !cpcAd && (
				<div className={styles.wrapperDiv}>
					{/* <!-- SideBarx300x600 --> */}
					<Adsense
						client={`ca-pub-${process.env.GOOGLE_ADSENSE_ID}`}
						slot="4539635375"
						currentUrlPath={currentUrlPath}
						adStyle={"SideBarx300x600"}
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
