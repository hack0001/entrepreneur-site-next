import React, { useEffect, useState } from "react";
import ImageLoader from "../../../../Loading/EditorImageLoader";
import styles from "../styles/embedImage/embedImageStyles.module.sass";
import Image from "next/image";

const EmbedImage = ({ node }) => {
	const { data } = node;
	const [embedImage, setEmbedImageUrl] = useState({
		imageUrl: "",
		imageAlt: "",
		imagePath: "",
		imageAttribution: "",
		imageAttributionLink: "",
		imageCrop: "",
		imageCropInfo: {},
		imageCheck: false,
	});
	useEffect(() => {
		handleImageEmbed();
	}, [node]);

	const handleImageEmbed = () => {
		if (!data.image) return;
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
		<div className={styles.embedWrapper}>
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
					wrapperClass={"contentWrapper"}
				/>
			)}
			{!embedImage.imageCheck && embedImage.imageUrl && (
				<img
					key={embedImage.imageUrl}
					src={embedImage.imageUrl}
					alt={embedImage.imageAlt}
					style={{
						width: "100%",
						centerize: true,
					}}
					unsized={true}
				/>
			)}
			<div>
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
				<div className={styles.comment}>{embedImage.imageComment}</div>
			</div>
		</div>
	);
};

EmbedImage.defaultProps = {
	element: {
		data: {
			image: "",
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
