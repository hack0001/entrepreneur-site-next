import React, { useRef, useEffect } from "react";
import Embedo from "./embedo";
import PropTypes from "prop-types";

const EmbedUrl = ({ source, height, path, cpcMarker }) => {
	const embedoContainer = useRef(null);
	useEffect(() => {
		Embedo.load(embedoContainer.current, source, { centerize: true })
			.done(() => {})
			.fail(err => {
				console.error("error", err);
			});
	}, []);

	useEffect(() => {
		Embedo.destroy(embedoContainer.current);
		Embedo.load(embedoContainer.current, source, { centerize: true })
			.done(() => {})
			.fail(err => {
				console.error("error", err);
			});
	}, [path, source]);

	return (
		<div
			key={source}
			className="embedo"
			target="_blank"
			rel="noopener noreferrer"
			ref={embedoContainer}
		/>
	);
};
EmbedUrl.propTypes = {
	source: PropTypes.String,
	height: PropTypes.String,
};

export default EmbedUrl;
