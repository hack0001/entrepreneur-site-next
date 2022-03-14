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
import {
	closingSocialButtons,
	openingSocialButtons,
} from "../../SocialMedia/data";
import QuickEmailSignUp from "../../SignUpModal/quickEmailSignup";
import FacebookComments from "@components/SocialMedia/FacebookComments";
import LazyLoad from "react-lazyload";
import ScrollingContent from "../ScrollingContent/ScrollingContent";
import styles from "./styles/quizStyles.module.sass";
import Context from "@utils/Context";
import LongQuestions from "./LongQuestions";
import Cookie from "js-cookie";
import Adsense from "../../ads/code/adsense/adsense";
import { filterUnique } from "@utils/handler";
import { objectCheck } from "@utils/queryHandler";
import Disclaimer from "../../ads/disclaimer";
import PinterestEmbed from "@components/SocialMedia/pinterestEmbed";
import percentileMarkers from "@utils/percentageMarkers";

const QuizDetails = ({
	content,
	position,
	url,
	id,
	score,
	nextQuiz,
	cpcMarker,
	setCpcMarker,
}) => {
	const details = JSON.parse(content.overview);
	const questions = JSON.parse(content.questions);
	const { sessionQuizIds, query, currentUrlPath } = useContext(Context);
	const queryLinkCheck = objectCheck(query);
	const [percentage, setPercentage] = useState(percentileMarkers);

	const filterArray = sessionQuizIds.concat({ id });
	const {
		affiliateDisclaimer,
		progressBar,
		pinterestLink,
		pinterestEmbedCode,
		pinterestPinLink,
		viewCount,
		user,
	} = content;
	const nextContent = filterUnique(nextQuiz.items, filterArray);
	const lastUpdated = content.updatedAt;
	const authorName = user.alias ? user.alias : "";

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
		setQuestionsAnswered(0);
		setPercentage(percentileMarkers);
	}, [id]);

	useEffect(() => {
		const currentPercentage = Math.round(
			(positionNumber / content.numQuestions) * 100,
		);
		const currentScorePercentage = Math.round(
			(currentScore / positionNumber) * 100,
		);

		const updatePercentageCheck = percentage.map(marker => {
			if (currentPercentage >= marker.percentile && !marker.percentileCheck) {
				//Track the Percentage Viewed in Tag Manager
				if (typeof window !== "undefined") {
					if (window.dataLayer) {
						window.dataLayer.push({
							event: "quiz_percentage",
							percentage: currentPercentage,
							percentile: marker.percentile,
							percentageCheck: marker.percentileCheck,
							category,
							currentScore: currentScore,
							currentScorePercentage: currentScorePercentage,
						});
					}
				}

				return {
					percentile: marker.percentile,
					percentileCheck: true,
				};
			}
			return marker;
		});
		setPercentage(updatePercentageCheck);
	}, [positionNumber]);

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
							pinterestLink={pinterestLink}
							authorName={authorName}
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
									currentUrlPath={currentUrlPath}
									priority={true}
									cpcMarker={true}
								/>
								{position === "opening" && (
									<div className={styles.openingButton}>
										<div className={styles.adsenseWrapper}>
											{/* QuestionHoriz */}
											<Adsense
												client={`ca-pub-${process.env.GOOGLE_ADSENSE_ID}`}
												slot="4560498904"
												responsive={true}
												currentUrlPath={currentUrlPath}
												adStyle={"default"}
											/>
										</div>
										<QuickViewButton
											label="Start"
											imgSrc={details[0].headlineImage}
											imagePath={details[0].headlineImagePath}
											imageCrop={details[0].headlineImageCrop}
											imageCropInfo={details[0].headlineImageCropInfo}
											href={`${nextHref}/1`}
											refPath={`/[category]/[url]/quiz/[quizId]/questions/[questionId]`}
											imageAlt={details[0].headlineImageAlt}
											queryLinkCheck={queryLinkCheck}
											query={query}
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
											queryLinkCheck={true}
											query={{ ...query, utm_medium: "quiz_bottom_next" }}
										/>
									</div>
								)}
							</>
						)}
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
									queryLinkCheck={queryLinkCheck}
									query={query}
									currentUrlPath={currentUrlPath}
									priority={cpcMarker ? true : false}
									progressBar={progressBar}
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
						lastUpdated={lastUpdated}
						pinterestLink={pinterestLink}
						authorName={authorName}
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
						currentUrlPath={currentUrlPath}
						priority={true}
						cpcMarker={false}
					/>
					<div className={styles.adsenseWrapper}>
						{/* QuestionHoriz */}
						<Adsense
							client={`ca-pub-${process.env.GOOGLE_ADSENSE_ID}`}
							slot="4560498904"
							responsive={true}
							currentUrlPath={currentUrlPath}
							adStyle={"default"}
						/>
					</div>
					<LazyLoad once={true}>
						<hr className={styles.break} />
						<ShareButtonHoriz
							data={openingSocialButtons}
							url={shareUrl}
							image={headlineImage}
							headline={title}
							brief={blurb}
							position={"top_share_horiz"}
							pinterestLink={pinterestLink}
						/>
					</LazyLoad>
					{affiliateDisclaimer && (
						<Disclaimer query={query} queryLinkCheck={queryLinkCheck} />
					)}
					<hr className={styles.break} />
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
						currentUrlPath={currentUrlPath}
					/>

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
								currentUrlPath={currentUrlPath}
								priority={false}
							/>

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
									wrapperClass={"contentWrapper"}
									queryLinkCheck={true}
									query={{ ...query, utm_medium: "quiz_bottom_next" }}
								/>
							)}
						</>
					)}
				</>
			)}
			{!cpcMarker && (
				<div className={styles.adsenseWrapper}>
					{/* QuestionBottomSquare */}
					<Adsense
						client={`ca-pub-${process.env.GOOGLE_ADSENSE_ID}`}
						slot="3992688547"
						currentUrlPath={currentUrlPath}
						adStyle={"default"}
					/>
				</div>
			)}

			<LazyLoad once={true}>
				<PinterestEmbed
					pinterestEmbedCode={pinterestEmbedCode}
					pinterestPinLink={pinterestPinLink}
				/>
			</LazyLoad>
			{!cpcMarker && (
				<LazyLoad once={true}>
					<ScrollUpButton />
				</LazyLoad>
			)}
			<LazyLoad once={true}>
				<hr className={styles.break} />
				<ShareButtonHoriz
					data={closingSocialButtons}
					url={shareUrl}
					image={headlineImage}
					headline={title}
					brief={blurb}
					pinterestLink={pinterestLink}
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
				queryLinkCheck={queryLinkCheck}
				query={query}
			/>
			<LazyLoad once={true}>
				<QuickEmailSignUp queryLinkCheck={queryLinkCheck} query={query} />
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
				<ScrollingContent id={id} title="Latest" type={"quiz"} limitSize={3} />
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
