import PropTypes from "prop-types";
import styles from "./styles/longAnswerStyles.module.sass";
import Reader from "../Editor/reader";
import StaticImage from "@Image/staticImage";

const LongAnswer = ({
	showAnswer,
	correct,
	answer,
	correctAnswerComment,
	incorrectAnswerComment,
}) => {
	return (
		<div className={styles.bookendWrapper}>
			{showAnswer && (
				<div className={styles.editorAnswer}>
					<div>
						{correct && (
							<div className={styles.correct}>
								<div className={styles.correctGroup}>
									<div className={styles.correctImage}>
										<StaticImage
											styleClass={styles.correctImageWrap}
											src={"/static/tickx128.png"}
											alt="correct-tick-icon"
											width="55px"
											height="55px"
										/>
									</div>
								</div>
							</div>
						)}
						{!correct && (
							<div className={styles.correct}>
								<div className={styles.correctGroup}>
									<div className={styles.correctGroup}>
										<div className={styles.incorrectImage}>
											<StaticImage
												styleClass={styles.incorrectImage}
												src={"/static/deletex128.png"}
												alt="incorrect-cross-icon"
												width="55px"
												height="55px"
											/>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
					<div className={styles.editorBlock}>
						<div className={styles.answerComment}>
							<div className={styles.answerCommentHeader}>
								{correct ? correctAnswerComment : incorrectAnswerComment}
							</div>
						</div>
						{answer && (
							<div>
								<Reader value={answer[0].children} />
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};
LongAnswer.propTypes = {
	showAnswer: PropTypes.Bool,
	correct: PropTypes.Bool,
	answer: PropTypes.String,
	correctAnswerComment: PropTypes.String,
	incorrectAnswerComment: PropTypes.String,
};

LongAnswer.defaultProps = {
	details: [
		{
			type: "paragraph",
			children: [{ text: "" }],
		},
	],
};
export default LongAnswer;
