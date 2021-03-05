import { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import Ripples from "./Ripples";
import styles from "./styles/quizButtonStyles.module.sass";
import baseTheme from "../../theme/baseTheme.json";
const QuizButton = ({
	answerInfo,
	handleClick,
	buttonDisabled,
	buttonColor,
	showAnswer,
	randomiseAnswers,
	selected,
	questionNumber,
}) => {
	const [answers, setAnswers] = useState(
		Object.keys(answerInfo).sort((a, b) => a.answer - b.answer),
	);
	const [totalVotes, setTotalVotes] = useState(0);

	useEffect(() => {
		setTotalVotes(
			Object.values(answerInfo).reduce(
				(runn, val) => runn + Number(val.votes),
				0,
			),
		);
	}, [answerInfo]);

	useEffect(() => {
		if (randomiseAnswers) {
			setAnswers(answers.sort(() => Math.random() - 0.5));
		} else {
			const nonRandomAnswers = Object.keys(answerInfo)
				.map(keyVal => {
					return {
						[keyVal]: answerInfo[keyVal].answer,
						answer: answerInfo[keyVal].answer,
					};
				})
				.sort((a, b) => a.answer.localeCompare(b.answer));
			let newOrderAnswers = [];
			nonRandomAnswers.map(answerRandom => {
				return Object.keys(answerRandom).map(answ => {
					if (answ !== "answer") {
						newOrderAnswers.push(answ);
					}
				});
			});
			setAnswers(newOrderAnswers);
		}
	}, [answerInfo]);

	return answers.map((currentAnswer, index) => {
		const answer = answerInfo[currentAnswer];
		const correct = answerInfo[currentAnswer].correct;
		const answerDetails = currentAnswer;
		const classCorrect =
			correct && showAnswer
				? styles.quizCorrectSection
				: `${styles.quizSection} quiz-section`;
		const secondClassCorrect =
			correct && showAnswer
				? `${styles.percentageBarAnimation} percentage-bar-animation-width`
				: showAnswer
				? `${styles.percentageBarAnimation} percentage-bar-animation-width`
				: null;

		const percentageAnswers = Math.round(
			(!answer.votes && answer.correct
				? 0
				: !answer.votes && !answer.incorrect
				? 0
				: Number(answer.votes) / totalVotes
				? Number(answer.votes) / totalVotes
				: 1) * 100,
			0,
		);

		return (
			<div className={styles.buttonWrapper} key={index}>
				<Ripples
					color={baseTheme.quizRipple}
					styling={{ borderRadius: "25px", margin: "0.5rem 0rem 0rem 0rem" }}
				>
					<button
						className={classCorrect}
						onClick={() => {
							handleClick(questionNumber, answer, answerDetails, correct);
						}}
						disabled={buttonDisabled}
					>
						<div className={`${styles.quizButtonOverlay} quiz-button-overlay`}>
							<div className={`${styles.percentageBar} percentage-bar-width`}>
								<div className={secondClassCorrect}></div>
							</div>

							<div className={styles.label}>
								<div className={styles.quizLabel}>{answer.answer}</div>
							</div>
							{showAnswer && (
								<div className={`${styles.percentageLabel} percentage-label`}>
									<div
										className={`${styles.percentageLabelAnswer} percentage-label-answer`}
									>
										{percentageAnswers}%
									</div>
								</div>
							)}
						</div>
						<style jsx>{`
							.percentage-bar-width {
								width: ${percentageAnswers}%;
							}
							.percentage-bar-animation-width {
								background: ${correct && showAnswer
									? "#5bc20f"
									: `rgba(255,255,255,0.2);`};
							}
							.percentage-label {
								color: ${correct && showAnswer ? "#5bc20f" : baseTheme.primary};
							}
							.quiz-button-overlay {
								border-bottom: ${selected && !correct
									? `4px solid ${baseTheme.primary},`
									: "none"};
							}

							.quiz-section:hover {
								opacity: ${buttonDisabled ? "1" : "0.7"};
								border: none;
							}
						`}</style>
					</button>
				</Ripples>
			</div>
		);
	});
};

QuizButton.propTypes = {
	answer: PropTypes.String,
	handleClick: PropTypes.Func,
	buttonDisabled: PropTypes.Bool,
	buttonColor: PropTypes.String,
};

export default QuizButton;
