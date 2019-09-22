const { parsed: localEnv } = require("dotenv").config();
const webpack = require("webpack");

module.exports = {
	target: "serverless",
	webpack(config) {
		config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
		return config;
	},
	env: {
		NEXT_APP_RECAPTCHA_SITEKEY: process.env.NEXT_APP_RECAPTCHA_SITEKEY,
	},
};
