import { facebook, twitter, linkedin, email, pinterest } from "./utils/icons";
const closingWidth = 100 / 4;
export const openingSocialButtons = [facebook, pinterest, email, twitter];
export const sideSocialButtons = [
	facebook,
	twitter,
	linkedin,
	email,
	pinterest,
];

export const closingSocialButtons = [
	{ ...facebook, width: `${closingWidth * 2}%` },
	{ ...pinterest, width: `${closingWidth}%` },
	// { ...linkedin, width: closingWidth },
	{ ...email, width: `${closingWidth}%` },
	{ ...twitter, width: `${closingWidth}%` },
	// { ...whatsapp, width: closingWidth },
];

export const midSocialButtons = [
	{ ...facebook, width: "33%" },
	{ ...pinterest, width: "33%" },
	{ ...email, width: "33%" },
];
