import PropTypes from "prop-types";
import styles from "./styles/mainContentStyles.module.sass";
import CloudImage from "@Image/cloudImage";
import { getImagePath } from "../../helper/imageUrlHelper";
import CustomLink from "@components/Link/customLink";

const MainScrollingContent = ({
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
								fixedHeight={560}
								fixedWidth={760}
								wrapperClass={"mainWrapper"}
							/>
						</div>
					</div>
				</a>
			</CustomLink>
			<div className={styles.sideTitleInfo}>
				<h1 className={styles.sideTitle}>
					<CustomLink
						pathname={refPath}
						alias={contentLink}
						queryLink={queryLinkCheck}
						query={query}
					>
						<a className={styles.infoLink}>{headline}</a>
					</CustomLink>
					<h2 className={styles.sideTitle}>
						<CustomLink
							pathname={refPath}
							alias={contentLink}
							queryLink={queryLinkCheck}
							query={query}
						>
							{" "}
							<a className={styles.categoryLink}>{category}</a>
						</CustomLink>
					</h2>
				</h1>
			</div>
		</article>
	);
};
MainScrollingContent.propTypes = {
	category: PropTypes.String,
	headline: PropTypes.String,
	headlineImage: PropTypes.String,
	headlineImagePath: PropTypes.String,
	headlineImageAlt: PropTypes.String,
	index: PropTypes.int,
};
export default MainScrollingContent;
