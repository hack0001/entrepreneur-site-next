import dynamic from "next/dynamic";
import Quote from "./quote/quote";
import EmbedImage from "./embedImage/embedImage";
import SingleLoader from "../../../Loading/SingleLoader";
import { theme } from "../../../../theme/baseCss";
import LazyLoad from "react-lazyload";
import SiteAd from "./ads/siteAd";
import LinkAd from "./ads/linkAd";
const paragraphFontSize = 1.35;
const paragraphLineHeight = 2.5;
const Embed = dynamic(() => import("./embed/embed"), {
	ssr: false,
	loading: () => <SingleLoader />,
});

const formatSize = 18;
const lineHeight = 1.75;

const RenderElement = props => {
	const { attributes, children, element } = props;
	switch (element.type) {
		case "link":
			const { url } = element;
			return (
				<a {...attributes} href={url} rel="noopener noreferrer" target="_blank">
					{children}
				</a>
			);
		case "emoji":
			const emoji = element.data;
			return (
				<span {...attributes} style={{ fontSize: 30 }}>
					{emoji}
					{children}
				</span>
			);
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

		case "bold":
			return <strong {...attributes}>{children}</strong>;
		case "italic":
			return <em {...attributes}>{children}</em>;
		case "strikethrough":
			return <del {...attributes}>{children}</del>;
		case "underline":
			return <u {...attributes}>{children}</u>;
		case "paragraph":
			return (
				<div className="para" {...attributes}>
					{children}
					<style jsx>{`
						.para {
							font-size: ${paragraphFontSize}rem;
							line-height: ${paragraphLineHeight}rem;
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
				<div className="para" {...attributes}>
					{children}
					<style jsx>{`
						.para {
							font-size: ${paragraphFontSize}rem;
							line-height: ${paragraphLineHeight}rem;
							font-family: ${theme.secondaryFont};
							font-weight: 400;
							color: #4d4d4d;
							align: left;
						}
					`}</style>
				</div>
			);
		case "format-align-center":
			return (
				<div className="para" {...attributes}>
					{children}
					<style jsx>{`
						.para {
							font-size: ${paragraphFontSize}rem;
							line-height: ${paragraphLineHeight}rem;
							font-family: ${theme.secondaryFont};
							font-weight: 400;
							color: #4d4d4d;
							align: center;
						}
					`}</style>
				</div>
			);
		case "format-align-right":
			return (
				<div className="para" {...attributes}>
					{children}
					<style jsx>{`
						.para {
							font-size: ${paragraphFontSize}rem;
							line-height: ${paragraphLineHeight}rem;
							font-family: ${theme.secondaryFont};
							font-weight: 400;
							color: #4d4d4d;
							align: right;
						}
					`}</style>
				</div>
			);
		case "format-align-justify":
			return (
				<div className="para" {...attributes}>
					{children}
					<style jsx>{`
						.para {
							font-size: ${paragraphFontSize}rem;
							line-height: ${paragraphLineHeight}rem;
							font-family: ${theme.secondaryFont};
							font-weight: 400;
							color: #4d4d4d;
							align: justify;
						}
					`}</style>
				</div>
			);
		case "bulleted-list":
			return (
				<ul className="bullet" {...attributes}>
					{children}
					<style jsx>{`
						.bullet {
							font-size: ${paragraphFontSize}rem;
							line-height: ${paragraphLineHeight}rem;
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
							font-size: ${paragraphFontSize}rem;
							line-height: ${paragraphLineHeight}rem;
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
			return <Quote {...props} {...attributes} {...element} {...children} />;
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
					<EmbedImage
						attributes={attributes}
						element={element}
						children={children}
					/>
				</LazyLoad>
			);
		case "embed":
			return (
				<LazyLoad once={true}>
					<Embed
						attributes={attributes}
						element={element}
						children={children}
					/>
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
					<SiteAd {...props} {...attributes} {...element} {...children} />
				</LazyLoad>
			);
		case "link-ad":
			return (
				<LazyLoad once={true}>
					<LinkAd {...props} {...attributes} {...element} {...children} />
				</LazyLoad>
			);
		case "table":
			return (
				<table style={{ width: "100%" }}>
					<tbody style={{ border: "1px solid black" }} {...attributes}>
						{children}
					</tbody>
				</table>
			);
		case "table-row":
			return (
				<tr {...attributes} style={{ border: "1px solid black" }}>
					{children}
				</tr>
			);
		case "table-cell":
			return (
				<td {...attributes} style={{ border: "1px solid black" }}>
					{children}
				</td>
			);
		default:
			return (
				<div className="para" {...attributes}>
					{children}
					<style jsx>{`
						.para {
							font-size: ${paragraphFontSize}rem;
							line-height: ${paragraphLineHeight}rem;
							font-family: ${theme.secondaryFont};
							font-weight: 400;
							color: #4d4d4d;
						}
					`}</style>
				</div>
			);
	}
};

export default RenderElement;