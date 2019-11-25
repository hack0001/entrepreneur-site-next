import React from "react";

// import Embed from "./embed/embed";
import Quote from "./quote/quote";
import EmbedImage from "./embedImage/embedImage";
import dynamic from "next/dynamic";
import SingleLoader from "../../../Loading/SingleLoader";
import { theme } from "../../../../theme/baseCss";
import LazyLoad from "react-lazyload";
import SiteAd from "./ads/siteAd";
import LinkAd from "./ads/linkAd";
// import LinearProgress from "@material-ui/core/LinearProgress";
const Embed = dynamic(() => import("./embed/embed"), {
	ssr: false,
	loading: () => <SingleLoader />,
});

const formatSize = 18;
const lineHeight = 1.75;

const renderNode = (props, editor, next) => {
	const { attributes, children, node } = props;
	switch (node.type) {
		case "code":
			return (
				<code {...attributes} className="code">
					{children}
					<style jsx>{`
						.code {
							font-size: 1.25rem;
							color: #4d4d4d;
						}
					`}</style>
				</code>
			);
		case "paragraph":
			return (
				<div className="para" {...attributes}>
					{children}
					<style jsx>{`
						.para {
							font-size: 1.15rem;
							font-family: ${theme.secondaryFont};
							font-weight: 400;
							color: #4d4d4d;
						}
					`}</style>
				</div>
			);
		case "heading-one":
			return (
				<h1 {...attributes}>
					{children}
					<style jsx>{`
						h1 {
							font-size: 3.75rem;
							font-family: ${theme.font};
							margin: 0.5rem 0rem;
							line-height: 3.75rem;
						}
					`}</style>
				</h1>
			);
		case "heading-two":
			return (
				<h2 {...attributes}>
					{children}{" "}
					<style jsx>{`
						h2 {
							font-size: 3.25rem;
							font-family: ${theme.font};
							margin: 0.5rem 0rem;
							line-height: 3.25rem;
						}
					`}</style>
				</h2>
			);
		case "heading-three":
			return (
				<h3 {...attributes}>
					{children}{" "}
					<style jsx>{`
						h3 {
							font-size: 2.75rem;
							font-family: ${theme.font};
							margin: 0.5rem 0rem;
							line-height: 2.75rem;
						}
					`}</style>
				</h3>
			);
		case "heading-four":
			return (
				<h4 {...attributes}>
					{children}{" "}
					<style jsx>{`
						h4 {
							font-size: 2.25rem;
							font-family: ${theme.font};
							margin: 0.5rem 0rem;
							line-height: 2.25rem;
						}
					`}</style>
				</h4>
			);
		case "heading-five":
			return (
				<h5 {...attributes}>
					{children}{" "}
					<style jsx>{`
						h5 {
							font-size: 1.75rem;
							font-family: ${theme.font};
							margin: 0.5rem 0rem;
							line-height: 1.75rem;
						}
					`}</style>
				</h5>
			);
		case "format-align-left":
			return (
				<div style={{ align: "left" }} {...attributes}>
					{children}
				</div>
			);
		case "format-align-center":
			return (
				<div style={{ align: "center" }} {...attributes}>
					{children}
				</div>
			);
		case "format-align-right":
			return (
				<div style={{ align: "right" }} {...attributes}>
					{children}
				</div>
			);
		case "format-align-justify":
			return (
				<div style={{ align: "justify" }} {...attributes}>
					{children}
				</div>
			);
		case "bulleted-list":
			return (
				<ul className="bullet" {...attributes}>
					{children}
					<style jsx>{`
						.bullet {
							font-size: 1.15rem;
							font-family: ${theme.secondaryFont};
							font-weight: 400;
							color: #4d4d4d;
						}
					`}</style>
				</ul>
			);
		case "numbered-list":
			return (
				<ol style={{ fontSize: formatSize }} {...attributes}>
					{children}
					<style jsx>{`
						ol {
							font-size: 1.15rem;
							font-family: ${theme.secondaryFont};
							font-weight: 400;
							color: #4d4d4d;
						}
					`}</style>
				</ol>
			);
		case "list-item":
			return (
				<li style={{ fontSize: formatSize }} {...attributes}>
					{children}
					<style jsx>{`
						li {
							margin: 1rem 0;
						}
					`}</style>
				</li>
			);
		case "quote":
			return <Quote {...props} {...attributes} {...node} {...children} />;
		case "horizontal-line":
			return (
				<span
					{...attributes}
					style={{
						borderBottom: "1px solid #000",
						display: "block",
						opacity: 0.2,
					}}
				>
					{children}
				</span>
			);

		case "embed-image":
			return (
				<LazyLoad once={true}>
					<EmbedImage {...props} {...attributes} {...node} {...children} />
				</LazyLoad>
			);
		case "embed":
			return (
				<LazyLoad once={true}>
					<Embed {...props} {...attributes} {...node} {...children} />
				</LazyLoad>
			);

		case "paid-ad":
			return (
				<div className="paid-ad" {...attributes}>
					____________ADVERT____________
					{children}
					<style jsx>{`
						.paid-ad {
							width: 100%;
							margin: 0 auto;
							color: #4d4d4d;
							text-align: center;
							font-size: 2rem;
						}
					`}</style>
				</div>
			);
		case "site-ad":
			return (
				<LazyLoad once={true}>
					<SiteAd {...props} {...attributes} {...node} {...children} />
				</LazyLoad>
			);

		case "link-ad":
			return (
				<LazyLoad once={true}>
					<LinkAd {...props} {...attributes} {...node} {...children} />
				</LazyLoad>
			);
		default:
			return next();
	}
};

export default renderNode;
