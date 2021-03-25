import PropTypes from "prop-types";
import styles from "./styles/subContentStyles.module.sass";
import CloudImage from "@Image/cloudImage";
import { getImagePath } from "../../helper/imageUrlHelper";
import CustomLink from "@components/Link/customLink";
const SubScrollingContent = ({
	category,
	headline,
	headlineImage,
	headlineImageAlt,
	headlineImagePath,
	headlineImageCrop,
	headlineImageCropInfo,
	index,
	contentLink,
	refPath,
	kicker,
	queryLinkCheck,
	query,
}) => {
	return (
		<article className={styles.sideContent} key={index}>
			<CustomLink
				pathname={refPath}
				alias={contentLink}
				queryLink={queryLinkCheck}
				query={query}
				index={index}
			>
				<a className={styles.sideHeadlineAnchor}>
					<div className={styles.sideImageWrapper}>
						<div className={styles.sideImageMain}>
							<CloudImage
								imagePath={
									headlineImagePath
										? headlineImagePath
										: getImagePath(headlineImage)
								}
								imageAlt={headlineImageAlt}
								imageCrop={headlineImageCrop}
								imageCropInfo={headlineImageCropInfo}
								unsized={true}
								wrapperClass={"cloudWrapper"}
								fixedHeight={441}
								fixedWidth={750}
							/>
						</div>
					</div>
				</a>
			</CustomLink>
			<div className={styles.sideTitleInfo}>
				<CustomLink
					pathname={refPath}
					alias={contentLink}
					queryLink={queryLinkCheck}
					query={query}
				>
					<div className={styles.sideTitle}>
						<a className={styles.infoLink}>{headline}</a>
						<div className={styles.kickerWrap}>
							<a className={styles.kicker}>{kicker}</a>
						</div>
						<div className={styles.sideTitle}>
							<a className={styles.categoryLink}>{category}</a>
						</div>
					</div>
				</CustomLink>
			</div>
		</article>
	);
};
SubScrollingContent.propTypes = {
	category: PropTypes.String,
	headline: PropTypes.String,
	headlineImagePath: PropTypes.String,
	headlineImage: PropTypes.String,
	headlineImageAlt: PropTypes.String,
	index: PropTypes.int,
};
export default SubScrollingContent;
