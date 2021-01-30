import { useState } from "react";
import PropTypes from "prop-types";
export const config = { amp: "hybrid" };
import { useAmp } from "next/amp";
import loadStyles from "./styles/editorImageLoaderStyles.module.sass";
import CloudImage from "../Image/cloudImage";
import { getImagePath } from "../helper/imageUrlHelper";
import Image from "next/image";
const ImageLoader = ({
	src,
	alt,
	animation,
	styles,
	imagePath,
	imageCrop,
	imageCropInfo,
}) => {
	const imageCheck = imagePath || src.indexOf("content-factory-media") > 1;
	const [classStyle, setClassStyle] = useState(
		animation ? "imgLoadingAnimation" : "imgLoading",
	);
	const isAmp = useAmp();

	const onLoad = () => {
		setClassStyle(animation ? "imgLoadingWithAnimation" : "imgLoaded");
	};

	return (
		<>
			{!isAmp && (
				<div className={loadStyles[classStyle]}>
					{imageCheck && (
						<CloudImage
							imagePath={imagePath ? imagePath : getImagePath(src)}
							imageAlt={alt}
							onLoad={onLoad}
							imageCrop={imageCrop}
							imageCropInfo={imageCropInfo}
							unsized={true}
							wrapperClass={"contentWrapper"}
						/>
					)}
					{!imageCheck && (
						<Image
							key={src}
							src={src}
							alt={alt}
							style={styles}
							onLoad={onLoad}
							unsized={true}
						/>
					)}
				</div>
			)}
			{isAmp && (
				<amp-img
					src={src}
					alt={alt}
					style={styles}
					className={loadStyles[classStyle]}
					onLoad={onLoad}
				/>
			)}
		</>
	);
};

export default ImageLoader;
ImageLoader.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string,
	animation: PropTypes.boolean,
	styles: PropTypes.object,
	imagePath: PropTypes.string,
	imageCrop: PropTypes.string,
	imageCropInfo: PropTypes.string,
};

ImageLoader.defaultProps = {
	isAmp: false,
};
