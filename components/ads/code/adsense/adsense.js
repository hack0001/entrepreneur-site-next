import { useEffect, useState } from "react";
import styles from "../../styles/adStyles.module.sass";

const Adsense = ({
	sticky,
	wrapperDivStyle,
	client,
	slot,
	format,
	responsive,
	adStyle,
	currentUrlPath,
}) => {
	useEffect(() => {
		try {
			(window.adsbygoogle = window.adsbygoogle || []).push({});
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
			<div className={styles.adWrap}>
				<div className={styles.adHeader}>
					<div className={styles.advert}>ADVERTISEMENT</div>
					<div key={currentUrlPath}>
						{responsive && (
							<ins
								className="adsbygoogle adbanner-customize"
								style={adStyle}
								data-ad-client={client}
								data-ad-slot={slot}
								data-ad-format={format}
								data-full-width-responsive={responsive}
							/>
						)}
						{!responsive && (
							<ins
								className="adsbygoogle adbanner-customize"
								style={adStyle}
								data-ad-client={client}
								data-ad-slot={slot}
							/>
						)}
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
	adStyle: {
		display: "block",
	},
	currentUrlPath: "/",
};
export default Adsense;
