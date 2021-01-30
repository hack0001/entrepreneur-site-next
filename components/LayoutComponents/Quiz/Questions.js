import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Embed from "../../Embed/Embed";
import { UPDATE_QUIZ } from "../../../graphql/indivQuiz";
import QuizButton from "../../Button/QuizButton";
import QuickViewButton from "../../Button/QuickViewButton";
import LongAnswer from "./LongAnswer";
import prodRequest from "../../apiRequest/prodRequest";
import styles from "./styles/questionStyles.module.sass";
import SingleLoader from "../../Loading/SingleLoader";
import dynamic from "next/dynamic";
import Adsense from "../../ads/code/adsense/adsense";
// import adsenseStyles from "../../ads/code/adsense/adsenseStyles";

const AdWrapper = dynamic(() => import("../../ads/adWrapper"), {
	ssr: false,
});
import { AMAZON_MUSIC_WIDE_BANNER } from "../../ads/code/amazonBusiness";

const Questions = ({
	total,
	questionData,
	position,
	linkImage,
	nextHref,
	id,
	currentScore,
	setCurrentScore,
	questions,
	nextQuestionData,
	randomiseAnswers,
}) => {
	const [showAnswer, setShowAnswer] = useState(false);
	const [buttonDisabled, setButtonDisabled] = useState(false);
	const [correct, setCorrect] = useState(false);
	const [loading, setLoading] = useState(false);
	const questionDetails = questionData[0];

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
	} = questionDetails;
	const answerInfo = {
		...correctAnswerDetails,
		...inCorrectAnswerDetails,
	};

	const [selected, setSelected] = useState(false);

	useEffect(() => {
		setLoading(false);
	}, [answerImage]);

	const answerClick = (answer, answerDetail, correct) => {
		const answerType = correct
			? "correctAnswerDetails"
			: "inCorrectAnswerDetails";
		setShowAnswer(true);
		setButtonDisabled(true);

		//Add Votes down in Question Object
		const questionsObject = {
			...questions.questions,
			[questionPosition - 1]: {
				...questionDetails,
				[answerType]: {
					...questionDetails[answerType],
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

	if (loading) return <SingleLoader />;

	return (
		<div className={styles.bookendWrapper}>
			<div className={styles.sectionHeader}>
				<span className={styles.questionPosition}>{questionPosition}</span>
				{question}
			</div>
			<div>
				{!showAnswer && (
					<div className={styles.easing}>
						<Embed
							embed={questionDetails["questionImage-embed"]}
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
				{showAnswer && (
					<div className={styles.easing}>
						<Embed
							embed={questionDetails["answerImage-embed"]}
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
					<Adsense
						client="ca-pub-2068760522034474"
						slot="3992688547"
						responsive={true}
					/>
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
			{showAnswer && (
				<QuickViewButton
					label="Next"
					imgSrc={
						nextQuestionData[0]
							? nextQuestionData[0].questionImage
							: questionImage
					}
					href={`${nextHref}?score=${currentScore}`}
					refPath={`/[category]/[url]/quiz/[quizId]/questions/[questionId]`}
					imagePath={
						nextQuestionData[0]
							? nextQuestionData[0].questionImagePath
							: questionImagePath
					}
					imageAlt={
						nextQuestionData[0]
							? nextQuestionData[0].questionImageAlt
							: questionImageAlt
					}
					handler={() => {
						setShowAnswer(false);
						setButtonDisabled(false);
						setSelected(false);
						setCorrect(false);
					}}
					imageCrop={
						nextQuestionData[0]
							? nextQuestionData[0].questionImageCrop
							: questionImageCrop
					}
					imageCropInfo={
						nextQuestionData[0]
							? nextQuestionData[0].questionImageCropInfo
							: questionImageCropInfo
					}
				/>
			)}
			<div>
				<AdWrapper adCode={AMAZON_MUSIC_WIDE_BANNER} />
			</div>
		</div>
	);
};
Questions.propTypes = {
	total: PropTypes.Int,
	position: PropTypes.string,
	questions: PropTypes.Object,
};
export default Questions;
