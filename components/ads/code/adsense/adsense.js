import { useEffect } from "react";
import styles from "../../styles/adStyles.module.sass";

const Adsense = ({
	sticky,
	client,
	slot,
	format,
	responsive,
	adStyle,
	adWrapperStyle,
	adWrap,
}) => {
	return (
		<div
			style={{
				position: sticky ? "sticky" : null,
				top: sticky ? 70 : null,
			}}
		>
			<div className={styles[adWrap]}>
				<div className={styles[adWrapperStyle]}>
					<div className={styles.advert}>ADVERTISEMENT</div>
					<div>
						<ins
							className={`adsbygoogle ${styles[adStyle]}`}
							data-ad-client={client}
							data-ad-slot={slot}
							data-ad-format={format}
							data-full-width-responsive={responsive}
						/>
					</div>
				</div>
				<hr className={styles.breaker} />
			</div>
		</div>
	);
};

Adsense.defaultProps = {
	client: "ca-pub-2068760522034474",
	format: "auto",
	responsive: true,
	sticky: false,
	adStyle: "default",
	adWrapperStyle: "adHeader",
	adWrap: "adWrap",
	currentUrlPath: "/",
};
export default Adsense;
