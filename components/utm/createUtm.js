import PropTypes from "prop-types";

const CreateUtm = ({
	originalUrl, //original Share Url
	campaignSource, //Identify where the user is coming from e.g. facebook, twitter, newsletter
	campaignMedium, //Identify the medium of the click - e.g email, CPC, social
	campaignName, //Unique campaign to distinguish - e.g. ad_launch_2020, social)button
	campaignTerm, //For paid search - identify keywords in ad
	campaignContent, //Additional Content - e.g button type - or banner top of page for CTA's (call to action) - utm_content=cta-bottom
	useUtm, //Facebook, Twitter doesn't share urls correctly with UTM but need this for email
}) => {
	if (useUtm) {
		const optionalTerm = campaignTerm ? `&utm_term=${campaignTerm}` : "";
		const optionalContent = campaignContent
			? `&utm_content=${campaignContent}`
			: "";
		return `${originalUrl}?utm_source=${campaignSource}&utm_medium=${campaignMedium}&utm_campaign=${campaignName}${optionalTerm}${optionalContent}`;
	}
	return originalUrl;
};

CreateUtm.defaultProps = {
	originalUrl: process.env.SITE_ADDRESS,
};
CreateUtm.propTypes = {
	originalUrl: PropTypes.string.isRequired,
	campaignSource: PropTypes.string.isRequired,
	campaignMedium: PropTypes.string.isRequired,
	campaignName: PropTypes.string,
	campaignTerm: PropTypes.string,
	campaignContent: PropTypes.string,
};

export default CreateUtm;
