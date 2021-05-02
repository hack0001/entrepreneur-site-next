import React from "react";
import styles from "../../styles/quote/elegant/elegantQuoteStyles.module.sass";

const ElegantQuote = ({ quote }) => {
	return (
		<div className={styles.elegantWrapper}>
			<blockquote className={styles.elegantBlockquote}>
				<div className={styles.quoteLine}></div>
				<p className={styles.elegantText}>{quote.quote}</p>
				<p className={styles.elegantText}>{quote.additionalQuote}</p>
				{quote.author ? <span>{quote.author}</span> : ""}
			</blockquote>
		</div>
	);
};
export default ElegantQuote;
