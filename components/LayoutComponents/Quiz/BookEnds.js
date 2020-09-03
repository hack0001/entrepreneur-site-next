import PropTypes from "prop-types";
import Embed from "../../Embed/Embed";
import styles from "./styles/bookEndStyles.module.sass";
import baseTheme from "../../../theme/baseTheme.json";
import dynamic from "next/dynamic";

const MultiAdsWrapper = dynamic(() => import("../../ads/twoAdsWrapper"), {
	ssr: false,
});
const AdWrapper = dynamic(() => import("../../ads/adWrapper"), {
	ssr: false,
});

import {
	AMAZON_KINDLE_CODE_SQUARE,
	AMAZON_MUSIC_WIDE_BANNER,
} from "../../ads/code/amazonBusiness";
import { FIVERR_SQUARE } from "../../ads/code/fiverr";
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
	serialized,
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
			<div>
				<AdWrapper adCode={AMAZON_MUSIC_WIDE_BANNER} />
			</div>
			{positionClosing && (
				<h1 className={`${styles.sectionHeader} section-header`}>
					<div>
						Final Score: {finalScore} out of {numberQuestions}
					</div>
				</h1>
			)}
			{positionOpening && <h1 className={styles.sectionHeaderOpen}>{title}</h1>}
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
				/>
			</div>
			{positionClosing && (
				<h1 className={`${styles.sectionHeader} section-header`}>
					{scoreComments[`scoreComment${commentNumber}`]}
				</h1>
			)}
			<>
				<div className={styles.sectionParagraph}>
					<div
						className={styles.sectionParagraph}
						dangerouslySetInnerHTML={{
							__html: serialized,
						}}
					/>
				</div>
				{positionClosing && <div className={styles.endHeader}>{title}</div>}
			</>
			<div>
				<MultiAdsWrapper
					adCodeOne={AMAZON_KINDLE_CODE_SQUARE}
					adCodeTwo={FIVERR_SQUARE}
				/>
			</div>
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
	scoreComments: PropTypes.string,
	numberQuestions: PropTypes.Bool,
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
