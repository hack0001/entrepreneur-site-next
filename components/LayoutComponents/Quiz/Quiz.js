import { useState, useEffect, useContext } from "react";
import SectionBar from "../SectionBar";
import PropTypes from "prop-types";
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
import LazyLoad from "react-lazyload";
import ScrollingContent from "../ScrollingContent/ScrollingContent";
import styles from "./styles/quizStyles.module.sass";
import dynamic from "next/dynamic";
import Context from "../../../utils/Context";
import LongQuestions from "./LongQuestions";
import Cookie from "js-cookie";
import prodRequest from "../../apiRequest/prodRequest";
import { UPDATE_QUIZ } from "../../../graphql/indivQuiz";
const AdWrapper = dynamic(() => import("../../ads/adWrapper"), {
	ssr: false,
});
import { AMAZON_MUSIC_WIDE_BANNER } from "../../ads/code/amazonBusiness";
import Adsense from "../../ads/code/adsense/adsense";
import adsenseStyles from "../../ads/code/adsense/adsenseStyles";
import { filterUnique } from "../../../utils/handler";

const QuizDetails = ({ content, position, url, id, score, nextQuiz }) => {
	const details = JSON.parse(content.overview);
	const questions = JSON.parse(content.questions);
	const { sessionQuizIds } = useContext(Context);
	const { viewCount } = content;
	const [cpcMarker, setCpcMarker] = useState(false);
	const filterArray = sessionQuizIds.concat({ id });
	const nextContent = filterUnique(nextQuiz.items, filterArray);
	const {
		category,
		title,
		blurb,
		scoreCommentsDetails,
		headlineImage,
		randomiseAnswers,
	} = details[0];
	const positionNumber = Number(position);
	const [currentScore, setCurrentScore] = useState(0);
	const [questionsAnswered, setQuestionsAnswered] = useState(0);

	useEffect(() => {
		setCurrentScore(0);

		const updatedCount = viewCount ? Number(viewCount) + 1 : 1;

		try {
			const mutationData = {
				query: UPDATE_QUIZ,
				operationName: "UpdateProductionQuiz",
				variables: {
					input: {
						id,
						viewCount: JSON.stringify(updatedCount),
					},
				},
			};
			prodRequest(mutationData);
		} catch (err) {
			console.log("Error with request", err);
		}
	}, [id]);

	useEffect(() => {
		const cpcMarker = Cookie.get("CPC") ? JSON.parse(Cookie.get("CPC")) : false;
		setCpcMarker(cpcMarker);
	}, []);

	if (
		positionNumber > content.numQuestions &&
		position !== "opening" &&
		position !== "closing"
	) {
		return <ErrorLoader />;
	}

	const cookieSetup = () => {
		Cookie.set("CPC", JSON.stringify(true), {
			expires: 0.25,
		});
		setCpcMarker(true);
	};

	const nextHref = `/${category}/${url}/quiz/${id}/questions`;
	const shareUrl = `${process.env.SITE_ADDRESS}/${category}/${url}/quiz/${id}/questions/opening`;
	const commentsUrl = `${process.env.SITE_ADDRESS}/${category}/${url}/quiz/${id}/questions/closing`;
	const nextQuizHref = nextContent[0]
		? `/${nextContent[0].category}/${nextContent[0].urlDescription}/quiz/${nextContent[0].id}/questions/opening`
		: "";

	const quizEndRef =
		positionNumber + 1 === content.numQuestions + 1
			? "closing"
			: positionNumber + 1;
	return (
		<div className={styles.sectionPadding}>
			<SectionBar title={`${category}`} titleColor="#111" titleSize="1rem" />
			{(cpcMarker || (!cpcMarker && position !== "opening")) && (
				<>
					<div>
						<Headline
							data={details}
							id={id}
							position={position}
							totalQuestions={content.numQuestions}
							cpcMarker={cpcMarker}
						/>

						{(position === "opening" || position === "closing") && (
							<>
								<BookEnds
									position={position}
									image={questions[position][0][`${position}Image`]}
									imageAlt={questions[position][0][`${position}ImageAlt`]}
									imagePath={questions[position][0][`${position}ImagePath`]}
									imageAltAttribution={
										questions[position][0][`${position}ImageAttribution`]
									}
									imageAltAttributionLink={
										questions[position][0][`${position}ImageAttributionLink`]
									}
									imageCrop={questions[position][0][`${position}ImageCrop`]}
									imageCropInfo={
										questions[position][0][`${position}ImageCropInfo`]
									}
									title={questions[position][0][`${position}`]}
									details={
										questions[position][0][`${position}QuizDetails`]
											? questions[position][0][`${position}QuizDetails`]
											: undefined
									}
									embed={questions[position][0][`${position}Image-embed`]}
									scoreComments={scoreCommentsDetails}
									finalScore={currentScore}
									numberQuestions={content.numQuestions}
								/>
								{position === "opening" && (
									<div className={styles.openingButton}>
										<QuickViewButton
											label="Start"
											imgSrc={details[0].headlineImage}
											imagePath={details[0].headlineImagePath}
											imageCrop={details[0].headlineImageCrop}
											imageCropInfo={details[0].headlineImageCropInfo}
											href={`${nextHref}/1`}
											refPath={`/[category]/[url]/quiz/[quizId]/questions/[questionId]`}
											imageAlt={details[0].headlineImageAlt}
										/>
									</div>
								)}
								{position === "closing" && nextContent[0] && (
									<div className={styles.openingButton}>
										<QuickViewButton
											label="Next"
											optionalTitle={nextContent[0].headline}
											imgSrc={nextContent[0].headlineImage}
											imagePath={nextContent[0].headlineImagePath}
											imageCrop={nextContent[0].headlineImageCrop}
											imageCropInfo={nextContent[0].headlineImageCropInfo}
											href={nextQuizHref}
											refPath={`/[category]/[url]/quiz/[quizId]/questions/[questionId]`}
											imageAlt={nextContent[0].headlineImageAlt}
										/>
									</div>
								)}
							</>
						)}

						<div className={styles.adsenseWrapper}>
							<Adsense
								client="ca-pub-2068760522034474"
								slot="4560498904"
								responsive={false}
								adStyle={adsenseStyles["maxHeight"]}
							/>
						</div>
						<div>
							{position !== "opening" && position !== "closing" && (
								<Questions
									total={content.numQuestions}
									questionData={questions.questions.filter(
										x => x.questionPosition === positionNumber,
									)}
									nextQuestionData={questions.questions.filter(
										x => x.questionPosition === positionNumber + 1,
									)}
									position={position}
									linkImage={headlineImage}
									nextHref={`${nextHref}/${quizEndRef}`}
									id={id}
									currentScore={currentScore}
									setCurrentScore={setCurrentScore}
									questions={questions}
									randomiseAnswers={randomiseAnswers}
									cpcMarker={cpcMarker}
								/>
							)}
						</div>
					</div>
				</>
			)}

			{!cpcMarker && (
				<>
					<Headline
						data={details}
						id={id}
						position={position}
						totalQuestions={content.numQuestions}
						cpcMarker={cpcMarker}
					/>

					<BookEnds
						position={"opening"}
						image={questions["opening"][0][`openingImage`]}
						imageAlt={questions["opening"][0][`openingImageAlt`]}
						imagePath={questions["opening"][0][`openingImagePath`]}
						imageAltAttribution={
							questions["opening"][0][`openingImageAttribution`]
						}
						imageAltAttributionLink={
							questions["opening"][0][`openingImageAttributionLink`]
						}
						imageCrop={questions["opening"][0][`openingImageCrop`]}
						imageCropInfo={questions["opening"][0][`openingImageCropInfo`]}
						title={questions["opening"][0][`opening`]}
						details={
							questions["opening"][0][`openingQuizDetails`]
								? questions["opening"][0][`openingQuizDetails`]
								: undefined
						}
						embed={questions["opening"][0][`openingImage-embed`]}
						scoreComments={scoreCommentsDetails}
						finalScore={currentScore}
						numberQuestions={content.numQuestions}
					/>

					<LongQuestions
						total={content.numQuestions}
						questionData={questions.questions}
						position={position}
						linkImage={headlineImage}
						nextHref={`${nextHref}/${quizEndRef}`}
						id={id}
						currentScore={currentScore}
						setCurrentScore={setCurrentScore}
						setQuestionsAnswered={setQuestionsAnswered}
						questionsAnswered={questionsAnswered}
						questions={questions}
						randomiseAnswers={randomiseAnswers}
					/>
					<div>
						<AdWrapper adCode={AMAZON_MUSIC_WIDE_BANNER} />
					</div>
					{questionsAnswered === content.numQuestions && (
						<>
							<BookEnds
								position={"closing"}
								image={questions["closing"][0][`closingImage`]}
								imageAlt={questions["closing"][0][`closingImageAlt`]}
								imagePath={questions["closing"][0][`closingImagePath`]}
								imageAltAttribution={
									questions["closing"][0][`closingImageAttribution`]
								}
								imageAltAttributionLink={
									questions["closing"][0][`closingImageAttributionLink`]
								}
								imageCrop={questions["closing"][0][`closingImageCrop`]}
								imageCropInfo={questions["closing"][0][`closingImageCropInfo`]}
								title={questions["closing"][0][`closing`]}
								details={
									questions["closing"][0][`closingQuizDetails`]
										? questions["closing"][0][`closingQuizDetails`]
										: undefined
								}
								embed={questions["closing"][0][`closingImage-embed`]}
								scoreComments={scoreCommentsDetails}
								finalScore={currentScore}
								numberQuestions={content.numQuestions}
								positionClosing={true}
							/>

							<div>
								<AdWrapper adCode={AMAZON_MUSIC_WIDE_BANNER} />
							</div>

							{nextContent[0] && (
								<QuickViewButton
									label={"Next"}
									optionalTitle={nextContent[0].headline}
									handler={cookieSetup}
									imgSrc={nextContent[0].headlineImage}
									imagePath={nextContent[0].imagePath}
									href={nextQuizHref}
									refPath={`/[category]/[url]/quiz/[quizId]/questions/[questionId]`}
									imageAlt={nextContent[0].headlineImageAlt}
									imageCrop={nextContent[0].headlineImageCrop}
									imageCropInfo={nextContent[0].headlineImageCropInfo}
								/>
							)}
						</>
					)}
				</>
			)}
			<LazyLoad once={true}>
				<ScrollUpButton />
			</LazyLoad>
			<LazyLoad once={true}>
				<hr className={styles.break} />
				<ShareButtonHoriz
					data={closingSocialButtons}
					url={shareUrl}
					image={headlineImage}
					headline={title}
					brief={blurb}
					position={"bottom_share_horiz"}
				/>
			</LazyLoad>
			<hr className={styles.break} />
			<Crumbs
				home={process.env.SITE_ADDRESS}
				category={category}
				headline={title}
				headlineUrl={shareUrl}
				refPath={`/[category]/[url]/quiz/[quizId]/questions/[questionId]`}
			/>

			<LazyLoad once={true}>
				<QuickEmailSignUp />
			</LazyLoad>

			{position === "closing" && (
				<>
					<SectionBar
						title="Leave a Comment"
						titleColor="#111"
						titleSize="1rem"
					/>
					<FacebookComments
						url={commentsUrl}
						numPostsVisible={5}
						orderBy="reverse_time"
					/>
				</>
			)}
			<LazyLoad once={true}>
				<ScrollingContent id={id} title="Latest" type={"quiz"} />
			</LazyLoad>
			<hr className={styles.break} />
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
