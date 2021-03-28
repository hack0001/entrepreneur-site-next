import React from "react";
import PropTypes from "prop-types";
import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";
import styles from "./styles/showMetaStyles.module.sass";
dayjs.extend(advancedFormat);

const ShowMeta = ({
	showDate,
	displayDate,
	showAuthor,
	authorName,
	lastUpdated,
}) => {
	return (
		<div className={styles.metaWrapper}>
			{showDate && (
				<div className={styles.sectionMeta}>
					Date: {dayjs(displayDate).format("Do MMM YYYY")}
				</div>
			)}
			{showAuthor && authorName && (
				<div className={styles.sectionMeta}>By: {authorName}</div>
			)}
			{showDate && lastUpdated && (
				<div className={styles.sectionMeta}>
					Last Updated: {dayjs(lastUpdated).format("Do MMM YYYY")}
				</div>
			)}
		</div>
	);
};
ShowMeta.propTypes = {
	showDate: PropTypes.bool,
	displayDate: PropTypes.string,
	showAuthor: PropTypes.bool,
	authorName: PropTypes.string,
};
export default ShowMeta;
