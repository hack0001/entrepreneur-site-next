import { useContext } from "react";
import dynamic from "next/dynamic";
import Quote from "./renderElement/quote/quote";
import EmbedImage from "./renderElement/embedImage/embedImage";
import SingleLoader from "../../Loading/SingleLoader";
import LazyLoad from "react-lazyload";
import SiteAd from "./renderElement/ads/siteAd";
import styles from "./renderElement/styles/renderElementStyles.module.sass";
import Adsense from "../../ads/code/adsense/adsense";
import Context from "@utils/Context";
import NextButton from "@components/Button/QuickViewButton";
import SectionBar from "../SectionBar";

const AdWrapper = dynamic(() => import("../../ads/adWrapper"), {
	ssr: false,
});
const Embed = dynamic(() => import("./renderElement/embed/embed"), {
	ssr: false,
	loading: () => <SingleLoader />,
});
const Reader = ({ value, cpcAd, linkedArticle, query, quickView = false }) => {
	if (typeof value.text === "string") {
		// excapeHtml is to get rid of html tags e.g. < for $lt
		return value.text;
	}

	const renderHtml = node => {
		if (typeof node.text === "string") {
			let marks = node.text;
			if (marks === "") {
				marks = <p className={styles.emptyPara}></p>;
			}
			if (node.bold) {
				marks = <strong>{marks}</strong>;
			}
			if (node.code) {
				marks = <code>{marks}</code>;
			}
			if (node.italic) {
				marks = <em>{marks}</em>;
			}
			if (node.underline) {
				marks = <u>{marks}</u>;
			}
			if (node.strikethrough) {
				marks = <del>{marks}</del>;
			}
			return marks;
		}

		const children = node.children.map(n => renderHtml(n));
		if (node.type) {
			switch (node.type) {
				case "affiliate-code":
					const { affiliateCode, callToAction } = node.data;
					const callToActionMarker = callToAction ? true : false;
					return (
						<LazyLoad once={true}>
							<AdWrapper
								adCode={affiliateCode}
								callToAction={callToAction}
								callToActionMarker={callToActionMarker}
							/>
						</LazyLoad>
					);
				case "link":
					const { url } = node;
					const urlLink = url.linkUrl ? url.linkUrl : url;
					const security = url.nofollowLink
						? "nofollow noopener noreferrer"
						: "noopener noreferrer";
					const openTab = url.openNewTab === false ? "_self" : "_blank";
					return (
						<strong>
							<a
								className={styles.link}
								href={urlLink}
								rel={security}
								target={openTab}
							>
								{node.children[0].text}
							</a>
						</strong>
					);
				case "emoji":
					const emoji = node.data;
					return (
						<span className={styles.emoji}>
							{emoji}
							{children}
						</span>
					);
				case "code":
					return <code className={styles.code}>{children}</code>;
				case "bold":
					return <strong>{children}</strong>;
				case "italic":
					return <em>{children}</em>;
				case "strikethrough":
					return <del>{children}</del>;
				case "underline":
					return <u>{children}</u>;
				case "paragraph":
					return (
						<p className={quickView ? styles.quickPara : styles.para}>
							{children}
						</p>
					);
				case "heading-one":
					return <h1 className={styles.headOne}>{children}</h1>;
				case "heading-two":
					return <h2 className={styles.headTwo}>{children}</h2>;
				case "heading-three":
					return <h3 className={styles.headThree}>{children}</h3>;
				case "heading-four":
					return <h4 className={styles.headFour}>{children}</h4>;
				case "heading-five":
					return <h5 className={styles.headFive}>{children}</h5>;
				case "format-align-left":
					return <div className={styles.paraLeft}>{children}</div>;
				case "format-align-center":
					return <div className={styles.paraCenter}>{children}</div>;
				case "format-align-right":
					return <div className={styles.paraRight}>{children}</div>;
				case "format-align-justify":
					return <div className={styles.paraJustify}>{children}</div>;
				case "bulleted-list":
					return <ul className={styles.bullet}>{children}</ul>;
				case "numbered-list":
					return <ol className={styles.numList}>{children}</ol>;
				case "list-item":
					return <li className={styles.listItem}>{children}</li>;
				case "quote":
					return <Quote node={node} />;
				case "horizontal-line":
					return <span className={styles.horizLine}>{children}</span>;
				case "embed-image":
					return <EmbedImage node={node} />;
				case "embed":
					return (
						<LazyLoad once={true} offset={100}>
							<Embed node={node} />
						</LazyLoad>
					);
				case "paid-ad":
					const { currentUrlPath } = useContext(Context);
					return (
						<div>
							<Adsense
								client="ca-pub-2068760522034474"
								slot="8517191254"
								currentUrlPath={currentUrlPath}
							/>
						</div>
					);
				case "site-ad":
					return (
						<LazyLoad once={true}>
							<SiteAd node={node} />
						</LazyLoad>
					);
				case "link-ad":
					return (
						<LazyLoad once={true}>
							<div className={styles.linkAd}>
								{cpcAd && <AdWrapper adCode={cpcAd.displayAd} />}
								{linkedArticle && (
									<div className={styles.linkSection}>
										<SectionBar
											title={`Up Next`}
											titleColor="#111"
											titleSize="1rem"
											custom={true}
										/>
										<div className={styles.scrollText}>
											Continue Scrolling to Keep Reading
										</div>
										<div className={styles.scrollText}>
											Click the button below for the Next Article.
										</div>
										<div className={styles.scrollTextHeadline}>
											{linkedArticle.headline}
										</div>
										<NextButton
											label={"Next"}
											optionalTitle={linkedArticle.headline}
											href={`/${linkedArticle.category}/${linkedArticle.urlDescription}/article/${linkedArticle.id}`}
											refPath={`/[category]/[url]/article/[id]`}
											imgSrc={linkedArticle.headlineImage}
											imagePath={linkedArticle.headlineImagePath}
											imageAlt={linkedArticle.headlineImageAlt}
											imageCrop={linkedArticle.headlineImageCrop}
											imageCropInfo={linkedArticle.headlineImageCropInfo}
											queryLinkCheck={true}
											query={{ ...query, utm_medium: "article_midsection" }}
										/>
										<SectionBar
											title={``}
											titleColor="#111"
											titleSize="1rem"
											custom={true}
										/>
									</div>
								)}
							</div>
						</LazyLoad>
					);
				case "table":
					return (
						<table style={{ width: "100%" }}>
							<tbody style={{ border: "1px solid black" }}>{children}</tbody>
						</table>
					);
				case "table-row":
					return <tr style={{ border: "1px solid black" }}>{children}</tr>;
				case "table-cell":
					return <td style={{ border: "1px solid black" }}>{children}</td>;
				default:
					return (
						<p className={quickView ? style.quickPara : styles.para}>
							{children}
						</p>
					);
			}
		}
	};

	const children = value.map(n => {
		return renderHtml(n);
	});
	return <div className={styles.articleWrapper}>{children}</div>;
};
export default Reader;
