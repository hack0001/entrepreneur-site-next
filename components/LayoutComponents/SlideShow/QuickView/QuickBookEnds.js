import PropTypes from "prop-types";
import Embed from "../../../Embed/Embed";
import styles from "./styles/quickBookEndStyles.module.sass";
import Adsense from "../../../ads/code/adsense/adsense";
import Reader from "../../Editor/reader";
const BookEnds = ({
	image,
	imageAlt,
	imagePath,
	imageAltAttribution,
	imageAltAttributionLink,
	title,
	details,
	embed,
	currentUrlPath,
	position,
}) => {
	return (
		<div className={styles.bookEndWrapper}>
			<div>
				<Adsense
					client={`ca-pub-${process.env.GOOGLE_CODE_ID}`}
					slot="3049705177"
					responsive={true}
					adStyle={"adHeadline"}
					adWrapperStyle={"adTopHeadline"}
					adWrap={"adHeadWrap"}
					currentUrlPath={currentUrlPath}
				/>
			</div>
			<h2 className={styles.sectionHeader}>{title}</h2>
			{position === "opening" && (
				<div className={styles.imageWrap}>
					<Embed
						embed={embed}
						image={image}
						imageAlt={imageAlt}
						imageAltAttribution={imageAltAttribution}
						imageAltAttributionLink={imageAltAttributionLink}
						imagePath={imagePath}
						styles={{ width: "100%", height: "100%" }}
						noMaxHeight={true}
						wrapperClass={"contentWrapper"}
						priority={true}
					/>
				</div>
			)}
			<div className={styles.deskSectionParagraph}>
				<Reader value={details[0].children} quickView={true} />
			</div>
			{position === "closing" && (
				<div className={styles.imageWrap}>
					<Embed
						embed={embed}
						image={image}
						imageAlt={imageAlt}
						imageAltAttribution={imageAltAttribution}
						imageAltAttributionLink={imageAltAttributionLink}
						imagePath={imagePath}
						styles={{ width: "100%", height: "100%" }}
						noMaxHeight={true}
						wrapperClass={"contentWrapper"}
						priority={true}
					/>
				</div>
			)}
			<div className={styles.mobSectionParagraph}>
				<Reader value={details[0].children} quickView={true} />
			</div>

			<div className={styles.adWrap}>
				<Adsense
					client={`ca-pub-${process.env.GOOGLE_CODE_ID}`}
					slot="1874540097"
					adStyle={"default"}
					responsive={true}
					currentUrlPath={currentUrlPath}
				/>
			</div>
		</div>
	);
};
BookEnds.propTypes = {
	position: PropTypes.string,
	image: PropTypes.string,
	imageAlt: PropTypes.string,
	imageAltAttribution: PropTypes.string,
	imagePath: PropTypes.string,
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
