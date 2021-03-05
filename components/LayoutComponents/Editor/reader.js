import { useContext } from "react";
import dynamic from "next/dynamic";
import Quote from "../Editor/renderElement/quote/quote";
import EmbedImage from "../Editor/renderElement/embedImage/embedImage";
import SingleLoader from "../../Loading/SingleLoader";
import LazyLoad from "react-lazyload";
import SiteAd from "../Editor/renderElement/ads/siteAd";
import LinkAd from "../Editor/renderElement/ads/linkAd";
import styles from "./renderElement/styles/renderElementStyles.module.sass";
import Adsense from "../../ads/code/adsense/adsense";
import Context from "@utils/Context";

const Embed = dynamic(() => import("../Editor/renderElement/embed/embed"), {
	ssr: false,
	loading: () => <SingleLoader />,
});
const Reader = ({ value }) => {
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
				case "link":
					const { url } = node;
					return (
						<a
							className={styles.link}
							href={url}
							rel="noopener noreferrer"
							target="_blank"
						>
							{node.children[0].text}
						</a>
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
					return <div className={styles.para}>{children}</div>;
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
					return <span className={style.horizLine}>{children}</span>;
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
						<Adsense
							client="ca-pub-2068760522034474"
							slot="8517191254"
							currentUrlPath={currentUrlPath}
						/>
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
							<LinkAd node={node} />
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
					return <div className={styles.para}>{children}</div>;
			}
		}
	};

	const children = value.map(n => {
		return renderHtml(n);
	});
	return children;
};
export default Reader;
