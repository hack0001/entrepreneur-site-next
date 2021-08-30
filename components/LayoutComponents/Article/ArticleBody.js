import { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import Reader from "../Editor/reader";
import LazyLoad from "react-lazyload";
import FacebookComments from "../../SocialMedia/FacebookComments";
import { closingSocialButtons } from "../../SocialMedia/data";
import ShareButtonHoriz from "../../SocialMedia/ShareButtonsHoriz";
import Crumbs from "../Crumbs/crumbs";
import QuickEmailSignUp from "../../SignUpModal/quickEmailSignup";
import ScrollUpButton from "../ScrollUpButton/ScrollUpButton";
import SectionBar from "../SectionBar";
import ScrollingContent from "../ScrollingContent/ScrollingContent";
import styles from "./styles/articleBodyStyles.module.sass";
import Adsense from "../../ads/code/adsense/adsense";
import Context from "@utils/Context";
import { filterUnique } from "@utils/handler";
import QuickViewButton from "../../Button/QuickViewButton";
import Cookie from "js-cookie";
import dynamic from "next/dynamic";
import { objectCheck } from "@utils/queryHandler";
import PinterestEmbed from "@components/SocialMedia/pinterestEmbed";
const AdWrapper = dynamic(() => import("../../ads/adWrapper"), {
	ssr: false,
});
const ArticleBody = ({
	content,
	category,
	url,
	image,
	headline,
	brief,
	id,
	nextSlideShow,
	cpcAd,
	affiliateCallToAction,
	callToActionMarker,
}) => {
	const value = JSON.parse(content.content);
	const { sessionSlideIds, query, currentUrlPath } = useContext(Context);
	const queryLinkCheck = objectCheck(query);

	const filterArray = sessionSlideIds.concat({ id });
	const {
		viewCount,
		pinterestLink,
		pinterestEmbedCode,
		pinterestPinLink,
		linkedArticle,
	} = content;
	const nextContent = filterUnique(nextSlideShow.items, filterArray);
	const nextSlideShowHref = nextContent[0]
		? `/${nextContent[0].category}/${nextContent[0].urlDescription}/slideshow/${nextContent[0].id}/slides/opening`
		: "";

	const cookieSetup = () => {
		Cookie.set("CPC", JSON.stringify(true), {
			expires: 0.25,
		});
	};

	return (
		<div className={styles.sectionPadding}>
			<Reader
				value={value}
				cpcAd={cpcAd}
				linkedArticle={linkedArticle}
				query={query}
			/>
			<LazyLoad once={true}>
				<PinterestEmbed
					pinterestEmbedCode={pinterestEmbedCode}
					pinterestPinLink={pinterestPinLink}
				/>
			</LazyLoad>
			{cpcAd && (
				<AdWrapper
					adCode={cpcAd.displayAd}
					callToAction={affiliateCallToAction}
					callToActionMarker={callToActionMarker}
				/>
			)}
			{linkedArticle && (
				<div className={styles.nextButtonWrapper}>
					<QuickViewButton
						label={"Next"}
						optionalTitle={linkedArticle.headline}
						imgSrc={linkedArticle.headlineImage}
						imagePath={linkedArticle.imagePath}
						href={`/${linkedArticle.category}/${linkedArticle.urlDescription}/article/${linkedArticle.id}`}
						refPath={`/[category]/[url]/article/[id]`}
						imageAlt={linkedArticle.headlineImageAlt}
						imageCrop={linkedArticle.headlineImageCrop}
						imageCropInfo={linkedArticle.headlineImageCropInfo}
						queryLinkCheck={true}
						query={{ ...query, utm_medium: "article_bottom_linked" }}
					/>
				</div>
			)}
			{nextContent[0] && !linkedArticle && (
				<div className={styles.nextButtonWrapper}>
					<QuickViewButton
						label={"Next"}
						optionalTitle={nextContent[0].headline}
						handler={cookieSetup}
						imgSrc={nextContent[0].headlineImage}
						imagePath={nextContent[0].imagePath}
						href={nextSlideShowHref}
						refPath={`/[category]/[url]/slideshow/[slideId]/slides/[slideContentId]`}
						imageAlt={nextContent[0].headlineImageAlt}
						imageCrop={nextContent[0].headlineImageCrop}
						imageCropInfo={nextContent[0].headlineImageCropInfo}
						queryLinkCheck={true}
						query={{ ...query, utm_medium: "article_bottom_next" }}
					/>
				</div>
			)}
			<LazyLoad once={true}>
				<ScrollUpButton />
			</LazyLoad>
			<div>
				<Adsense
					client="ca-pub-2068760522034474"
					slot="8414762247"
					currentUrlPath={currentUrlPath}
				/>
			</div>
			<br />
			<LazyLoad once={true}>
				<SectionBar title={`Share`} titleColor="#111" titleSize="1rem" />
				<ShareButtonHoriz
					data={closingSocialButtons}
					url={url}
					image={image}
					headline={headline}
					brief={brief}
					position={"bottom_share_horiz"}
					pinterestLink={pinterestLink}
				/>
			</LazyLoad>
			<Crumbs
				home={process.env.SITE_ADDRESS}
				category={category}
				headline={headline}
				headlineUrl={url}
				refPath={`/[category]/[url]/article/[id]`}
				queryLinkCheck={queryLinkCheck}
				query={query}
			/>
			<LazyLoad once={true}>
				<QuickEmailSignUp queryLinkCheck={queryLinkCheck} query={query} />
			</LazyLoad>
			<div>
				<Adsense
					client="ca-pub-2068760522034474"
					slot="4801396157"
					currentUrlPath={currentUrlPath}
				/>
			</div>
			<SectionBar title="Leave a Comment" titleColor="#111" titleSize="1rem" />
			<FacebookComments url={url} numPostsVisible={5} orderBy="reverse_time" />
			<LazyLoad>
				<ScrollingContent id={id} type={"article"} />
			</LazyLoad>
		</div>
	);
};

ArticleBody.propTypes = {
	id: PropTypes.string,
	content: PropTypes.Object,
	url: PropTypes.String,
	category: PropTypes.String,
	image: PropTypes.String,
	headline: PropTypes.String,
	brief: PropTypes.String,
};
export default ArticleBody;
