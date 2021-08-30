import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Embed from "../../Embed/Embed";
import { UPDATE_QUIZ_VOTES } from "../../../graphql/indivQuiz";
import QuizButton from "../../Button/QuizButton";
import LongAnswer from "./LongAnswer";
import prodRequest from "../../apiRequest/prodRequest";
import styles from "./styles/questionStyles.module.sass";
import SingleLoader from "../../Loading/SingleLoader";
import Adsense from "../../ads/code/adsense/adsense";

const Questions = ({
	total,
	questionData,
	position,
	id,
	currentScore,
	setCurrentScore,
	setQuestionsAnswered,
	questionsAnswered,
	questions,
	randomiseAnswers,
	currentUrlPath,
}) => {
	const [loading, setLoading] = useState(false);
	const [questionState, setQuestionState] = useState({});

	useEffect(() => {
		let ind = {};
		for (var i = 0; i < total; i++) {
			ind = { ...ind, [i]: {} };
		}

		setQuestionState(ind);
	}, [id]);

	if (loading) return <SingleLoader />;
	if (!questionState[total - 1]) return <SingleLoader />;

	return questionData.map((longQuestion, index) => {
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

		const answerClick = (
			questionNumber,
			answer,
			answerDetail,
			correct,
			totalVotes,
		) => {
			const answerType = correct
				? "correctAnswerDetails"
				: "inCorrectAnswerDetails";

			setQuestionsAnswered(questionsAnswered + 1);
			setQuestionState({
				...questionState,
				[questionNumber]: {
					...questionState[questionNumber],
					showAnswer: true,
					buttonDisabled: true,
					questionAnswered: true,
					selected: true,
				},
			});

			if (answer.correct) {
				setCurrentScore(currentScore + 1);
				setQuestionState({
					...questionState,
					[questionNumber]: {
						...questionState[questionNumber],
						correct: true,
						currentScore: questionState[questionNumber].currentScore + 1,
						showAnswer: true,
						buttonDisabled: true,
						questionAnswered: true,
						selected: true,
					},
				});
			}

			if (totalVotes < 50) {
				try {
					const mutationData = {
						query: UPDATE_QUIZ_VOTES,
						operationName: "UpdateProductionQuizVotes",
						variables: {
							input: {
								quizId: id,
								questionPosition: questionPosition - 1,
								answerType,
								answerDetail,
							},
						},
					};
					prodRequest(mutationData);
				} catch (err) {
					console.log("Error with request", err);
				}
			}
		};

		return (
			<div className={styles.bookendWrapper}>
				<div className={styles.sectionHeader}>
					<span className={styles.questionPosition}>{questionPosition}</span>
					{question}
				</div>
				<div>
					{(!questionState[index].showAnswer ||
						(questionState[index].showAnswer && !showAnswerImage)) && (
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
					{questionState[index].showAnswer && showAnswerImage && (
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
				</div>
				<div className={styles.sectionHeaderScore}>
					Current Score: {currentScore}
				</div>
				<div className={styles.answerWrap}>
					<QuizButton
						answerInfo={answerInfo}
						handleClick={answerClick}
						buttonDisabled={questionState[index].buttonDisabled}
						showAnswer={questionState[index].showAnswer}
						randomiseAnswers={randomiseAnswers}
						selected={questionState[index].selected}
						correct={questionState[index].correct}
						questionNumber={index}
					/>
				</div>
				<div>
					<LongAnswer
						showAnswer={questionState[index].showAnswer}
						correct={questionState[index].correct}
						answer={longAnswer}
						correctAnswerComment={correctAnswerComment}
						incorrectAnswerComment={incorrectAnswerComment}
					/>
				</div>
				<div className={styles.adsenseWrapper}>
					<Adsense
						client="ca-pub-2068760522034474"
						slot="3992688547"
						currentUrlPath={currentUrlPath}
						adStyle={"default"}
					/>
				</div>
			</div>
		);
	});
};
Questions.propTypes = {
	position: PropTypes.string,
};
export default Questions;
