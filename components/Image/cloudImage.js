import React from "react";
import { newImageUrl, clean } from "../helper/imageUrlHelper";
import styles from "./styles/cloudStyles.module.sass";
import Image from "next/image";
import { transparentDataUrl } from "./transparentUrl";

const CloudImageComponent = ({
	imagePath,
	imageAlt,
	onLoad,
	imageCrop,
	imageCropInfo,
	unsized,
	wrapperClass,
	fixedHeight,
	fixedWidth,
	priority,
}) => {
	const cloudfrontUrl = newImageUrl(imagePath);

	let cropParams = null;
	if (imageCrop && imageCropInfo) {
		const parsedInfo =
			typeof imageCropInfo === "string"
				? JSON.parse(imageCropInfo)
				: imageCropInfo;
		cropParams = {
			crop: imageCrop,
			x: parsedInfo.x ? Math.round(parsedInfo.x) : 0,
			y: parsedInfo.y ? Math.round(parsedInfo.y) : 0,
			cropWidth: parsedInfo.width ? Math.round(parsedInfo.width) : null,
			cropHeight: parsedInfo.height ? Math.round(parsedInfo.height) : null,
			aspect: parsedInfo.aspect
				? Math.floor(parsedInfo.aspect * 100) / 100
				: null,
		};

		const cleanCropParams = cropParams ? clean(cropParams) : null;

		const parameterUrl = Object.keys(cleanCropParams)
			.map(key => {
				if (cleanCropParams[key] !== null) {
					return `${key}=${cleanCropParams[key]}`;
				}
			})
			.join("&");

		return (
			<>
				{unsized && (
					<div className={styles.imageWrapper}>
						<Image
							key={`${cloudfrontUrl}?${parameterUrl}`}
							className={
								styles[`${wrapperClass ? wrapperClass : "cloudWrapper"}`]
							}
							alt={imageAlt}
							src={`${cloudfrontUrl}?${parameterUrl}`}
							onLoad={onLoad}
							width="100%"
							height={"100%"}
							layout={"responsive"}
							priority={priority}
							placeholder="blur"
							blurDataURL={transparentDataUrl}
						/>
					</div>
				)}
				{!unsized && (
					<div>
						<Image
							key={`${cloudfrontUrl}?${parameterUrl}`}
							className={
								styles[`${wrapperClass ? wrapperClass : "cloudWrapper"}`]
							}
							alt={imageAlt}
							src={`${cloudfrontUrl}?${parameterUrl}`}
							onLoad={onLoad}
							height={
								cleanCropParams.cropHeight
									? cleanCropParams.cropHeight
									: fixedHeight
							}
							width={
								cleanCropParams.cropWidth
									? cleanCropParams.cropWidth
									: fixedWidth
							}
							priority={priority}
							placeholder="blur"
							blurDataURL={transparentDataUrl}
						/>
					</div>
				)}
			</>
		);
	}

	return (
		unsized && (
			<div className={styles.imageWrapper}>
				<Image
					key={cloudfrontUrl}
					className={styles[`${wrapperClass ? wrapperClass : "cloudWrapper"}`]}
					alt={imageAlt}
					src={cloudfrontUrl}
					onLoad={onLoad}
					layout={"fill"}
					priority={priority}
					placeholder="blur"
					blurDataURL={transparentDataUrl}
				/>
			</div>
		)
	);
};

CloudImageComponent.defaultProps = {
	unsized: true,
	priority: false,
};
export default CloudImageComponent;
