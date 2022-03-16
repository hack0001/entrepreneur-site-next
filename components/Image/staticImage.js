import Image from "next/image";
import { transparentDataUrl } from "./transparentUrl";
const StaticImage = ({
	styleClass,
	src,
	alt,
	height,
	width,
	priority,
	blur = false,
}) => {
	return (
		<div className={styleClass}>
			{!blur && (
				<Image
					src={src}
					alt={alt}
					height={height}
					width={width}
					priority={priority}
				/>
			)}
			{blur && (
				<Image
					src={src}
					alt={alt}
					height={height}
					width={width}
					priority={priority}
					placeholder="blur"
					blurDataURL={transparentDataUrl}
				/>
			)}
		</div>
	);
};

StaticImage.defaultProps = {
	height: "58px",
	width: "58px",
	priority: false,
	styleClass: {},
};
export default StaticImage;
