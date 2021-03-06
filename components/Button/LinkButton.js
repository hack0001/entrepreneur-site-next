import PropTypes from "prop-types";
import CloudImage from "@Image/cloudImage";
import styles from "./styles/linkButtonStyles.module.sass";
import { getImagePath } from "../helper/imageUrlHelper";
import StaticImage from "@Image/staticImage";
import CustomLink from "@components/Link/customLink";

const SlideLinkButton = ({
	label,
	href,
	refPath,
	imgSrc,
	imagePath,
	imageAlt,
	imageCrop,
	imageCropInfo,
	queryLinkCheck,
	query,
}) => {
	return (
		<div className={styles.linkSection}>
			<div className={styles.scrollText}>
				Continue Scrolling to Keep Reading
			</div>
			<div className={styles.scrollText}>
				Click the button below to start the Slideshow.
			</div>
			<div className={styles.linkButton}>
				<CustomLink
					pathname={refPath}
					alias={href}
					queryLink={queryLinkCheck}
					query={query}
				>
					<a className={styles.quickViewLink}>
						<div className={styles.imgWrapper}>
							<div className={styles.quickViewImage}>
								<CloudImage
									imagePath={imagePath ? imagePath : getImagePath(imgSrc)}
									imageAlt={imageAlt}
									imageCrop={imageCrop}
									imageCropInfo={imageCropInfo}
									unsized={true}
									wrapperClass={"quickViewWrapper"}
								/>
							</div>
						</div>
						<div className={styles.label}>
							<div className={styles.linkLabel}>{label}</div>
						</div>
						<div className={styles.arrowWrapper}>
							<StaticImage
								styleClass={styles.arrow}
								alt="right-arrow"
								src={"/static/newFatArrowRightBlackx128.png"}
								height="128px"
								width="128px"
							/>
						</div>
					</a>
				</CustomLink>
			</div>
		</div>
	);
};

SlideLinkButton.defaultProps = {
	href: "/newsletter",
};
SlideLinkButton.propTypes = {
	href: PropTypes.String,
	label: PropTypes.String,
	imgSrc: PropTypes.String,
	imageAlt: PropTypes.String,
	imagePath: PropTypes.String,
};

export default SlideLinkButton;
