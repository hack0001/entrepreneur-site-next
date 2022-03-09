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
		SITE_TITLE: process.env.SITE_TITLE,
		SITE_IMAGE: process.env.SITE_IMAGE,
		SITE_IMAGE_WIDTH: process.env.SITE_IMAGE_WIDTH,
		SITE_IMAGE_HEIGHT: process.env.SITE_IMAGE_HEIGHT,
		SITE_DESC: process.env.SITE_DESC,
		TWITTER_SITE: process.env.TWITTER_SITE,
		SITE_ADDRESS: process.env.SITE_ADDRESS,
		COOKIE_ACCEPT_EXPIRY: process.env.COOKIE_ACCEPT_EXPIRY,
		FACEBOOK_PAGE_URL: process.env.FACEBOOK_PAGE_URL,
		CLOUDFRONT_IMAGE_DOMAIN: process.env.CLOUDFRONT_IMAGE_DOMAIN,
		GOOGLE_ADSENSE_ID: process.env.GOOGLE_ADSENSE_ID,
		CLOUDFRONT_SHARE_URL_ENDPOINT: process.env.CLOUDFRONT_SHARE_URL_ENDPOINT,
	},
	async rewrites() {
		return [
			{ source: "/sitemap.xml", destination: "/api/sitemap" },
			{ source: "/rss", destination: "/api/rss" },
		];
	},
	catchAllRouting: true,
};
