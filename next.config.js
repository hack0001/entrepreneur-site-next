module.exports = {
	images: {
		domains: [
			"assets.wealthmack.com",
			"content-factory-media.s3.eu-west-1.amazonaws.com",
			"media0.giphy.com",
			"media2.giphy.com",
			"media1.giphy.com",
			"media3.giphy.com",
			"media4.giphy.com",
			"media5.giphy.com",
			"media6.giphy.com",
			"media7.giphy.com",
			"media8.giphy.com",
			"media9.giphy.com",
			"media10.giphy.com",
		],
	},
	env: {
		NEXT_APP_RECAPTCHA_SITEKEY: process.env.NEXT_APP_RECAPTCHA_SITEKEY,
		REACT_APP_SITE_ID: process.env.REACT_APP_SITE_ID,
		NEXT_APP_RECAPTCHA_INVISIBLE_SITEKEY:
			process.env.NEXT_APP_RECAPTCHA_INVISIBLE_SITEKEY,
		REACT_APP_FACEBOOK_APP_ID: process.env.REACT_APP_FACEBOOK_APP_ID,
		REACT_APP_GOOGLE_TAG_ID: process.env.REACT_APP_GOOGLE_TAG_ID,
		REACT_APP_PRODUCTION_MANUAL_ENDPOINT:
			process.env.REACT_APP_PRODUCTION_MANUAL_ENDPOINT,
		REACT_APP_PRODUCTION_MANUAL_API_KEY:
			process.env.REACT_APP_PRODUCTION_MANUAL_API_KEY,
		SITEMAP_URL: process.env.SITEMAP_URL,
		RSS_URL: process.env.RSS_URL,
		SITE_NAME: process.env.SITE_NAME,
		SITE_TITLE: "WealthMack",
		SITE_IMAGE:
			"https://amplify-images-bucket-dev-resized.s3.eu-west-1.amazonaws.com/public/resized-thumbnails/business_cover_photox1024.jpg",
		SITE_IMAGE_WIDTH: "1024",
		SITE_IMAGE_HEIGHT: "573",
		SITE_DESC: "Start building tomorrow, today",
		TWITTER_SITE: "@WealthMack",
		GOOGLE_VERIFICATION_ID: "",
		SITE_ADDRESS: "https://www.wealthmack.com",
		COOKIE_ACCEPT_EXPIRY: "365",
		FACEBOOK_PAGE_URL: "https://www.facebook.com/WealthMack-103552984448329/",
		CLOUDFRONT_IMAGE_DOMAIN: process.env.CLOUDFRONT_IMAGE_DOMAIN,
		GOOGLE_CODE_ID: process.env.GOOGLE_CODE_ID,
	},
	async rewrites() {
		return [
			{ source: "/sitemap.xml", destination: "/api/sitemap" },
			{ source: "/rss", destination: "/api/rss" },
		];
	},
	catchAllRouting: true,
};
