import PropTypes from "prop-types";
import styles from "../styles/ads/nextLinkStyles.module.sass";
import sideHelper from "../../../../helper/sideBarHelper";
import CloudImage from "../../../../Image/cloudImage";
import { getImagePath } from "../../../../helper/imageUrlHelper";
import Image from "next/image";
import CustomLink from "@components/Link/customLink";

const NextLink = ({ data, type, id, queryLinkCheck, query }) => {
	const {
		headlineImage,
		headlineImageAlt,
		headline,
		kicker,
		refPath,
		contentLink,
		headlineImagePath,
		headlineImageCrop,
		headlineImageCropInfo,
	} = sideHelper(data, type, true, id);
	return (
		<div className={styles.linkSection}>
			<div className={styles.scrollText}>{headline}</div>
			<div className={styles.linkButton}>
				<CustomLink
					pathname={refPath}
					alias={contentLink}
					queryLink={queryLinkCheck}
					query={query}
				>
					<a className={styles.quickViewLink}>
						<div className={styles.imgWrapper}>
							<div className={styles.quickViewImage}>
								<CloudImage
									imagePath={
										headlineImagePath
											? headlineImagePath
											: getImagePath(headlineImage)
									}
									imageAlt={headlineImageAlt}
									imageCrop={headlineImageCrop}
									imageCropInfo={headlineImageCropInfo}
									wrapperClass={"buttonWrapper"}
								/>
							</div>
						</div>
						<div className={styles.label}>
							<div className={styles.linkLabel}>{headline}</div>
							<div className={styles.linkLabelBrief}>{kicker}</div>
						</div>
						<div className={styles.arrowWrapper}>
							<Image
								className={styles.arrow}
								src={"/static/right-arrow.svg"}
								alt="right-arrow"
								height="58px"
								width="58px"
							/>
						</div>
					</a>
				</CustomLink>
			</div>
		</div>
	);
};

NextLink.defaultProps = {
	url: "/",
	image: process.env.SITE_IMAGE,
	title: "Next:",
};
NextLink.propTypes = {
	brief: PropTypes.String,
	headline: PropTypes.String,
	image: PropTypes.String,
	url: PropTypes.String,
	title: PropTypes.String,
	imageAlt: PropTypes.String,
	imagePath: PropTypes.String,
};

export default NextLink;
