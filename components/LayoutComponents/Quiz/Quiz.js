import SectionBar from "../SectionBar";
import PropTypes from "prop-types";
import { theme } from "../../../theme/baseCss";
import BookEnds from "./BookEnds";
import Questions from "./Questions";
import ErrorLoader from "../Error";
import Headline from "./QuizHeadline";
import QuickViewButton from "../../Button/QuickViewButton";
import ScrollUpButton from "../ScrollUpButton/ScrollUpButton";
import Crumbs from "../Crumbs/crumbs";
import ShareButtonHoriz from "../../SocialMedia/ShareButtonsHoriz";
import { closingSocialButtons } from "../../SocialMedia/data";
import QuickEmailSignUp from "../../SignUpModal/quickEmailSignup";
import FacebookComments from "../../SocialMedia/FacebookComments";

const QuizDetails = ({ content, position, url, id, score }) => {
	const details = JSON.parse(content.overview);
	const questions = JSON.parse(content.questions);
	const {
		category,
		title,
		blurb,
		scoreCommentsDetails,
		headlineImage,
	} = details[0];
	const positionNumber = Number(position);

	if (
		positionNumber > content.numQuestions &&
		position !== "opening" &&
		position !== "closing"
	) {
		return <ErrorLoader />;
	}

	const nextHref = `/${url}/quiz/${id}/questions`;
	const shareUrl = `${process.env.SITE_ADDRESS}/${url}/quiz/${id}/questions/opening`;

	const quizEndRef =
		positionNumber + 1 === content.numQuestions + 1
			? "closing"
			: positionNumber + 1;

	return (
		<div className="section-padding">
			<SectionBar title={`${category}`} titleColor="#111" titleSize="1.5rem" />
			<Headline
				data={details}
				id={id}
				position={position}
				totalQuestions={content.numQuestions}
			/>

			{(position === "opening" || position === "closing") && (
				<>
					<BookEnds
						position={position}
						image={questions[position][0][`${position}Image`]}
						imageAlt={questions[position][0][`${position}ImageAlt`]}
						imageAltAttribution={
							questions[position][0][`${position}ImageAttribution`]
						}
						imageAltAttributionLink={
							questions[position][0][`${position}ImageAttributionLink`]
						}
						title={questions[position][0][`${position}`]}
						details={
							questions[position][0][`${position}QuizDetails`]
								? JSON.parse(questions[position][0][`${position}QuizDetails`])
								: undefined
						}
						embed={questions[position][0][`${position}Image-embed`]}
						scoreComments={scoreCommentsDetails}
						finalScore={score}
						numberQuestions={content.numQuestions}
					/>
					{position === "opening" && (
						<QuickViewButton
							label="Start"
							imgSrc={details[0].headlineImage}
							href={`${nextHref}/1`}
						/>
					)}
				</>
			)}
			{position !== "opening" && position !== "closing" && (
				<Questions
					total={content.numQuestions}
					questionData={questions.questions.filter(
						x => x.questionPosition === positionNumber,
					)}
					position={position}
					linkImage={headlineImage}
					nextHref={`${nextHref}/${quizEndRef}`}
					id={id}
					currentScore={score}
					questions={questions}
				/>
			)}
			<ScrollUpButton />
			<hr className="break" />
			<ShareButtonHoriz
				data={closingSocialButtons}
				url={shareUrl}
				image={headlineImage}
				headline={title}
				brief={blurb}
			/>
			<hr className="break" />
			<Crumbs
				home={process.env.SITE_ADDRESS}
				category={category}
				headline={title}
				headlineUrl={url}
			/>
			<QuickEmailSignUp />
			{position === "closing" && (
				<>
					<SectionBar
						title="Leave a Comment"
						titleColor="#111"
						titleSize="2rem"
					/>
					<FacebookComments
						url={url}
						numPostsVisible={5}
						orderBy="reverse_time"
					/>
				</>
			)}
			<SectionBar title="Latest" titleColor="#111" titleSize="2rem" />
			<hr className="break" />
			<style jsx>
				{`
					.break {
						border: 1px solid #dedede;
						width: 100%;
						margin: 0 auto;
					}
					.headline-image {
						max-height: 550px;
					}
					.section-padding {
						display: flex;
						flex-direction: column;
						margin: 0.15rem 2rem;
					}
					.section-brief {
						margin: 1.5rem 0;
						padding: 0;
						font-size: 1.45rem;
						font-weight: 300;
						line-height: 2rem;
						color: ${theme.secondary};
						text-transform: capitalize;
						font-family: ${theme.secondaryFont};
					}
					.section-list {
						margin: 0rem 1rem 1rem 1rem;
						padding: 0;
						font-size: 1.45rem;
						font-weight: 300;
						color: ${theme.secondary};
						text-transform: capitalize;
						font-family: ${theme.secondaryFont};
					}
					ul {
						margin: 0;
					}
				`}
			</style>
		</div>
	);
};

QuizDetails.propTypes = {
	content: PropTypes.object,
	position: PropTypes.string,
	overview: PropTypes.object,
	url: PropTypes.string,
	id: PropTypes.string,
};
export default QuizDetails;
