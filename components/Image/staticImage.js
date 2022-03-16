import Image from "next/image";
import { transparentDataUrl } from "./transparentUrl";
const StaticImage = ({ styleClass, src, alt, height, width, priority }) => {
	return (
		<div className={styleClass}>
			<Image
				src={src}
				alt={alt}
				height={height}
				width={width}
				priority={priority}
				placeholder="blur"
				blurDataURL={transparentDataUrl}
			/>
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
