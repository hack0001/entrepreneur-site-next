import Head from "next/head";
import PropTypes from "prop-types";
import headerImageSocial from "./headerImageSocial";

const DynamicHeader = ({
	title,
	description,
	image,
	url,
	imageWidth,
	imageHeight,
	imagePath,
	imageCrop,
	imageCropInfo,
	canonical,
	next,
	prev,
	createdAt,
	updatedAt,
	tags,
}) => {
	let socialImage;
	if (imagePath) {
		socialImage = headerImageSocial({ imagePath, imageCrop, imageCropInfo });
	}

	const structuredData = {
		"@context": "http://schema.org",
		"@type": "NewsArticle",
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": canonical,
		},
		url: canonical,
		name: title,
		headline: title,
		image: {
			"@type": "ImageObject",
			url: image,
			height: imageHeight,
			width: imageWidth,
		},
		datePublished: createdAt,
		dateModified: updatedAt,
		publisher: {
			"@type": "Organization",
			"@id": "https://wealthmack.com/#organization",
			name: "WealthMack",
			sameAs: [
				"https://www.facebook.com/WealthMack-103552984448329/",
				"https://www.youtube.com/channel/UC7PG3SDVzaVn7UO4uCEV8_g?sub_confirmation=1",
				"https://twitter.com/intent/follow?source=followbutton&amp;variant=1.0&amp;screen_name=wealthmack",
				"https://www.instagram.com/wealthmack1/",
			],
			logo: {
				"@type": "ImageObject",
				url: "https://www.wealthmack.com/static/wealthmack_logo.png",
				height: 182,
				width: 324,
			},
		},
		articleSection: tags ? tags : ["Entrepreneur", "Business", "Motivation"],
		description: description ? description : title,
	};
	return (
		<Head>
			<title>{title}</title>
			<link rel="canonical" href={canonical} />
			{next && <link rel="next" href={next} />}
			{prev && <link rel="prev" href={prev} />}
			<meta name="description" content={description} />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={socialImage ? socialImage : image} />
			<meta name="twitter:url" content={url} />
			<meta name="og:title" content={title} />
			<meta name="og:description" content={description} />
			<meta name="og:image" content={socialImage ? socialImage : image} />
			<meta name="og:url" content={url} />
			<meta name="og:image:width" content={imageWidth} />
			<meta name="og:image:height" content={imageHeight} />
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData, null, 4),
				}}
			/>
		</Head>
	);
};

DynamicHeader.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	canonical: PropTypes.string,
	image: PropTypes.string,
	url: PropTypes.string,
	imageWidth: PropTypes.int,
	imageHeight: PropTypes.int,
	next: PropTypes.string,
	prev: PropTypes.string,
	createdAt: PropTypes.string,
	updatedAt: PropTypes.string,
	tags: PropTypes.array,
};
DynamicHeader.defaultProps = {
	imageWidth: 1024,
	imageHeight: 576,
	url: process.env.SITE_ADDRESS,
	canonical: process.env.SITE_ADDRESS,
	image: process.env.SITE_IMAGE,
	next: "",
	prev: "",
	tags: [],
};
export default DynamicHeader;
