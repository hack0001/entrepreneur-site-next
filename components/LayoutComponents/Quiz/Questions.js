import { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import Embed from "../../Embed/Embed";
import { UPDATE_QUIZ_VOTES } from "../../../graphql/indivQuiz";
import QuizButton from "../../Button/QuizButton";
import NoLinkButton from "@components/Button/NoLinkButton";
import QuickViewButton from "../../Button/QuickViewButton";
import LongAnswer from "./LongAnswer";
import ProgressBar from "@components/progressBar/progressBar";
import prodRequest from "../../apiRequest/prodRequest";
import styles from "./styles/questionStyles.module.sass";
import SingleLoader from "../../Loading/SingleLoader";
import Adsense from "../../ads/code/adsense/adsense";
import Context from "@utils/Context";

const Questions = ({
	total,
	questionData,
	position,
	linkImage,
	nextHref,
	id,
	currentScore,
	setCurrentScore,
	// questions,
	nextQuestionData,
	randomiseAnswers,
	queryLinkCheck,
	query,
	currentUrlPath,
	priority,
	progressBar,
}) => {
	const [showAnswer, setShowAnswer] = useState(false);
	const [buttonDisabled, setButtonDisabled] = useState(false);
	const [correct, setCorrect] = useState(false);
	const [loading, setLoading] = useState(false);
	const { handleState } = useContext(Context);
	const questionDetails = questionData[0];
	const topTitleRef = useRef();

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
		showAnswerImage = true,
	} = questionDetails;
	const answerInfo = {
		...correctAnswerDetails,
		...inCorrectAnswerDetails,
	};
	const [selected, setSelected] = useState(false);

	useEffect(() => {
		setLoading(false);
	}, [answerImage]);

	useEffect(() => {
		if (process.env.NODE_ENV !== "development") {
			const y = topTitleRef.current.getBoundingClientRect().top;
			window.scrollTo({ top: y - 65, behaviour: "smooth" });
		}
	}, [position]);

	const answerClick = (index, answer, answerDetail, correct, totalVotes) => {
		const answerType = correct
			? "correctAnswerDetails"
			: "inCorrectAnswerDetails";
		setShowAnswer(true);
		setButtonDisabled(true);

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

		if (answer.correct) {
			setCorrect(true);
			setCurrentScore(currentScore + 1);
			handleState({ query: { ...query, score: currentScore + 1 } });
		}
	};

	if (loading) return <SingleLoader />;

	return (
		<div className={styles.bookendWrapper} ref={topTitleRef}>
			<div className={styles.sectionHeader}>
				<span className={styles.questionPosition}>{questionPosition}</span>
				{question}
			</div>
			<div>
				{(!showAnswer || (showAnswer && !showAnswerImage)) && (
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
							priority={priority}
						/>
					</div>
				)}
			</div>
			<div>
				{showAnswer && showAnswerImage && (
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
			{progressBar && (
				<div className={styles.progressWrapper}>
					<ProgressBar total={total} position={position} />
				</div>
			)}
			<LongAnswer
				showAnswer={showAnswer}
				correct={correct}
				answer={longAnswer}
				correctAnswerComment={correctAnswerComment}
				incorrectAnswerComment={incorrectAnswerComment}
				quickView={true}
			/>
			<div className={styles.adsenseWrapper}>
				<div>
					{/* QuestionsBottom */}
					<Adsense
						client={`ca-pub-${process.env.GOOGLE_ADSENSE_ID}`}
						slot="9944544648"
						responsive={true}
						currentUrlPath={currentUrlPath}
					/>
				</div>
				<>
					{!showAnswer && (
						<NoLinkButton
							label={"Select An Answer"}
							handler={e => {
								setShowAnswer(false);
								setButtonDisabled(false);
								setSelected(false);
								setCorrect(false);
							}}
						/>
					)}
					{showAnswer && (
						<QuickViewButton
							label={"Next"}
							imgSrc={
								nextQuestionData[0]
									? nextQuestionData[0].questionImage
									: linkImage
							}
							href={`${nextHref}`}
							refPath={`/[category]/[url]/quiz/[quizId]/questions/[questionId]`}
							imagePath={
								nextQuestionData[0] ? nextQuestionData[0].questionImagePath : ""
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
							queryLinkCheck={queryLinkCheck}
							query={query}
						/>
					)}
				</>
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
