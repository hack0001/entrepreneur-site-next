import React from "react";
import params from "./layout";
import { newImageUrl, clean } from "../helper/imageUrlHelper";
import styles from "./styles/cloudStyles.module.sass";

const CloudImageComponent = ({
	imagePath,
	imageAlt,
	layout,
	onLoad,
	imageCrop,
	imageCropInfo,
}) => {
	const cloudfrontUrl = newImageUrl(imagePath);
	const layoutParams = params[layout] ? params[layout] : params["content"];
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
	}
	const cleanCropParams = cropParams ? clean(cropParams) : null;

	return (
		<figure className={styles.cloudWrapper}>
			<picture>
				{layoutParams.map(imageProps => {
					const parameterList = {
						...imageProps.imageParams,
						...cleanCropParams,
					};

					const parameterUrl = Object.keys(parameterList)
						.map(key => {
							if (parameterList[key] !== null) {
								return `${key}=${parameterList[key]}`;
							}
						})
						.join("&");

					return (
						<source
							srcSet={`${cloudfrontUrl}?${parameterUrl} ${Math.round(
								imageProps.imageParams.width * imageProps.ratio,
								0,
							)}w`}
							data-srcSet={`${cloudfrontUrl}?${parameterUrl} ${Math.round(
								imageProps.imageParams.width * imageProps.ratio,
								0,
							)}w`}
							type={`image/${imageProps.imageParams.format}`}
							sizes={imageProps.sizes}
							media={imageProps.media ? imageProps.media : null}
						/>
					);
				})}
				<img
					className={styles.baseImage}
					alt={imageAlt}
					src={cloudfrontUrl}
					onLoad={onLoad}
				/>
			</picture>
		</figure>
	);
};

export default CloudImageComponent;
