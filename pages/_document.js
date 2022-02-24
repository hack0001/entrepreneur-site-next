import Document, { Html, Head, Main, NextScript } from "next/document";
export default class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<link
						href={`https://fonts.googleapis.com/css2?family=Roboto:wght@200&display=swap`}
						rel="stylesheet"
					/>
					<script
						async
						crossOrigin="anonymous"
						src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${process.env.GOOGLE_ADSENSE_ID}`}
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
