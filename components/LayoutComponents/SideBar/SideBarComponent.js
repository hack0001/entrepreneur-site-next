import Link from "next/link";
import styles from "./styles/sideBarComponentStyles.module.sass";
import CloudImage from "../../Image/cloudImage";
import { getImagePath } from "../../helper/imageUrlHelper";

const SideBarContent = ({
	key,
	headlineImage,
	headlineImageAlt,
	headlineImagePath,
	headlineImageCrop,
	headlineImageCropInfo,
	headline,
	category,
	refPath,
	contentLink,
}) => {
	return (
		<article
			// onMouseEnter={() => prefetchItem(contentLink)}
			className={styles.sideContent}
			key={key}
		>
			<Link href={refPath} as={contentLink}>
				<a className={styles.sideHeadlineAnchor}>
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
						wrapperClass={"sideBarWrapper"}
						fixedHeight={250}
						fixedWidth={250}
					/>
				</a>
			</Link>
			<div className={styles.sideTitleInfo}>
				<h3 className={styles.sideTitle}>
					<Link href={refPath} as={contentLink}>
						<a className={styles.infoLink}>{headline}</a>
					</Link>
					<div className={styles.categoryLinkWrapper}>
						<Link href={refPath} as={contentLink}>
							<a className={styles.categoryLink}>{category}</a>
						</Link>
					</div>
				</h3>
			</div>
		</article>
	);
};
export default SideBarContent;
