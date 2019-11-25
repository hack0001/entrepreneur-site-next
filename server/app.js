const express = require("express");
const next = require("next");
const axios = require("axios");
const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 8000;
const ROOT_URL = dev
	? `http://localhost:${port}`
	: "https://www.wealthmack.com";

const app = next({ dev });
const handle = app.getRequestHandler();

// Nextjs's server prepared
app.prepare().then(() => {
	const server = express();
	server.get("/sitemap.xml", async function(req, res) {
		res.header("Content-Type", "application/xml");
		let xmlFile = await axios.get(process.env.SITEMAP_URL);
		res.send(xmlFile.data);
	});

	server.get("*", (req, res) => handle(req, res));

	// starting express server
	server.listen(port, err => {
		if (err) throw err;
		console.log(`> Ready to Roll on ${ROOT_URL}`); // eslint-disable-line no-console
	});
});