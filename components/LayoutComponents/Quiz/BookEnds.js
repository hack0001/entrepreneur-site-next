import PropTypes from "prop-types";
import Embed from "../../Embed/Embed";
import styles from "./styles/bookEndStyles.module.sass";
import baseTheme from "../../../theme/baseTheme.json";
import Adsense from "../../ads/code/adsense/adsense";
import Reader from "../Editor/reader";

const QuizBookEnds = ({
	image,
	imageAlt,
	imagePath,
	imageAltAttribution,
	imageAltAttributionLink,
	imageCrop,
	imageCropInfo,
	title,
	details,
	position,
	embed,
	scoreComments,
	finalScore,
	numberQuestions,
	currentUrlPath,
	priority,
	cpcMarker,
}) => {
	const positionOpening = position === "opening";
	const positionClosing = position === "closing";
	const percentageScore = Number(finalScore) / Number(numberQuestions);
	const commentNumber = Math.ceil(
		(1 - percentageScore > 0 ? 1 - percentageScore : 0.01) *
			Object.keys(scoreComments).length,
		0,
	);
	return (
		<div className={styles.bookEndWrapper}>
			{positionClosing && (
				<h2 className={`${styles.sectionHeader} section-header`}>
					<div>
						Final Score: {finalScore} out of {numberQuestions}
					</div>
				</h2>
			)}
			{positionOpening && <h2 className={styles.sectionHeaderOpen}>{title}</h2>}
			<div className={styles.imageWrap}>
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
					priority={priority}
					wrapperClass={"contentWrapper"}
				/>
			</div>
			{positionClosing && (
				<h2 className={`${styles.sectionHeader} section-header`}>
					{scoreComments[`scoreComment${commentNumber}`]}
				</h2>
			)}
			<>
				<div className={styles.sectionParagraph}>
					<Reader value={details[0].children} quickView={cpcMarker} />
				</div>
				{positionClosing && <div className={styles.endHeader}>{title} </div>}
			</>
			{positionClosing && (
				<div className={styles.adsenseWrapper}>
					{/* QuestionBottomSquare */}
					<Adsense
						client={`ca-pub-${process.env.GOOGLE_ADSENSE_ID}`}
						slot="3992688547"
						currentUrlPath={currentUrlPath}
					/>
				</div>
			)}
			<style jsx>
				{`
					.section-header {
						color: ${commentNumber === 1
							? "#5bc20f"
							: commentNumber > 2
							? baseTheme.primary
							: baseTheme.secondary};
					}
				`}
			</style>
		</div>
	);
};
QuizBookEnds.propTypes = {
	position: PropTypes.string,
	image: PropTypes.string,
	imageAlt: PropTypes.string,
	imagePath: PropTypes.string,
	imageAltAttribution: PropTypes.string,
	imageAltAttributionLink: PropTypes.string,
	title: PropTypes.string,
	details: PropTypes.Object,
	embed: PropTypes.string,
	scoreComments: PropTypes.object,
	numberQuestions: PropTypes.Int,
};

QuizBookEnds.defaultProps = {
	details: [
		{
			type: "paragraph",
			children: [{ text: "" }],
		},
	],
};
export default QuizBookEnds;
