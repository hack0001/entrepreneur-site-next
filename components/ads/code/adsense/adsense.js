import { useEffect } from "react";
import styles from "../../styles/adStyles.module.sass";
import Script from "next/script";

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
			<Script
				id={currentUrlPath}
				async
				crossOrigin="anonymous"
				src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${process.env.GOOGLE_ADSENSE_ID}`}
			/>
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
	client: `ca-pub-${process.env.GOOGLE_ADSENSE_ID}`,
	format: "auto",
	responsive: true,
	sticky: false,
	adStyle: "default",
	adWrapperStyle: "adHeader",
	adWrap: "adWrap",
	currentUrlPath: "/",
};
export default Adsense;
