import Image from "next/image";

const StaticImage = ({ styleClass, src, alt, height, width, priority }) => {
	return (
		<div className={styleClass}>
			<Image
				src={src}
				alt={alt}
				height={height}
				width={width}
				priority={priority}
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
