import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<script
						async
						src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
						crossorigin="anonymous"
					></script>
					<script
						dangerouslySetInnerHTML={{
							__html: `
							(window.adsbygoogle = window.adsbygoogle || []).push({
								google_ad_client: "2068760522034474",
								enable_page_level_ads: true
								});
								`,
						}}
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
