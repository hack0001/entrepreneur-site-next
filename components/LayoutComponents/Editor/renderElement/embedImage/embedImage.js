import React, { useEffect, useState } from "react";
import ImageLoader from "../../../../Loading/EditorImageLoader";
import styles from "../styles/embedImage/embedImageStyles.module.sass";
const EmbedImage = ({ attributes, element, children }) => {
	const { data } = element;
	const [embedImage, setEmbedImageUrl] = useState({
		imageUrl: "",
		imageAlt: "",
		imagePath: "",
		imageAttribution: "",
		imageAttributionLink: "",
		imageCrop: "",
		imageCropInfo: {},
	});
	useEffect(() => {
		handleImageEmbed();
	}, []);

	const handleImageEmbed = () => {
		const imageCheck =
			data.imagePath &&
			data.image.indexOf("content-factory-media") > 1 &&
			data.image.split(".").pop() !== "gif"
				? true
				: false;
		setEmbedImageUrl({
			imageUrl: data.image,
			imageAlt: data.imageAlt,
			imageAttribution: data.imageAttribution,
			imageAttributionLink: data.imageAttributionLink,
			imagePath: data.imagePath,
			imageComment: data.imageComment,
			imageCrop: data.imageCrop,
			imageCropInfo: data.imageCropInfo,
			imageCheck,
		});
	};

	return (
		<div {...attributes} className={styles.embedWrapper}>
			{embedImage.imageCheck && (
				<ImageLoader
					src={embedImage.imageUrl}
					alt={embedImage.imageAlt}
					imagePath={embedImage.imagePath}
					imageCrop={embedImage.imageCrop}
					imageCropInfo={embedImage.imageCropInfo}
					animation={true}
					sizes="330px"
					noMaxHeight={true}
					styles={{
						width: "100%",
						centerize: true,
					}}
				/>
			)}
			{!embedImage.imageCheck && (
				<img
					src={embedImage.imageUrl}
					alt={embedImage.imageAlt}
					style={{
						width: "100%",
						centerize: true,
					}}
				/>
			)}
			{children}
			{embedImage.imageAttribution && (
				<span>
					<a
						href={embedImage.imageAttributionLink}
						target="_blank"
						rel="noopener noreferrer"
						className={styles.embed}
					>
						Credit:{embedImage.imageAttribution}
					</a>
				</span>
			)}
			<span className={styles.comment}>{embedImage.imageComment}</span>
		</div>
	);
};

EmbedImage.defaultProps = {
	element: {
		data: {
			url: "",
			imageAlt: "",
			imageAttribution: "",
			imageAttributionLink: "",
			imagePath: "",
			imageCrop: "",
			imageCropInfo: {},
		},
	},
};
export default EmbedImage;
