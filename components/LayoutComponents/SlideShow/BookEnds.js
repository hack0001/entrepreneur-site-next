import { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import Embed from "../../Embed/Embed";
import { Slate, Editable } from "slate-react";
import { createEditor } from "slate";
import RenderElement from "../Editor/renderElement/renderElement";
import RenderLeaf from "../Editor/renderLeaf/renderLeaf";
import styles from "./styles/bookEndStyles.module.sass";

const BookEnds = ({
	image,
	imageAlt,
	imagePath,
	imageAltAttribution,
	imageAltAttributionLink,
	imageCrop,
	imageCropInfo,
	showHeadlineImage,
	title,
	details,
	position,
	embed,
}) => {
	const value = details;
	const editor = useMemo(() => createEditor(), []);
	const renderElement = useCallback(props => <RenderElement {...props} />, []);
	const renderLeaf = useCallback(props => <RenderLeaf {...props} />, []);
	return (
		<div className={styles.bookendWrapper}>
			<div>
				{position === "opening" && (
					<>
						<h1 className={styles.sectionHeader}>{title}</h1>
						<div className={styles.sectionParagraph}>
							<Slate editor={editor} value={value}>
								<Editable
									readOnly={true}
									renderElement={renderElement}
									renderLeaf={renderLeaf}
								/>
							</Slate>
						</div>
					</>
				)}
			</div>
			<div>
				{showHeadlineImage && (
					<Embed
						embed={embed}
						image={image}
						imageAlt={imageAlt}
						imagePath={imagePath}
						imageAltAttribution={imageAltAttribution}
						imageAltAttributionLink={imageAltAttributionLink}
						imageCrop={imageCrop}
						imageCropInfo={imageCropInfo}
						styles={{ width: "100%", height: "100%" }}
						noMaxHeight={true}
					/>
				)}
			</div>
			<div>
				{position === "closing" && (
					<>
						<h1 className={styles.sectionHeader}> {title}</h1>
						<div className={styles.sectionParagraph}>
							<Slate editor={editor} value={value}>
								<Editable
									readOnly={true}
									renderElement={renderElement}
									renderLeaf={renderLeaf}
								/>
							</Slate>
						</div>
					</>
				)}
			</div>
		</div>
	);
};
BookEnds.propTypes = {
	position: PropTypes.string,
	image: PropTypes.string,
	imageAlt: PropTypes.string,
	imagePath: PropTypes.string,
	imageAltAttribution: PropTypes.string,
	imageAltAttributionLink: PropTypes.string,
	title: PropTypes.string,
	details: PropTypes.Object,
	embed: PropTypes.string,
};
BookEnds.defaultProps = {
	details: [
		{
			type: "paragraph",
			children: [{ text: "" }],
		},
	],
};

export default BookEnds;
