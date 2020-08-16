import PropTypes from "prop-types";
import DynamicHeader from "../../Header/DynamicHeader";
import ShareButtonVert from "../../SocialMedia/ShareButtonsVert";
import { sideSocialButtons } from "../../SocialMedia/data";
import ShowMeta from "../../showMeta/showMeta";
import LazyLoad from "react-lazyload";
import styles from "./styles/quizHeadlineStyles.module.sass";

const QuizHeadline = ({ data, id, position, totalQuestions }) => {
	const {
		blurb,
		category,
		title,
		quizUrl,
		headlineImage,
		quizTitle,
		showDate,
		displayDate,
		showAuthor,
		authorName,
		quizTags,
	} = data[0];
	const canonical = `${process.env.SITE_ADDRESS}/${category}/${quizUrl}/quiz/${id}/questions/${position}`;
	const shareUrl = `${process.env.SITE_ADDRESS}/${category}/${quizUrl}/quiz/${id}/questions/opening`;

	const nextEndpoint =
		position === "opening"
			? 1
			: position === "closing"
			? null
			: Number(position) === Number(totalQuestions)
			? "closing"
			: Number(position) + 1;
	const prevEndpoint =
		position === "opening"
			? null
			: position === "closing"
			? Number(totalQuestions)
			: Number(position) === 1
			? "opening"
			: Number(position) - 1;
	const next =
		position === "closing"
			? null
			: `${process.env.SITE_ADDRESS}/${category}/${quizUrl}/quiz/${id}/questions/${nextEndpoint}`;
	const prev =
		position === "opening"
			? null
			: `${process.env.SITE_ADDRESS}/${category}/${quizUrl}/quiz/${id}/questions/${prevEndpoint}`;
	return (
		<div className={styles.bookendWrapper}>
			<DynamicHeader
				title={title}
				description={quizTitle}
				url={shareUrl}
				canonical={canonical}
				image={headlineImage}
				next={next}
				prev={prev}
				createdAt={displayDate}
				updatedAt={displayDate}
				tags={quizTags}
			/>
			<h1 className={styles.sectionHeading}>{title}</h1>
			<h3 className={styles.sectionCategory}>{category}</h3>
			<ShowMeta
				showDate={showDate}
				displayDate={displayDate}
				showAuthor={showAuthor}
				authorName={authorName}
			/>
			<LazyLoad once={true}>
				<ShareButtonVert
					data={sideSocialButtons}
					url={shareUrl}
					image={headlineImage}
					headline={title}
					brief={blurb}
				/>
			</LazyLoad>
		</div>
	);
};
QuizHeadline.propTypes = {
	data: PropTypes.Object,
	id: PropTypes.string,
	position: PropTypes.string,
	totalQuestions: PropTypes.int,
};
export default QuizHeadline;
