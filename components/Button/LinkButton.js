import PropTypes from "prop-types";
import Link from "next/link";
import CloudImage from "../Image/cloudImage";
import styles from "./styles/linkButtonStyles.module.sass";
import { getImagePath } from "../helper/imageUrlHelper";
const SlideLinkButton = ({
	label,
	href,
	refPath,
	imgSrc,
	imagePath,
	imageAlt,
	imageCrop,
	imageCropInfo,
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
				<Link href={refPath} as={href}>
					<a className={styles.quickViewLink}>
						<div className={styles.imgWrapper}>
							<div className={styles.quickViewImage}>
								<CloudImage
									imagePath={imagePath ? imagePath : getImagePath(imgSrc)}
									imageAlt={imageAlt}
									layout={"nextButton"}
									imageCrop={imageCrop}
									imageCropInfo={imageCropInfo}
								/>
							</div>
						</div>
						<div className={styles.label}>
							<div className={styles.linkLabel}>{label}</div>
						</div>
						<div className={styles.arrowWrapper}>
							<img
								className={styles.arrow}
								alt="right-arrow"
								src={"/static/fatArrowRightBlackx128.png"}
							/>
						</div>
					</a>
				</Link>
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
