import { memo } from "react";
import PropTypes from "prop-types";
import SocialSvgFactory from "./utils/svgFactory";
import createUtm from "../utm/createUtm";
import styles from "./styles/shareButtonVertStyles.module.sass";
import { getImagePath, newImageUrl } from "../helper/imageUrlHelper";

const VerticalShareButtons = ({
	data,
	shareCounter,
	url,
	image,
	headline,
	brief,
	handle,
	hashtag,
	facebookQuote,
	pinterestLink,
}) => {
	const newImage = getImagePath(image);
	const newImageString = newImageUrl(newImage);
	const options = {
		facebook: {
			quote: facebookQuote,
		},
		twitter: {
			title: brief,
			via: handle,
			hastags: [hashtag],
		},
		LinkedIn: {},
		Email: {
			subject: headline,
			body: brief,
			separator: ":- ",
		},
		Pinterest: {
			media: pinterestLink ? pinterestLink : newImageString,
			description: brief,
		},
		Whatsapp: {
			title: headline,
		},
	};
	const utmOptions = {
		facebook: {
			originalUrl: url,
			campaignSource: "facebook",
			campaignMedium: "shared_link",
			campaignName: "organic",
			campaignContent: "vertical_side",
			useUtm: false,
		},
		twitter: {
			originalUrl: url,
			campaignSource: "twitter",
			campaignMedium: "shared_link",
			campaignName: "organic",
			campaignContent: "vertical_side",
			useUtm: false,
		},
		LinkedIn: {
			originalUrl: url,
			campaignSource: "linkedin",
			campaignMedium: "shared_link",
			campaignName: "organic",
			campaignContent: "vertical_side",
			useUtm: false,
		},
		Email: {
			originalUrl: url,
			campaignSource: "email",
			campaignMedium: "shared_link",
			campaignName: "organic",
			campaignContent: "vertical_side",
			useUtm: true,
		},
		Pinterest: {
			originalUrl: url,
			campaignSource: "pinterest",
			campaignMedium: "shared_link",
			campaignName: "organic",
			campaignContent: "vertical_side",
			useUtm: false,
		},
		Whatsapp: {
			originalUrl: url,
			campaignSource: "whatsapp",
			campaignMedium: "shared_link",
			campaignName: "organic",
			campaignContent: "vertical_side",
			useUtm: false,
		},
	};

	return (
		<div className={styles.buttonVerticalContainer}>
			<div className={styles.buttonContainer}>
				{data.map((button, index) => {
					const { ShareButton, ShareCount, ShareCountName } = button;
					return (
						<ShareButton
							className={`${styles.indivButton} indiv-button`}
							style={{
								width: button.height,
								backgroundColor: button.secondaryColor,
							}}
							url={createUtm(utmOptions[button.name])}
							key={index}
							{...options[button.name]}
						>
							<div className={styles.buttonContent}>
								<SocialSvgFactory button={button} />
								<span className={styles.buttonText}>{button.text}</span>
								{ShareCount && shareCounter && (
									<span className={styles.shareCount}>
										{shareCounter[ShareCountName] > 20
											? shareCounter[ShareCountName]
											: ""}
									</span>
								)}
							</div>
						</ShareButton>
					);
				})}
			</div>
			<style jsx>
				{`
					@media only screen and (max-width: 760px) {
						.indiv-button {
							width: ${100 / data.length - 1}%;
							margin: 0 auto;
						}
					}
				`}
			</style>
		</div>
	);
};

VerticalShareButtons.propTypes = {
	data: PropTypes.array,
	url: PropTypes.string,
	image: PropTypes.string,
	headline: PropTypes.string,
	brief: PropTypes.string,
	handle: PropTypes.string,
	hashtag: PropTypes.string,
	facebookQuote: PropTypes.string,
};
VerticalShareButtons.defaultProps = {
	data: PropTypes.array,
	image: process.env.SITE_IMAGE,
	handle: process.env.SITE_NAME,
	hashtag: `#${process.env.SITE_NAME}`,
	headline: process.env.SITE_NAME,
	brief: process.env.SITE_DESC,
	url: process.env.SITE_ADDRESS,
	facebookQuote: "",
};
export default memo(VerticalShareButtons);
