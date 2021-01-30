import Link from "next/link";
import styles from "./styles/sideBarSmallComponentStyles.module.sass";
import CloudImage from "../../Image/cloudImage";
import { getImagePath } from "../../helper/imageUrlHelper";
const SideBarContent = ({
	key,
	headlineImage,
	headlineImageAlt,
	headline,
	headlineImagePath,
	headlineImageCrop,
	headlineImageCropInfo,
	category,
	refPath,
	contentLink,
}) => {
	return (
		<article className={styles.sideContent} key={key}>
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
								fixedHeight={441}
								fixedWidth={750}
								wrapperClass={"sideBarSmallWrapper"}
							/>
						</div>
					</div>
				</a>
			</Link>
			<div className={styles.sideTitleInfo}>
				<Link href={refPath} as={contentLink}>
					<a className={styles.infoLink}>{headline}</a>
				</Link>
				<div className={styles.sideTitle}>
					<div className={styles.sideTitle}>
						<Link href={refPath} as={contentLink}>
							<a className={styles.categoryLink}>{category}</a>
						</Link>
					</div>
				</div>
			</div>
		</article>
	);
};
export default SideBarContent;
