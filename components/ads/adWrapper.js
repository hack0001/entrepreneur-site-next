import styles from "./styles/adStyles.module.sass";

const AdWrapper = ({
	adCode,
	sticky = false,
	callToActionMarker = false,
	callToAction,
}) => {
	return (
		<div
			style={{ position: sticky ? "sticky" : null, top: sticky ? 70 : null }}
		>
			{callToActionMarker && (
				<div>
					<div className={styles.callToAction}>{callToAction}</div>
					<div className={styles.arrowDown}></div>
				</div>
			)}
			<div className={styles.adWrap}>
				<div className={styles.adHeader}>
					<div className={styles.advert}>ADVERTISEMENT</div>

					<div
						className={styles.sideAdSquareWrap}
						dangerouslySetInnerHTML={{
							__html: adCode,
						}}
					/>
				</div>
			</div>
			<hr className={styles.breaker} />
		</div>
	);
};

export default AdWrapper;
