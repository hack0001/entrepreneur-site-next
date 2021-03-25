import React, { memo } from "react";
import SingleSocialLoader from "../Loading/SingleSocialLoader";
import dynamic from "next/dynamic";
import ImageLoader from "../Loading/ImageLoader";
import embedStyles from "./styles/embedStyles.module.sass";
const Embedo = dynamic(() => import("./embedo/Embed"), {
	ssr: false,
	loading: () => <SingleSocialLoader />,
});
const EmbedUrl = ({
	embed,
	image,
	imageAlt,
	imageAltAttribution,
	imageAltAttributionLink,
	imagePath,
	imageCrop,
	imageCropInfo,
	styles,
	noMaxHeight,
	wrapperClass,
	priority,
}) => {
	return (
		<>
			{!embed && (
				<ImageLoader
					src={image}
					alt={imageAlt ? imageAlt : imageAltAttribution}
					imagePath={imagePath}
					animation={false}
					styles={styles}
					noMaxHeight={noMaxHeight}
					imageCrop={imageCrop}
					imageCropInfo={imageCropInfo}
					unsized={true}
					wrapperClass={wrapperClass}
					priority={priority}
				/>
			)}
			{embed && (
				<Embedo
					source={image}
					height="550px"
					imageAltAttribution={imageAltAttribution}
					imageAltAttributionLink={imageAltAttributionLink}
				/>
			)}
			{imageAltAttribution && (
				<span>
					<a
						className={embedStyles.embedImageAlt}
						href={imageAltAttributionLink}
						target="_blank"
						rel="noopener noreferrer"
					>
						Credit:{imageAltAttribution}
					</a>
				</span>
			)}
		</>
	);
};

EmbedUrl.defaultProps = {
	priority: false,
};
export default EmbedUrl;
