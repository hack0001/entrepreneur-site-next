import styles from "../styles/adStyles.module.sass";
import Image from "next/image";

const SocialMediaAffiliate = ({
	sticky,
	adWrapperStyle,
	adWrap,
	hopLink,
	width,
	height,
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
					<a href={hopLink} target="_blank" rel="noreferrer">
						<Image
							src={`/sm_aff/${width}x${height}.png`}
							width={width}
							height={height}
						/>
					</a>
				</div>
				<hr className={styles.breaker} />
			</div>
		</div>
	);
};

SocialMediaAffiliate.defaultProps = {
	sticky: false,
	adWrapperStyle: "adHeader",
	adWrap: "adWrap",
	hopLink:
		"https://a15f5apgkls3ft8mvxv2z9c3iu.hop.clickbank.net/?tid=SOCIAL_TRACK_555",
	width: 300,
	height: 250,
};
export default SocialMediaAffiliate;
