import styles from "./styles/sideBarComponentStyles.module.sass";
import CloudImage from "../../Image/cloudImage";
import { getImagePath } from "../../helper/imageUrlHelper";
import CustomLink from "@components/Link/customLink";

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
	queryLinkCheck,
	query,
}) => {
	return (
		<article className={styles.sideContent} key={key}>
			<CustomLink
				pathname={refPath}
				alias={contentLink}
				queryLink={queryLinkCheck}
				query={query}
			>
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
			</CustomLink>
			<div className={styles.sideTitleInfo}>
				<h3 className={styles.sideTitle}>
					<CustomLink
						pathname={refPath}
						alias={contentLink}
						queryLink={queryLinkCheck}
						query={query}
					>
						<a className={styles.infoLink}>{headline}</a>
					</CustomLink>
					<div className={styles.categoryLinkWrapper}>
						<CustomLink
							pathname={refPath}
							alias={contentLink}
							queryLink={queryLinkCheck}
							query={query}
						>
							<a className={styles.categoryLink}>{category}</a>
						</CustomLink>
					</div>
				</h3>
			</div>
		</article>
	);
};
export default SideBarContent;
