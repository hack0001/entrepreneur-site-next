import styles from "./styles/sideBarSmallComponentStyles.module.sass";
import CloudImage from "@Image/cloudImage";
import { getImagePath } from "../../helper/imageUrlHelper";
import CustomLink from "@components/Link/customLink";

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
			</CustomLink>
			<div className={styles.sideTitleInfo}>
				<CustomLink
					pathname={refPath}
					alias={contentLink}
					queryLink={queryLinkCheck}
					query={query}
				>
					<a className={styles.infoLink}>{headline}</a>
				</CustomLink>
				<div className={styles.sideTitle}>
					<div className={styles.sideTitle}>
						<CustomLink
							pathname={refPath}
							alias={contentLink}
							queryLink={queryLinkCheck}
							query={query}
						>
							<a className={styles.categoryLink}>{category}</a>
						</CustomLink>
					</div>
				</div>
			</div>
		</article>
	);
};
export default SideBarContent;
