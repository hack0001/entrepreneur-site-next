import PropTypes from "prop-types";
import SideBarSmallComponent from "./SideBar/SideBarSmallComponent";
import SideBarComponent from "./SideBar/SideBarComponent";
import sideHelper from "../helper/sideBarHelper";
import dynamic from "next/dynamic";
import Adsense from "../ads/code/adsense/adsense";
import styles from "./styles/sectionBarStyles.module.sass";

const AdWrapper = dynamic(() => import("../ads/adWrapper"), {
	ssr: false,
});
const SideBarSmallContent = ({
	data,
	type,
	showAd = false,
	limit = 0,
	cpcAd,
	queryLinkCheck,
	query,
	currentUrlPath,
	linkedArticle,
}) => {
	const slicedData = limit > 0 ? data.slice(0, limit) : data;
	return (
		<>
			{slicedData.map((content, index) => {
				const {
					headlineImage,
					headlineImageAlt,
					headlineImagePath,
					headlineImageCrop,
					headlineImageCropInfo,
					headline,
					category,
					urlDescription,
					refPath,
					contentLink,
				} = sideHelper(content, type);

				return (
					<div key={index}>
						{index === 2 && showAd && (
							<div className={styles.smallWrapperDiv}>
								<Adsense
									client={`ca-pub-${process.env.GOOGLE_ADSENSE_ID}`}
									slot="7552272565"
									currentUrlPath={currentUrlPath}
								/>
							</div>
						)}
						<SideBarSmallComponent
							key={index}
							type={type}
							headlineImage={headlineImage}
							headlineImageAlt={headlineImageAlt}
							headlineImagePath={headlineImagePath}
							headlineImageCrop={headlineImageCrop}
							headlineImageCropInfo={headlineImageCropInfo}
							headline={headline}
							category={category}
							url={urlDescription}
							refPath={refPath}
							contentLink={contentLink}
							queryLinkCheck={queryLinkCheck}
							query={query}
						/>
					</div>
				);
			})}
			{showAd && !cpcAd && !linkedArticle && (
				<Adsense
					sticky={true}
					client={`ca-pub-${process.env.GOOGLE_ADSENSE_ID}`}
					slot="5182944308"
					currentUrlPath={currentUrlPath}
				/>
			)}
			{cpcAd && (
				<AdWrapper
					adCode={cpcAd.displayAd}
					sticky={true}
					callToActionMarker={false}
				/>
			)}
			{linkedArticle && (
				<div style={{ position: "sticky", top: 70 }}>
					<SideBarComponent
						type={"article"}
						headlineImage={linkedArticle.headlineImage}
						headlineImageAlt={linkedArticle.headlineImageAlt}
						headlineImagePath={linkedArticle.headlineImagePath}
						headlineImageCrop={linkedArticle.headlineImageCrop}
						headlineImageCropInfo={linkedArticle.headlineImageCropInfo}
						headline={linkedArticle.headline}
						category={linkedArticle.category}
						refPath={`/[category]/[url]/article/[id]`}
						contentLink={`/${linkedArticle.category}/${linkedArticle.urlDescription}/article/${linkedArticle.id}`}
						queryLinkCheck={true}
						query={{ ...query, utm_medium: "sidebarsmallsticky" }}
					/>
				</div>
			)}
		</>
	);
};
export default SideBarSmallContent;
SideBarSmallContent.propTypes = {
	data: PropTypes.array,
	loading: PropTypes.Boolean,
	queryLinkCheck: PropTypes.Boolean,
};
