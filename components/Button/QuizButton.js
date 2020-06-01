import { useState } from "react";
import PropTypes from "prop-types";
import Ripples from "./Ripples";
import styles from "./styles/quizButtonStyles.module.sass";
import baseTheme from "../../theme/baseTheme.json";
const QuizButton = ({
	answer,
	handleClick,
	buttonDisabled,
	buttonColor,
	correct,
	showAnswer,
	totalVotes,
	answerDetails,
}) => {
	const [selected, setSelected] = useState(false);
	const classCorrect =
		correct && showAnswer
			? `{${styles.quizCorrectSection}}`
			: `${styles.quizSection} quiz-section`;
	const secondClassCorrect =
		correct && showAnswer
			? "percentage-bar-animation-width"
			: showAnswer
			? "percentage-bar-animation-width"
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
		<Ripples
			color={baseTheme.quizRipple}
			styling={{ borderRadius: "25px", margin: "0.5rem 0rem 0rem 0rem" }}
		>
			<button
				className={classCorrect}
				onClick={() => {
					handleClick(answer, answerDetails, correct);
					setSelected(true);
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
	);
};

QuizButton.propTypes = {
	answer: PropTypes.String,
	handleClick: PropTypes.Func,
	buttonDisabled: PropTypes.Bool,
	buttonColor: PropTypes.String,
};

export default QuizButton;
