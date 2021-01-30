import Link from "next/link";
import PropTypes from "prop-types";
import LazyLoad from "react-lazyload";
import styles from "./styles/mainContentStyles.module.sass";
import CloudImage from "../../Image/cloudImage";
import { getImagePath } from "../../helper/imageUrlHelper";
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
}) => {
	return (
		<article className={styles.sideContent} key={index}>
			<Link href={refPath} as={contentLink}>
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
			</Link>
			<div className={styles.sideTitleInfo}>
				<h1 className={styles.sideTitle}>
					<Link href={refPath} as={contentLink}>
						<a className={styles.infoLink}>{headline}</a>
					</Link>
					<h2 className={styles.sideTitle}>
						<Link href={refPath} as={contentLink}>
							<a className={styles.categoryLink}>{category}</a>
						</Link>
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
