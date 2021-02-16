import { useState } from "react";
import PropTypes from "prop-types";
import Embed from "../../Embed/Embed";
import { UPDATE_QUIZ } from "../../../graphql/indivQuiz";
import QuizButton from "../../Button/QuizButton";
import LongAnswer from "./LongAnswer";
import prodRequest from "../../apiRequest/prodRequest";
import styles from "./styles/questionStyles.module.sass";
import SingleLoader from "../../Loading/SingleLoader";
import Adsense from "../../ads/code/adsense/adsense";
import adsenseStyles from "../../ads/code/adsense/adsenseStyles";
const Questions = ({
	total,
	questionData,
	position,
	linkImage,
	nextHref,
	id,
	currentScore,
	setCurrentScore,
	setQuestionsAnswered,
	questionsAnswered,
	questions,
	nextQuestionData,
	randomiseAnswers,
}) => {
	const [loading, setLoading] = useState(false);

	if (loading) return <SingleLoader />;
	return questionData.map(longQuestion => {
		const [showAnswer, setShowAnswer] = useState(false);
		const [buttonDisabled, setButtonDisabled] = useState(false);
		const [correct, setCorrect] = useState(false);

		const [selected, setSelected] = useState(false);
		const {
			answerImage,
			answerImageAlt,
			answerImageAttribution,
			answerImagePath,
			answerImageAttributionLink,
			answerImageCrop,
			answerImageCropInfo,
			correctAnswerDetails,
			inCorrectAnswerDetails,
			longAnswer,
			longFalseAnswer,
			question,
			questionImage,
			questionImageAlt,
			questionImagePath,
			questionImageAttribution,
			questionImageAttributionLink,
			questionPosition,
			questionImageCrop,
			questionImageCropInfo,
			correctAnswerComment,
			incorrectAnswerComment,
			showAnswerImage,
		} = longQuestion;
		const answerInfo = {
			...correctAnswerDetails,
			...inCorrectAnswerDetails,
		};

		const answerClick = (answer, answerDetail, correct) => {
			const answerType = correct
				? "correctAnswerDetails"
				: "inCorrectAnswerDetails";
			setShowAnswer(true);
			setButtonDisabled(true);
			setQuestionsAnswered(questionsAnswered + 1);
			//Add Votes down in Question Object
			const questionsObject = {
				...questions.questions,
				[questionPosition - 1]: {
					...longQuestion,
					[answerType]: {
						...longQuestion[answerType],
						[answerDetail]: {
							...answer,
							votes: answer.votes ? Number(answer.votes) + 1 : 1,
						},
					},
				},
			};

			const updateVotes = {
				id: id,
				questions: [
					JSON.stringify({
						...questions,
						questions: Object.keys(questionsObject).map(
							obj => questionsObject[obj],
						),
					}),
				],
			};

			try {
				const mutationData = {
					query: UPDATE_QUIZ,
					operationName: "UpdateProductionQuiz",
					variables: { input: updateVotes },
				};
				prodRequest(mutationData);
			} catch (err) {
				console.log("Error with request", err);
			}

			if (answer.correct) {
				setCorrect(true);
				setCurrentScore(currentScore + 1);
			}
		};

		return (
			<div className={styles.bookendWrapper}>
				<div className={styles.adsenseWrapper}>
					<Adsense
						client="ca-pub-2068760522034474"
						slot="4560498904"
						responsive={false}
						adStyle={adsenseStyles["maxHeight"]}
					/>
				</div>
				<div className={styles.sectionHeader}>
					<span className={styles.questionPosition}>{questionPosition}</span>
					{question}
				</div>
				<div>
					{(!showAnswer || (showAnswer && !showAnswerImage)) && (
						<div className={styles.easing}>
							<Embed
								embed={longQuestion["questionImage-embed"]}
								image={questionImage}
								imageAlt={questionImageAlt}
								imagePath={questionImagePath}
								imageAltAttribution={questionImageAttribution}
								imageAltAttributionLink={questionImageAttributionLink}
								imageCrop={questionImageCrop}
								imageCropInfo={questionImageCropInfo}
								styles={{ width: "100%", height: "100%" }}
								noMaxHeight={true}
								wrapperClass={"contentWrapper"}
							/>
						</div>
					)}
				</div>
				<div>
					{showAnswer && showAnswerImage && (
						<div className={styles.easing}>
							<Embed
								embed={longQuestion["answerImage-embed"]}
								image={answerImage}
								imageAlt={answerImageAlt}
								imagePath={answerImagePath}
								imageAltAttribution={answerImageAttribution}
								imageAltAttributionLink={answerImageAttributionLink}
								imageCrop={answerImageCrop}
								imageCropInfo={answerImageCropInfo}
								styles={{ width: "100%", height: "100%" }}
								noMaxHeight={true}
								wrapperClass={"contentWrapper"}
							/>
						</div>
					)}

					<div className={styles.multiWrapper}>
						<Adsense client="ca-pub-2068760522034474" slot="3992688547" />
					</div>
				</div>
				<div className={styles.sectionHeaderScore}>
					Current Score: {currentScore}
				</div>
				<div className={styles.answerWrap}>
					<QuizButton
						answerInfo={answerInfo}
						handleClick={answerClick}
						buttonDisabled={buttonDisabled}
						showAnswer={showAnswer}
						setShowAnswer={setShowAnswer}
						randomiseAnswers={randomiseAnswers}
						setSelected={setSelected}
						selected={selected}
						correct={correct}
						setCorrect={setCorrect}
					/>
				</div>
				<LongAnswer
					showAnswer={showAnswer}
					correct={correct}
					answer={longAnswer}
					correctAnswerComment={correctAnswerComment}
					incorrectAnswerComment={incorrectAnswerComment}
				/>
			</div>
		);
	});
};
Questions.propTypes = {
	total: PropTypes.Int,
	position: PropTypes.string,
	questions: PropTypes.Object,
};
export default Questions;
