import Head from "next/head";
import PropTypes from "prop-types";
import baseTheme from "../../theme/baseTheme.json";
const MainHead = () => {
	return (
		<Head>
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			<meta httpEquiv="Content-Type" content="text/html: charset=UTF-8" />
			<link
				href="https://fonts.googleapis.com/css2?family=Roboto:wght@200&display=swap"
				rel="stylesheet"
			/>

			<meta charSet="UTF-8"></meta>
			<link rel="manifest" href="/static/manifest.json" />
			<meta name="theme-color" content={baseTheme.secondary} />
			<meta name="description" content={process.env.SITE_DESC} />
			<meta name="keywords" content="HTML, CSS, XML, XHTML, JavaScript" />
			<meta name="twitter:site" content={process.env.TWITTER_SITE} />
			<meta name="twitter:creator" content={process.env.TWITTER_SITE} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={process.env.SITE_TITLE} />
			<meta name="twitter:description" content={process.env.SITE_DESC} />
			<meta name="twitter:image" content={process.env.SITE_IMAGE} />
			<meta name="twitter:url" content={process.env.SITE_ADDRESS} />
			<meta name="og:locale" content="en_US" />
			<meta name="og:type" content="article" />
			<meta name="og:title" content={process.env.SITE_TITLE} />
			<meta name="og:description" content={process.env.SITE_DESC} />
			<meta name="og:image" content={process.env.SITE_IMAGE} />
			<meta name="og:image:width" content={process.env.SITE_IMAGE_WIDTH} />
			<meta name="og:image:height" content={process.env.SITE_IMAGE_HEIGHT} />
			<meta name="og:url" content={process.env.SITE_ADDRESS} />
			<meta name="og:card" content="HTML, CSS, XML, XHTML, JavaScript" />
			<meta name="og:site_name" content={process.env.SITE_NAME} />
			<meta name="fb:app_id" content={process.env.REACT_APP_FACEBOOK_APP_ID} />
			<meta name="fb:pages" content={process.env.REACT_APP_FACEBOOK_APP_ID} />
			{/* Setting IE=edge tells Internet Explorer to use the latest engine to //
			render the page and execute Javascript */}
			<meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"></meta>
			{/* Using the viewport tag allows you to control the width and scaling of
			the browser's viewport: // - include width=device-width to match the
			screen's width in // device-independent pixels // - include
			initial-scale=1 to establish 1:1 relationship between css pixels // and
			device-independent pixels // - ensure your page is accessible by not
			disabling user scaling. */}
			{/* Disable tap highlight on IE */}
			<meta name="msapplication-tap-highlight" content="no" />
			{/* Add to homescreen for Chrome on Android */}
			<meta name="mobile-web-app-capable" content="yes" />
			{/* Add to homescreen for Safari on IOS */}
			<meta name="apple-mobile-web-app-capable" content="yes" />
			<meta name="apple-mobile-web-app-status-bar-style" content="black" />
			<meta name="apple-mobile-web-app-title" content={process.env.SITE_NAME} />
			{/* Tile icon for Win8 (144x144 + tile color) */}
			<meta
				name="google-site-verification"
				content={process.env.GOOGLE_VERIFICATION_ID}
			/>
			<script
				data-ad-client="ca-pub-2068760522034474"
				async
				src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
			></script>
			<link rel="shortcut icon" href="/static/favicon.ico" />
			<link rel="icon" sizes="16x16 32x32 64x64" href="/static/favicon.ico" />
			<link
				rel="icon"
				type="image/png"
				sizes="196x196"
				href="/static/favicon-192.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="160x160"
				href="/static/favicon-160.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="96x96"
				href="/static/favicon-96.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="64x64"
				href="/static/favicon-64.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href="/static/favicon-32.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href="/static/favicon-16.png"
			/>
			<link rel="apple-touch-icon" href="/static/favicon-57.png" />
			<link
				rel="apple-touch-icon"
				sizes="114x114"
				href="/static/favicon-114.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="72x72"
				href="/static/favicon-72.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="144x144"
				href="/static/favicon-144.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="60x60"
				href="/static/favicon-60.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="120x120"
				href="/static/favicon-120.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="76x76"
				href="/static/favicon-76.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="152x152"
				href="/static/favicon-152.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href="/static/favicon-180.png"
			/>
			<meta name="msapplication-TileColor" content="#FFFFFF" />
			<meta name="msapplication-TileImage" content="/static/favicon-144.png" />
			<meta name="msapplication-config" content="/static/browserconfig.xml" />
		</Head>
	);
};

MainHead.propTypes = {
	children: PropTypes.Object,
};
export default MainHead;
