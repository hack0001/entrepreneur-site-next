import PropTypes from "prop-types";
import Embed from "../../Embed/Embed";
import styles from "./styles/bookEndStyles.module.sass";
import Reader from "../Editor/reader";
const BookEnds = ({
	image,
	imageAlt,
	imagePath,
	imageAltAttribution,
	imageAltAttributionLink,
	imageCrop,
	imageCropInfo,
	showHeadlineImage,
	title,
	details,
	position,
	embed,
	priority,
}) => {
	return (
		<div className={styles.bookendWrapper}>
			<div>
				{position === "opening" && (
					<>
						<h2 className={styles.sectionHeader}>{title}</h2>
						<div className={styles.sectionParagraph}>
							<Reader value={details[0].children} />
						</div>
					</>
				)}
			</div>
			<div>
				{showHeadlineImage && (
					<Embed
						embed={embed}
						image={image}
						imageAlt={imageAlt}
						imagePath={imagePath}
						imageAltAttribution={imageAltAttribution}
						imageAltAttributionLink={imageAltAttributionLink}
						imageCrop={imageCrop}
						imageCropInfo={imageCropInfo}
						styles={{ width: "100%", height: "100%" }}
						noMaxHeight={true}
						wrapperClass={"contentWrapper"}
						priority={priority}
					/>
				)}
			</div>

			<div>
				{position === "closing" && (
					<>
						<h2 className={styles.sectionHeader}> {title}</h2>
						<div className={styles.sectionParagraph}>
							<Reader value={details[0].children} />
						</div>
					</>
				)}
			</div>
		</div>
	);
};
BookEnds.propTypes = {
	position: PropTypes.string,
	image: PropTypes.string,
	imageAlt: PropTypes.string,
	imagePath: PropTypes.string,
	imageAltAttribution: PropTypes.string,
	imageAltAttributionLink: PropTypes.string,
	title: PropTypes.string,
	details: PropTypes.Object,
	embed: PropTypes.string,
};
BookEnds.defaultProps = {
	details: [
		{
			type: "paragraph",
			children: [{ text: "" }],
		},
	],
};

export default BookEnds;
