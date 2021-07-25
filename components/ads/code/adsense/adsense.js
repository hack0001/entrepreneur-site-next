import { useEffect } from "react";
import styles from "../../styles/adStyles.module.sass";

const Adsense = ({
	sticky,
	client,
	slot,
	format,
	responsive,
	currentUrlPath,
	adStyle,
	adWrapperStyle,
	adWrap,
}) => {
	useEffect(() => {
		try {
			if (typeof window !== "undefined") {
				(window.adsbygoogle = window.adsbygoogle || []).push({});
			}
		} catch (err) {
			console.log("Adsense Err", err);
		}
	}, [currentUrlPath]);

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
					<div key={currentUrlPath}>
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
