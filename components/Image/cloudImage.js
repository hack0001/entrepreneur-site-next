import React from "react";
import { newImageUrl, clean } from "../helper/imageUrlHelper";
import styles from "./styles/cloudStyles.module.sass";
import Image from "next/image";
const CloudImageComponent = ({
	imagePath,
	imageAlt,
	onLoad,
	imageCrop,
	imageCropInfo,
	unsized = true,
	wrapperClass,
	fixedHeight,
	fixedWidth,
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
					<Image
						key={`${cloudfrontUrl}?${parameterUrl}`}
						className={
							styles[`${wrapperClass ? wrapperClass : "cloudWrapper"}`]
						}
						alt={imageAlt}
						src={`${cloudfrontUrl}?${parameterUrl}`}
						onLoad={onLoad}
						unsized={unsized}
					/>
				)}
				{!unsized && (
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
							cleanCropParams.cropWidth ? cleanCropParams.cropWidth : fixedWidth
						}
					/>
				)}
			</>
		);
	}

	return (
		unsized && (
			<Image
				key={cloudfrontUrl}
				className={styles[`${wrapperClass ? wrapperClass : "cloudWrapper"}`]}
				alt={imageAlt}
				src={cloudfrontUrl}
				onLoad={onLoad}
				unsized={unsized}
			/>
		)
	);
};

export default CloudImageComponent;
