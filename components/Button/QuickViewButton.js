import PropTypes from "prop-types";
import styles from "./styles/quickViewButtonStyles.module.sass";
import StaticImage from "@Image/staticImage";
import { getImagePath } from "../helper/imageUrlHelper";
import CustomLink from "@components/Link/customLink";
import Embed from "../Embed/Embed";
const QuickViewButton = ({
	label,
	optionalTitle,
	href,
	refPath,
	imgSrc,
	handler,
	imagePath,
	imageAlt,
	imageCrop,
	imageCropInfo,
	queryLinkCheck,
	query,
	currentScore,
	imageEmbed,
	cpcMarker,
}) => {
	return (
		<div className={styles.linkSection}>
			<button className={styles.linkButton} onClick={handler}>
				<CustomLink
					pathname={refPath}
					alias={href}
					queryLink={currentScore ? true : queryLinkCheck}
					query={currentScore ? { ...query, score: currentScore } : query}
				>
					<a className={styles.quickViewLink}>
						<div className={styles.imgWrapper}>
							<div className={styles.quickViewImage}>
								<Embed
									image={imgSrc}
									imagePath={imagePath ? imagePath : getImagePath(imgSrc)}
									imageAlt={imageAlt}
									imageCrop={imageCrop}
									imageCropInfo={imageCropInfo}
									styles={{ width: "100%", height: "100%" }}
									noMaxHeight={true}
									wrapperClass={"quickViewWrapper"}
									imageEmbed={imageEmbed}
									priority={false}
									currentPath={href}
									cpcMarker={cpcMarker}
								/>
							</div>
						</div>
						<div className={styles.labelWrapper}>
							<div className={styles.label}>
								<div className={styles.linkLabel}>{label}</div>
							</div>
							{optionalTitle && (
								<div className={styles.label}>
									<div className={styles.optionTitle}>{optionalTitle}</div>
								</div>
							)}
						</div>
						<div className={styles.arrowWrapper}>
							<div className={styles.insideWrapper}>
								<StaticImage
									styleClass={styles.arrow}
									src={"/static/newFatArrowRightWhitex128.png"}
									alt="right-arrow"
									height="58px"
									width="58px"
								/>
							</div>
						</div>
					</a>
				</CustomLink>
			</button>
		</div>
	);
};

QuickViewButton.defaultProps = {
	href: "/newsletter",
	handler: () => {},
};
QuickViewButton.propTypes = {
	href: PropTypes.String,
	label: PropTypes.String,
	imgSrc: PropTypes.String,
	imageAlt: PropTypes.String,
	handler: PropTypes.Func,
	imagePath: PropTypes.Array,
};

export default QuickViewButton;
