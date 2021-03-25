import { memo } from "react";
import PropTypes from "prop-types";
import SocialSvgFactory from "./utils/svgFactory";
import createUtm from "../utm/createUtm";
import { getImagePath, newImageUrl } from "../helper/imageUrlHelper";
import styles from "./styles/shareButtonHorizStyles.module.sass";
const HorizontalShareButtons = ({
	data,
	url,
	image,
	headline,
	brief,
	handle,
	hashtag,
	facebookQuote,
	position,
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
			media: newImageString,
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
			campaignContent: position,
		},
		twitter: {
			originalUrl: url,
			campaignSource: "twitter",
			campaignMedium: "shared_link",
			campaignName: "organic",
			campaignContent: position,
		},
		LinkedIn: {
			originalUrl: url,
			campaignSource: "linkedin",
			campaignMedium: "shared_link",
			campaignName: "organic",
			campaignContent: position,
		},
		Email: {
			originalUrl: url,
			campaignSource: "email",
			campaignMedium: "shared_link",
			campaignName: "organic",
			campaignContent: position,
		},
		Pinterest: {
			originalUrl: url,
			campaignSource: "pinterest",
			campaignMedium: "shared_link",
			campaignName: "organic",
			campaignContent: position,
		},
		Whatsapp: {
			originalUrl: url,
			campaignSource: "whatsapp",
			campaignMedium: "shared_link",
			campaignName: "organic",
			campaignContent: position,
		},
	};
	return (
		<div className={styles.buttonContainer}>
			{data.map((button, index) => {
				const { ShareButton } = button;
				return (
					<div className={`button-wrapper`}>
						<ShareButton
							className={styles.indivButton}
							style={{
								backgroundColor: button.secondaryColor,
							}}
							url={createUtm(utmOptions[button.name])}
							key={index}
							{...options[button.name]}
						>
							<div className={styles.buttonContent}>
								<SocialSvgFactory button={button} />
								<span className={styles.buttonText}>{button.text}</span>
							</div>
						</ShareButton>
						<style jsx>
							{`
								.button-wrapper {
									width: ${button.width};
									padding-right: 0.1rem;
								}

								@media only screen and (max-width: 760px) {
									.button-wrapper {
										width: ${100 / 4 - 1}%;
										margin: 0 auto;
									}
								}
							`}
						</style>
					</div>
				);
			})}
		</div>
	);
};

HorizontalShareButtons.propTypes = {
	data: PropTypes.array,
	url: PropTypes.string,
	image: PropTypes.string,
	headline: PropTypes.string,
	brief: PropTypes.string,
	handle: PropTypes.string,
	hashtag: PropTypes.string,
	facebookQuote: PropTypes.string,
	position: PropTypes.String,
};
HorizontalShareButtons.defaultProps = {
	data: PropTypes.array,
	image: process.env.SITE_IMAGE,
	handle: process.env.SITE_NAME,
	hashtag: `#${process.env.SITE_NAME}`,
	headline: process.env.SITE_NAME,
	brief: process.env.SITE_DESC,
	url: process.env.SITE_ADDRESS,
	facebookQuote: "",
};
export default memo(HorizontalShareButtons);
